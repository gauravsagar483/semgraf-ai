---
name: relationship-plane
description: >
  Build Semgraf relationship plane — lineage, blast radius, graph tools over toy
  tables. Use when implementing PuppyGraph schema, ask_graph, blast_radius, or
  Trace lineage UI.
---

# Relationship plane

## Contract

- Structural asks: “what breaks if…”, “depends on”, “lineage of X”
- Tools: `blast_radius`, `lineage`, later guarded Cypher
- Phase 0–1: in-memory / SQLite edge tables OK if PuppyGraph not up yet
- Phase 2: PuppyGraph on toy tables per Compose

## Guards

- No free-form Cypher from LLM to prod
- Fixed traversals preferred for demo reliability
- Results cite node ids from **fixture** graph only

## Files (target)

- `graph/` — schema + seed edges
- `apps/api/semgraf_api/graph/` — queries + guards
- Web Trace: list/tree of downstream nodes

## Naming

Say **relationship plane** / **lineage graph** — not employer metagraph product names.
