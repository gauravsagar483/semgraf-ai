---
name: clean-room-sanitize
description: >
  Scrub employer/product-internal terms from research, Glean output, and drafts
  before writing to Semgraf. Use when using glean-mcp, importing prior art notes,
  reviewing comments, or any content that might name employer systems.
---

# Clean-room sanitize

## Goal

Keep Semgraf repo free of employer IP fingerprints. Research OK; **names out**.

## Banned (never write to disk)

- Employer marks / company names
- Internal product codes (metrics platforms, metagraph repos, internal SQL compilers)
- Internal schema/table/metric IDs
- Copied Cypher, YAML, prompts, evals from employer systems
- Patent claim language that re-homes employer filings

## Allowed

- Public names: Colrows, dbt, Cube, Atlan, DataHub, PuppyGraph, Ossie/OSI, MetricFlow, Alkera, Kaelio, LangChain, FastAPI
- Generic terms: semantic layer, metric compiler, lineage graph, trust gate, dual-plane, MCP

## Workflow

1. If Glean/chat returns employer-specific text → rewrite in head first.
2. Replace specifics with generics:
   - “internal metrics platform” → “governed metrics runtime”
   - “company metagraph” → “relationship / lineage graph”
   - “internal SQL compiler” → “deterministic metric SQL compiler”
3. Grep before commit: employer names, known banned codes, internal hostnames.
4. Code comments: describe *behavior*, never employer ancestry.

## Checklist before write

- [ ] No employer company name
- [ ] No internal product / repo names
- [ ] No real customer / partner tables
- [ ] Comments pass “could this belong to any clean-room startup?” test
