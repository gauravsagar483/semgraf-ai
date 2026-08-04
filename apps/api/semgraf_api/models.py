"""API and domain models for Semgraf dual-plane responses."""

from __future__ import annotations

from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class Plane(str, Enum):
    METRIC = "metric"
    RELATIONSHIP = "relationship"


class ErrorCode(str, Enum):
    OUT_OF_SCOPE = "OUT_OF_SCOPE"
    COMPILE_ERROR = "COMPILE_ERROR"
    AMBIGUOUS = "AMBIGUOUS"
    NOT_FOUND = "NOT_FOUND"


class MetricInfo(BaseModel):
    name: str
    label: str
    description: str = ""
    grain: list[str] = Field(default_factory=list)


class CompileRequest(BaseModel):
    metric: str
    fixture: str | None = None


class CompileResponse(BaseModel):
    metric: str
    sql: str
    definition_version: str
    plane: Plane = Plane.METRIC


class AskRequest(BaseModel):
    question: str
    fixture: str | None = None
    plane: Plane | None = None  # optional override


class AskResponse(BaseModel):
    question: str
    plane: Plane
    metric: str | None = None
    sql: str | None = None
    rows: list[dict[str, Any]] = Field(default_factory=list)
    columns: list[str] = Field(default_factory=list)
    definition_version: str | None = None
    graph_nodes: list[dict[str, Any]] = Field(default_factory=list)
    message: str | None = None
    latency_ms: float = 0.0
    error_code: ErrorCode | None = None


class BlastRadiusRequest(BaseModel):
    node_id: str
    fixture: str | None = None


class BlastRadiusResponse(BaseModel):
    node_id: str
    plane: Plane = Plane.RELATIONSHIP
    downstream: list[dict[str, Any]] = Field(default_factory=list)
    latency_ms: float = 0.0
