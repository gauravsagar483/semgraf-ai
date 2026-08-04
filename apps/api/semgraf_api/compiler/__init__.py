"""Thin deterministic metric SQL compiler over OSI-derived YAML."""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from semgraf_api.models import ErrorCode, MetricInfo


class CompilerError(Exception):
    def __init__(self, code: ErrorCode, message: str):
        self.code = code
        super().__init__(message)


@dataclass
class Relationship:
    name: str
    from_ref: str
    to_ref: str

    @property
    def from_table(self) -> str:
        return self.from_ref.split(".", 1)[0]

    @property
    def from_col(self) -> str:
        return self.from_ref.split(".", 1)[1]

    @property
    def to_table(self) -> str:
        return self.to_ref.split(".", 1)[0]

    @property
    def to_col(self) -> str:
        return self.to_ref.split(".", 1)[1]


@dataclass
class MetricDef:
    name: str
    label: str
    description: str
    measure_expr: str
    grain: list[str] = field(default_factory=list)
    filters: list[str] = field(default_factory=list)
    joins: list[str] = field(default_factory=list)


@dataclass
class SemanticModel:
    version: str
    fixture: str
    metrics: dict[str, MetricDef]
    relationships: dict[str, Relationship]
    raw_yaml: str
    definition_version: str

    def list_metrics(self) -> list[MetricInfo]:
        return [
            MetricInfo(
                name=m.name,
                label=m.label,
                description=m.description,
                grain=list(m.grain),
            )
            for m in self.metrics.values()
        ]


def _parse_model(data: dict[str, Any], raw: str) -> SemanticModel:
    rels: dict[str, Relationship] = {}
    for r in data.get("relationships") or []:
        rels[r["name"]] = Relationship(
            name=r["name"],
            from_ref=r["from"],
            to_ref=r["to"],
        )

    metrics: dict[str, MetricDef] = {}
    for m in data.get("metrics") or []:
        measure = m.get("measure") or {}
        metrics[m["name"]] = MetricDef(
            name=m["name"],
            label=m.get("label") or m["name"],
            description=m.get("description") or "",
            measure_expr=measure["expr"],
            grain=list(m.get("grain") or []),
            filters=list(m.get("filters") or []),
            joins=list(m.get("joins") or []),
        )

    digest = hashlib.sha256(raw.encode("utf-8")).hexdigest()[:16]
    return SemanticModel(
        version=str(data.get("version") or "semgraf-osi/0.1"),
        fixture=str(data.get("fixture") or "unknown"),
        metrics=metrics,
        relationships=rels,
        raw_yaml=raw,
        definition_version=digest,
    )


def load_semantic_model(path: Path) -> SemanticModel:
    raw = path.read_text(encoding="utf-8")
    data = yaml.safe_load(raw)
    if not isinstance(data, dict):
        raise CompilerError(ErrorCode.COMPILE_ERROR, "Semantic model must be a mapping")
    return _parse_model(data, raw)


_JOIN_EDGE = re.compile(r"^(\w+)\.(\w+)$")


def compile_metric(model: SemanticModel, metric_name: str) -> tuple[str, str]:
    """Compile a named metric to SQL. Returns (sql, definition_version)."""
    metric = model.metrics.get(metric_name)
    if metric is None:
        raise CompilerError(
            ErrorCode.OUT_OF_SCOPE,
            f"Unknown metric '{metric_name}'. Known: {', '.join(sorted(model.metrics))}",
        )

    # Collect tables from measure + grain + joins
    tables: set[str] = set()
    for token in re.findall(r"\b([a-z_][a-z0-9_]*)\.", metric.measure_expr):
        tables.add(token)
    for g in metric.grain:
        m = _JOIN_EDGE.match(g)
        if m:
            tables.add(m.group(1))
    for fname in metric.filters:
        for token in re.findall(r"\b([a-z_][a-z0-9_]*)\.", fname):
            tables.add(token)

    join_clauses: list[str] = []
    joined: set[str] = set()

    # Pick a primary table: prefer order_items when present, else first table
    if "order_items" in tables:
        primary = "order_items"
    elif tables:
        primary = sorted(tables)[0]
    else:
        raise CompilerError(ErrorCode.COMPILE_ERROR, "Metric has no resolvable tables")

    joined.add(primary)

    for jname in metric.joins:
        rel = model.relationships.get(jname)
        if rel is None:
            raise CompilerError(ErrorCode.COMPILE_ERROR, f"Unknown join '{jname}'")
        # Attach the side not yet joined
        if rel.from_table in joined and rel.to_table not in joined:
            join_clauses.append(
                f"JOIN {rel.to_table} ON {rel.from_table}.{rel.from_col} = {rel.to_table}.{rel.to_col}"
            )
            joined.add(rel.to_table)
        elif rel.to_table in joined and rel.from_table not in joined:
            join_clauses.append(
                f"JOIN {rel.from_table} ON {rel.from_table}.{rel.from_col} = {rel.to_table}.{rel.to_col}"
            )
            joined.add(rel.from_table)
        elif rel.from_table in joined and rel.to_table in joined:
            continue
        else:
            # Neither side joined yet — attach from_table first
            if rel.from_table not in joined:
                if not joined:
                    primary = rel.from_table
                    joined.add(primary)
                else:
                    raise CompilerError(
                        ErrorCode.COMPILE_ERROR,
                        f"Cannot attach join '{jname}' — disconnected from primary {primary}",
                    )
            if rel.to_table not in joined:
                join_clauses.append(
                    f"JOIN {rel.to_table} ON {rel.from_table}.{rel.from_col} = {rel.to_table}.{rel.to_col}"
                )
                joined.add(rel.to_table)

    select_parts = [f"{metric.measure_expr} AS value"]
    group_parts: list[str] = []
    for g in metric.grain:
        select_parts.insert(-1, g)
        group_parts.append(g)

    sql_lines = ["SELECT", "  " + ",\n  ".join(select_parts), f"FROM {primary}"]
    sql_lines.extend(join_clauses)
    if metric.filters:
        sql_lines.append("WHERE " + " AND ".join(f"({f})" for f in metric.filters))
    if group_parts:
        sql_lines.append("GROUP BY " + ", ".join(group_parts))
    sql_lines.append("ORDER BY 1")

    return "\n".join(sql_lines) + "\n", model.definition_version


# Simple NL → metric name hints for Phase 1 (rules before LLM)
_METRIC_ALIASES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\brevenue by segment\b", re.I), "revenue_by_segment"),
    (re.compile(r"\brevenue by categor", re.I), "revenue_by_category"),
    (re.compile(r"\btotal revenue\b|\brevenue\b|\bgmv\b", re.I), "total_revenue"),
    (re.compile(r"\border count\b|\bhow many orders\b|\bnumber of orders\b", re.I), "order_count"),
    (re.compile(r"\bunits sold\b|\bquantity sold\b", re.I), "units_sold"),
]


def resolve_metric_from_question(question: str, model: SemanticModel) -> str | None:
    """Rule-based metric resolver. Returns metric name or None."""
    q = question.strip()
    # Exact / snake match
    key = q.lower().replace(" ", "_")
    if key in model.metrics:
        return key
    for name in model.metrics:
        if name in key or model.metrics[name].label.lower() in q.lower():
            return name
    for pattern, metric in _METRIC_ALIASES:
        if pattern.search(q) and metric in model.metrics:
            return metric
    return None
