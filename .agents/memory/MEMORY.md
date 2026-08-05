# Semgraf agent memory

Index for durable cofounder memory. Agents: read this first, then open linked files that match the task.

**Protocol:** add/update memories when founder locks decisions, prefs, constraints, or pointers. One file = one fact/episode. Types: `user` | `feedback` | `project` | `reference`.

## Active memories

- [Semgraf identity](project_semgraf_identity.md) — brand, one-liner, what we are / are not
- [Locked product decisions](project_locked_decisions.md) — dual-plane MVP locks from grill
- [Founder constraints](user_founder_constraints.md) — time, day job, YC+partners parallel
- [Cofounder working style](feedback_cofounder_mode.md) — how AI should act
- [Plans & research pointers](reference_plans_docs.md) — where plans/docs live
- [Competitive landscape](reference_competitors_usp.md) — clash map + USP framing
- [Clean-room / COI gates](project_clean_room_gates.md) — personal build + disclose-before-public
- [Build progress](project_build_progress.md) — Phase 0–1 + marketing website; Ask at `/ask`
- [Skills index](reference_skills.md) — `.agents/skills/` reusable build skills
- [Website UI plan](../plans/semgraf_website_ui.plan.md) — marketing sections; Ask = sub-feature
- [Domain](project_domain.md) — `semgraf.in` live on CF Workers
- [Brand v0](project_brand_v0.md) — ascent mark in nav; v1 exploration later

## How to add

1. Create `.agents/memory/<type>_<slug>.md` with frontmatter (`name`, `description`, `metadata.type`).
2. Body: caveman-ultra; `feedback`/`project` lead with **Why:** + **How to apply:**
3. Append one line here: `- [Title](file.md) — hook`
4. Prefer update over duplicate. Link related with `[[slug]]`.
