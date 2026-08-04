---
name: ask-ui
description: >
  Build Semgraf marketing website and Ask console (sub-feature). Use when working
  on apps/web landing, Nav/Hero/sections, or /ask Trace console.
---

# Semgraf web UI

## Jobs

1. **Marketing site `/`** — brand-first product website (scroll sections)
2. **Blog `/blog`** — Markdown posts in `content/blog/` for regular publishing
3. **Ask console `/ask`** — dual-plane Ask + Trace (**sub-feature**, not homepage)
4. Plan: `.agents/plans/semgraf_website_ui.plan.md`

## Craft bar

- One layout contract: outer frames pad `--gutter`; `.shell` = `min(100%, --shell)` only
- Same gutters on `/`, `/ask`, `/blog` (nav · main · footer)
- Light Notion-like palette (`#fff` / `#f6f5f4`) + teal `#0f766e`
- Colorful **Recharts** charts in hero (`AnalyticsStage`) + Impact section
- Impact pillars: Trusted · Accurate · Scalable · Reliable
- Brand-first: **Semgraf** dominates first viewport
- Hash anchors via `ScrollToHash` — all `/#section` Links must scroll
- Ask is one surface among MCP/SDK — never the whole product story
- Motion: settle + float-in; Recharts `isAnimationActive={false}` (v3 inactive-bar bug)

## Landing sections

Nav · Hero (+ AnalyticsStage) · TrustStrip · Impact · Pillars · Pipeline · Surfaces · DualPlanes · Integrations · FAQ · CTA · Footer

## Tech

Vite + React + TS + react-router-dom. **pnpm** workspace.
`pnpm --filter @semgraf/web dev`
