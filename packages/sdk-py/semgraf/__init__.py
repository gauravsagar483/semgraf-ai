"""Minimal Python client for Semgraf HTTP API."""

from __future__ import annotations

from typing import Any

import httpx


class SemgrafClient:
    def __init__(self, base_url: str = "http://127.0.0.1:8080", timeout: float = 30.0):
        self.base_url = base_url.rstrip("/")
        self._client = httpx.Client(base_url=self.base_url, timeout=timeout)

    def close(self) -> None:
        self._client.close()

    def __enter__(self) -> SemgrafClient:
        return self

    def __exit__(self, *args: object) -> None:
        self.close()

    def health(self) -> dict[str, Any]:
        return self._client.get("/health").json()

    def list_metrics(self) -> list[dict[str, Any]]:
        return self._client.get("/api/metrics").json()

    def compile_metric(self, metric: str, fixture: str | None = None) -> dict[str, Any]:
        body: dict[str, Any] = {"metric": metric}
        if fixture:
            body["fixture"] = fixture
        return self._client.post("/api/compile", json=body).json()

    def ask(self, question: str, fixture: str | None = None, plane: str | None = None) -> dict[str, Any]:
        body: dict[str, Any] = {"question": question}
        if fixture:
            body["fixture"] = fixture
        if plane:
            body["plane"] = plane
        return self._client.post("/api/ask", json=body).json()

    def blast_radius(self, node_id: str, fixture: str | None = None) -> dict[str, Any]:
        body: dict[str, Any] = {"node_id": node_id}
        if fixture:
            body["fixture"] = fixture
        return self._client.post("/api/blast_radius", json=body).json()
