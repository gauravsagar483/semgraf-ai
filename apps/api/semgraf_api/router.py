"""Hybrid router: structural keyword rules first, else metric plane."""

from __future__ import annotations

import re

from semgraf_api.models import Plane

_STRUCTURAL = re.compile(
    r"\b("
    r"blast\s*radius|lineage|depends\s+on|what\s+breaks|"
    r"downstream|upstream|impact\s+of|derived\s+from"
    r")\b",
    re.I,
)

_NODE_HINT = re.compile(
    r"\b(raw\.\w+|model\.\w+|metric\.\w+|dash\.\w+)\b",
    re.I,
)


def route_question(question: str, plane_override: Plane | None = None) -> Plane:
    if plane_override is not None:
        return plane_override
    if _STRUCTURAL.search(question):
        return Plane.RELATIONSHIP
    return Plane.METRIC


def extract_node_id(question: str) -> str | None:
    m = _NODE_HINT.search(question)
    if m:
        return m.group(1).lower()
    # Soft hints: "orders table" -> raw.orders
    soft = re.search(r"\b(customers|products|orders|order_items)\b", question, re.I)
    if soft:
        return f"raw.{soft.group(1).lower()}"
    soft_m = re.search(
        r"\b(total_revenue|order_count|revenue_by_segment|revenue_by_category|units_sold)\b",
        question,
        re.I,
    )
    if soft_m:
        return f"metric.{soft_m.group(1).lower()}"
    return None
