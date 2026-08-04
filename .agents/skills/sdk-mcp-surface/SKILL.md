---
name: sdk-mcp-surface
description: >
  Expose Semgraf core via Python/TS SDKs and MCP tools. Use when adding
  packages/sdk-py, packages/sdk-ts, FastMCP tools, or aligning HTTP/MCP contracts.
---

# SDK + MCP surface

## Principle

Web, SDK, MCP → **same core API**. No divergent business logic.

## Tools (metric first)

- `list_metrics`
- `compile_metric`
- `ask_metric`
- Later: `blast_radius`, `lineage`, `ask` (routed)

## Packages

- `semgraf` — Python client via **uv** workspace (`ask`, `compile_metric`, `list_metrics`, stream later)
- `@semgraf/sdk` — TS via **pnpm** workspace (web dogfoods Phase 3)

Install from repo root: `uv sync --all-packages` · `pnpm install`

## Errors

Map API codes → `OutOfScopeError`, `CompileError`, `AmbiguousRouteError`.

## Header

`X-Semgraf-Definition-Version` on responses for attestation story.
