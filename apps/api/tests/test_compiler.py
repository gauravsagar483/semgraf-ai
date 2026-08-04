"""Compiler + ask smoke tests."""

from __future__ import annotations

from semgraf_api.compiler import compile_metric, load_semantic_model, resolve_metric_from_question
from semgraf_api.models import Plane
from semgraf_api.paths import semantic_model_path
from semgraf_api.router import route_question
from semgraf_api.runtime import Runtime


def test_load_and_compile_total_revenue():
    model = load_semantic_model(semantic_model_path("ecommerce"))
    sql, version = compile_metric(model, "total_revenue")
    assert "SUM(order_items.line_total)" in sql
    assert "completed" in sql
    assert len(version) == 16


def test_compile_revenue_by_segment_groups():
    model = load_semantic_model(semantic_model_path("ecommerce"))
    sql, _ = compile_metric(model, "revenue_by_segment")
    assert "customers.segment" in sql
    assert "GROUP BY" in sql


def test_resolve_aliases():
    model = load_semantic_model(semantic_model_path("ecommerce"))
    assert resolve_metric_from_question("What is total revenue?", model) == "total_revenue"
    assert resolve_metric_from_question("revenue by segment", model) == "revenue_by_segment"


def test_router_structural():
    assert route_question("blast radius of raw.orders") == Plane.RELATIONSHIP
    assert route_question("total revenue") == Plane.METRIC


def test_ask_metric_executes():
    rt = Runtime.load("ecommerce")
    resp = rt.ask("total revenue")
    assert resp.plane == Plane.METRIC
    assert resp.metric == "total_revenue"
    assert resp.error_code is None
    assert resp.rows
    assert resp.rows[0]["value"] == 1110.0  # completed lines only


def test_blast_radius():
    rt = Runtime.load("ecommerce")
    resp = rt.blast_radius("raw.orders")
    ids = {n["id"] for n in resp.downstream}
    assert "model.orders_enriched" in ids
    assert "metric.total_revenue" in ids
