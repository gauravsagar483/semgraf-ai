"""Runtime wiring: load fixture semantic model, warehouse, lineage graph."""

from __future__ import annotations

import time
from dataclasses import dataclass

from semgraf_api.compiler import (
    CompilerError,
    compile_metric,
    load_semantic_model,
    resolve_metric_from_question,
)
from semgraf_api.graph_plane import LineageGraph
from semgraf_api.models import (
    AskResponse,
    BlastRadiusResponse,
    CompileResponse,
    ErrorCode,
    MetricInfo,
    Plane,
)
from semgraf_api.paths import lineage_path, seed_sql_path, semantic_model_path
from semgraf_api.router import extract_node_id, route_question
from semgraf_api.warehouse import Warehouse


@dataclass
class Runtime:
    fixture: str
    model: object
    warehouse: Warehouse
    graph: LineageGraph

    @classmethod
    def load(cls, fixture: str | None = None) -> Runtime:
        from semgraf_api.paths import fixture_name

        name = fixture or fixture_name()
        model = load_semantic_model(semantic_model_path(name))
        wh = Warehouse(seed_sql_path(name))
        graph = LineageGraph(lineage_path(name))
        return cls(fixture=name, model=model, warehouse=wh, graph=graph)

    def list_metrics(self) -> list[MetricInfo]:
        return self.model.list_metrics()  # type: ignore[attr-defined]

    def compile(self, metric: str) -> CompileResponse:
        sql, version = compile_metric(self.model, metric)  # type: ignore[arg-type]
        return CompileResponse(metric=metric, sql=sql, definition_version=version)

    def ask(self, question: str, plane_override: Plane | None = None) -> AskResponse:
        t0 = time.perf_counter()
        plane = route_question(question, plane_override)

        if plane == Plane.RELATIONSHIP:
            node_id = extract_node_id(question)
            if not node_id:
                return AskResponse(
                    question=question,
                    plane=plane,
                    message="Name a node (e.g. raw.orders or metric.total_revenue) for blast radius.",
                    error_code=ErrorCode.AMBIGUOUS,
                    latency_ms=_ms(t0),
                )
            downstream = self.graph.blast_radius(node_id)
            if not downstream and node_id not in self.graph.nodes:
                return AskResponse(
                    question=question,
                    plane=plane,
                    message=f"Unknown graph node '{node_id}'.",
                    error_code=ErrorCode.NOT_FOUND,
                    latency_ms=_ms(t0),
                )
            return AskResponse(
                question=question,
                plane=plane,
                graph_nodes=downstream,
                message=f"Blast radius for {node_id}: {len(downstream)} downstream node(s).",
                latency_ms=_ms(t0),
            )

        # Metric plane
        metric = resolve_metric_from_question(question, self.model)  # type: ignore[arg-type]
        if metric is None:
            known = ", ".join(sorted(self.model.metrics))  # type: ignore[attr-defined]
            return AskResponse(
                question=question,
                plane=Plane.METRIC,
                message=f"Could not map question to a metric. Try: {known}",
                error_code=ErrorCode.OUT_OF_SCOPE,
                latency_ms=_ms(t0),
            )
        try:
            sql, version = compile_metric(self.model, metric)  # type: ignore[arg-type]
            columns, rows = self.warehouse.query(sql)
        except CompilerError as e:
            return AskResponse(
                question=question,
                plane=Plane.METRIC,
                metric=metric,
                message=str(e),
                error_code=e.code,
                latency_ms=_ms(t0),
            )
        return AskResponse(
            question=question,
            plane=Plane.METRIC,
            metric=metric,
            sql=sql,
            rows=rows,
            columns=columns,
            definition_version=version,
            latency_ms=_ms(t0),
        )

    def blast_radius(self, node_id: str) -> BlastRadiusResponse:
        t0 = time.perf_counter()
        return BlastRadiusResponse(
            node_id=node_id,
            downstream=self.graph.blast_radius(node_id),
            latency_ms=_ms(t0),
        )


def _ms(t0: float) -> float:
    return round((time.perf_counter() - t0) * 1000, 2)
