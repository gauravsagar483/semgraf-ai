"""DuckDB warehouse runner for fixture seeds."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import duckdb


class Warehouse:
    """In-memory DuckDB loaded from a fixture seed.sql."""

    def __init__(self, seed_path: Path):
        self._seed_path = seed_path
        self._conn = duckdb.connect(database=":memory:")
        sql = seed_path.read_text(encoding="utf-8")
        self._conn.execute(sql)

    def query(self, sql: str) -> tuple[list[str], list[dict[str, Any]]]:
        result = self._conn.execute(sql)
        columns = [d[0] for d in result.description]
        rows_raw = result.fetchall()
        rows = [dict(zip(columns, row)) for row in rows_raw]
        # Normalize dates / numerics for JSON
        for row in rows:
            for k, v in list(row.items()):
                if hasattr(v, "isoformat"):
                    row[k] = v.isoformat()
                elif isinstance(v, float):
                    row[k] = round(v, 6)
        return columns, rows
