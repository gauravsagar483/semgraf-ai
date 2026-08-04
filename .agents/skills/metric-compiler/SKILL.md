---
name: metric-compiler
description: >
  Implement Semgraf thin metric SQL compiler over OSI-derived YAML. Use when
  working on semantic models, compile_metric, ask_metric, DuckDB execution, or
  metric-plane API routes.
---

# Metric compiler

## Contract

1. Load OSI-derived YAML (`datasets`, `fields`, `relationships`, `metrics`, `ai_context`).
2. Resolve metric ask → slots (metric id, dims, filters).
3. Emit **deterministic SQL** from templates/IR — LLM never writes joins on happy path.
4. Optional allowlist check: tables/columns ⊆ declared fields.
5. Execute on fixture warehouse (DuckDB Phase 0–1).
6. Return: SQL + rows + `definition_version` hash + latency.

## Files (target)

- `semantic/*.yaml` — models
- `apps/api/semgraf_api/compiler/` — load, compile, hash
- `apps/api/semgraf_api/warehouse/` — DuckDB runner
- Tests: compile known metrics → golden SQL

## Errors (machine codes)

- `OUT_OF_SCOPE` — unknown metric / field
- `COMPILE_ERROR` — cannot build SQL
- `AMBIGUOUS` — need clarification (router may own this)

## Do not

- Port employer metric YAML or compile logic
- Call the compiler an internal product nickname in comments (say **metric compiler**)
- Depend on MetricFlow in Phase 1 (later adapter)
