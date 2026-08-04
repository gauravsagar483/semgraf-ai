---
description: How to create and update .agents/memory files
alwaysApply: true
---

# Memory protocol

Directory: `.agents/memory/`  
Index: `.agents/memory/MEMORY.md` (read every session)

## When to write

Write/update when founder locks: decision, preference, constraint, or durable pointer. Skip if already in repo/plans and nothing non-obvious.

## File format

- Name: `<type>_<slug>.md` where type ∈ `user` | `feedback` | `project` | `reference`
- Frontmatter: `name`, `description` (readable one-liner), `metadata.node_type: memory`, `metadata.type`
- Body: caveman-ultra; keep paths/URLs/commands exact
- `feedback` / `project`: include **Why:** + **How to apply:**
- Link related: `[[slug]]`
- Add index line to `MEMORY.md`

## Never store in memory

Employer secrets, credentials, internal schemas, confidential employer document contents.
