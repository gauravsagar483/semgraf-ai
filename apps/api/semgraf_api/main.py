"""FastAPI entry — Semgraf dual-plane HTTP surface."""

from __future__ import annotations

import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from semgraf_api import __version__
from semgraf_api.compiler import CompilerError
from semgraf_api.models import (
    AskRequest,
    AskResponse,
    BlastRadiusRequest,
    BlastRadiusResponse,
    CompileRequest,
    CompileResponse,
    MetricInfo,
)
from semgraf_api.runtime import Runtime

app = FastAPI(
    title="Semgraf API",
    description="Dual-plane runtime: compile governed metrics, traverse verified relationships.",
    version=__version__,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Semgraf-Definition-Version"],
)

_runtime: Runtime | None = None


def get_runtime(fixture: str | None = None) -> Runtime:
    global _runtime
    if _runtime is None or (fixture and fixture != _runtime.fixture):
        _runtime = Runtime.load(fixture)
    return _runtime


@app.on_event("startup")
def _startup() -> None:
    get_runtime()


@app.get("/health")
def health() -> dict:
    rt = get_runtime()
    return {"ok": True, "version": __version__, "fixture": rt.fixture}


@app.get("/api/metrics", response_model=list[MetricInfo])
def list_metrics(fixture: str | None = None) -> list[MetricInfo]:
    return get_runtime(fixture).list_metrics()


@app.post("/api/compile", response_model=CompileResponse)
def compile_endpoint(body: CompileRequest) -> CompileResponse:
    rt = get_runtime(body.fixture)
    try:
        resp = rt.compile(body.metric)
    except CompilerError as e:
        raise HTTPException(status_code=400, detail={"code": e.code.value, "message": str(e)}) from e
    return resp


@app.post("/api/ask", response_model=AskResponse)
def ask_endpoint(body: AskRequest) -> AskResponse:
    rt = get_runtime(body.fixture)
    return rt.ask(body.question, plane_override=body.plane)


@app.post("/api/blast_radius", response_model=BlastRadiusResponse)
def blast_radius_endpoint(body: BlastRadiusRequest) -> BlastRadiusResponse:
    return get_runtime(body.fixture).blast_radius(body.node_id)


def run() -> None:
    import uvicorn

    port = int(os.environ.get("PORT", "8080"))
    uvicorn.run("semgraf_api.main:app", host="0.0.0.0", port=port, reload=False)


if __name__ == "__main__":
    run()
