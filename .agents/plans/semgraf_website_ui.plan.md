# Semgraf website UI plan

Marketing site first. Interactive Ask = sub-route, not the homepage.

**No competitor brand names in product UI/copy.**

## Component inventory

| # | Pattern | Semgraf component |
|---|---------|-------------------|
| 1 | Sticky nav + logo + links + primary CTA | `Nav` |
| 2 | Brand-first hero + colorful analytics stage | `Hero` + `AnalyticsStage` |
| 3 | Stack trust chips | `TrustStrip` |
| 4 | Trusted · Accurate · Scalable · Reliable | `Impact` |
| 5 | Compile · Traverse · Trace | `Pillars` |
| 6 | Intent → Resolve → Compile/Traverse → Execute | `Pipeline` |
| 7 | Tabbed surfaces | `Surfaces` → Ask \| MCP \| SDK |
| 8 | Warehouses · Semantic · Lineage · Agents | `Integrations` |
| 9 | Metric · Relationship · Trace | `DualPlanes` |
| 10 | FAQ accordion | `Faq` |
| 11 | Closing CTA + footer | `CtaBand` + `Footer` |
| 12 | Ask console | `/ask` |
| 13 | Blog | `/blog`, `/blog/:slug` |

## Information architecture

```text
/          marketing landing (scroll)
/blog      blog index
/blog/:slug  post
/ask       dual-plane Ask + Trace console (sub-feature)
```

## Visual direction (Semgraf-owned)

- **Light** surfaces (`#fff` / `#f6f5f4`) + **teal** accent (`#0f766e`)
- Colorful chart accents: coral · blue · green · amber — agent → analytics impact
- **Layout:** outer frames pad `--gutter` (`clamp(2.5rem, 9vw, 8rem)`); `.shell` = `min(100%, 1120px)` — same on `/`, `/ask`, `/blog`
- No radial fades / glow washes — solid backgrounds only
- Display: Fraunces · Body: IBM Plex Sans · Mono: IBM Plex Mono
- Brand-first hero: **Semgraf** left; Recharts analytics stage right
- Motion: settle / float-in; Recharts animation off (v3 inactive-bar bug)

## Non-goals on landing

- Full chat UI as homepage
- Fake customer logos
- Competitor comparison table by name
