"""Shared paths for fixtures, semantic models, and graph seeds."""

from __future__ import annotations

import os
from pathlib import Path


def repo_root() -> Path:
    """Resolve Semgraf repo root (contains fixtures/, semantic/, graph/)."""
    if env := os.environ.get("SEMGRAF_ROOT"):
        return Path(env).resolve()
    # apps/api/semgraf_api/paths.py -> parents[3] = repo root
    return Path(__file__).resolve().parents[3]


def fixture_name() -> str:
    return os.environ.get("SEMGRAF_FIXTURE", "ecommerce")


def seed_sql_path(fixture: str | None = None) -> Path:
    name = fixture or fixture_name()
    return repo_root() / "fixtures" / name / "seed.sql"


def semantic_model_path(fixture: str | None = None) -> Path:
    name = fixture or fixture_name()
    return repo_root() / "semantic" / name / "model.yaml"


def lineage_path(fixture: str | None = None) -> Path:
    name = fixture or fixture_name()
    return repo_root() / "graph" / name / "lineage.json"
