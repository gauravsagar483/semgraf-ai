---
name: build-phase
description: >
  Execute Semgraf product phases 0–4 per the dual-plane plan (scaffold, metric
  plane, relationship plane, dual runtime, harden). Use when user says build,
  phase, scaffold, continue MVP, or ship next demo slice.
---

# Build phase

## Canonical plan

`.agents/plans/dual-plane_agent_framework_6af3daeb.plan.md`

## Phase map

| Phase | Ship | Skills |
|-------|------|--------|
| **0** | Monorepo + Compose + ecommerce seed + YAML/graph stubs + README | fixture-authoring |
| **1** | Thin compiler + FastAPI + Ask/Trace (metric) + MCP metric tools + Py SDK stub | metric-compiler, ask-ui, sdk-mcp-surface |
| **2** | Graph plane + lineage UI + graph MCP + TS SDK start | relationship-plane, ask-ui |
| **3** | Hybrid router + plane badge + full MCP + `ask()` | build-phase + router in API |
| **4** | Fintech pack + evals + attestation fields | fixture-authoring |

## Workflow (every phase)

1. Read MEMORY.md + relevant locks.
2. Load `clean-room-sanitize` if any external research.
3. Implement **smallest vertical** that demos the phase goal.
4. Tests for core paths.
5. Update plan todo status + `project_build_progress` memory.
6. Stop at phase boundary unless user says continue.

## Repo layout (this workspace)

Scaffold **in-repo** under root. Python = **uv** workspace; JS = **pnpm** workspace.

```text
apps/api/  apps/web/  packages/sdk-py/  packages/sdk-ts/
fixtures/  semantic/  graph/  docker-compose.yml
pyproject.toml  pnpm-workspace.yaml
```

```bash
uv sync --all-packages --group dev
pnpm install
```

## Non-goals inside a phase

Don’t pull next phase’s systems “while here.” Sequence beats sprawl.
