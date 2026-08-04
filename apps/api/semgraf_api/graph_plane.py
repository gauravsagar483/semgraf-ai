"""In-process lineage / blast-radius over fixture graph JSON."""

from __future__ import annotations

import json
from collections import defaultdict, deque
from pathlib import Path
from typing import Any


class LineageGraph:
    def __init__(self, path: Path):
        data = json.loads(path.read_text(encoding="utf-8"))
        self.nodes: dict[str, dict[str, Any]] = {
            n["id"]: n for n in data.get("nodes") or []
        }
        self._out: dict[str, list[tuple[str, str]]] = defaultdict(list)
        for e in data.get("edges") or []:
            self._out[e["from"]].append((e["to"], e.get("type") or "RELATED"))

    def blast_radius(self, node_id: str) -> list[dict[str, Any]]:
        if node_id not in self.nodes:
            return []
        seen: set[str] = set()
        out: list[dict[str, Any]] = []
        q: deque[str] = deque([node_id])
        seen.add(node_id)
        while q:
            cur = q.popleft()
            for nxt, etype in self._out.get(cur, []):
                if nxt in seen:
                    continue
                seen.add(nxt)
                node = dict(self.nodes[nxt])
                node["via"] = etype
                node["from"] = cur
                out.append(node)
                q.append(nxt)
        return out

    def lineage(self, node_id: str) -> list[dict[str, Any]]:
        """Immediate upstream + downstream for Trace UI."""
        upstream = [
            {**self.nodes[src], "via": etype, "direction": "upstream"}
            for src, edges in self._out.items()
            for dst, etype in edges
            if dst == node_id and src in self.nodes
        ]
        downstream = [
            {**self.nodes[dst], "via": etype, "direction": "downstream"}
            for dst, etype in self._out.get(node_id, [])
            if dst in self.nodes
        ]
        return upstream + downstream
