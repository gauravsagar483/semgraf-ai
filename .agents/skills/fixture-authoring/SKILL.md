---
name: fixture-authoring
description: >
  Author Semgraf toy fixture packs (ecommerce primary, fintech secondary) with
  SQL seed, OSI-derived YAML, and lineage graph. Use when creating fixtures,
  demo datasets, or eval golden questions.
---

# Fixture authoring

## Packs

| Pack | Domain | Phase |
|------|--------|-------|
| `fixtures/ecommerce/` | orders, customers, products | Phase 0 primary |
| `fixtures/fintech/` | payments, merchants | Phase 4 |

## Each pack includes

1. `seed.sql` — DuckDB/Postgres tables + rows
2. `semantic/model.yaml` — OSI-derived metrics/datasets
3. `graph/lineage.json` (or PuppyGraph schema) — raw→model→metric→dashboard edges
4. `evals/questions.yaml` — golden asks (metric + structural)

## Rules

- Toy data only — no real employer schemas
- Keep small (demo-reliable)
- One runtime; switch pack via config/env
