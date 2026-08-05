---
name: domain-hosting
description: "semgraf.in live on Cloudflare Workers; Hostinger registrar; NS on Cloudflare."
metadata:
  node_type: memory
  type: project
---

**Why:** brand URL locked; avoid re-buying / re-picking TLD mid-GTM.
**How to apply:**

- **Live:** https://semgraf.in/ (marketing + blog + Ask UI shell)
- **Preview:** https://semgraf-ai.gauravsagar483.workers.dev
- **Registrar:** Hostinger · **DNS/NS:** Cloudflare · **Host:** Workers static assets (`apps/web/wrangler.toml`)
- **CF build:** `npm run build` · **CF deploy:** `npx wrangler deploy --cwd apps/web`
- **Ask `/api`:** not on CF yet — static only; demo Ask needs API host later
- **Git hygiene:** push via personal (`gauravsagar483` + `personal.github.com`). Never work identity.
- Public blast / LinkedIn / partners still behind **COI gate**

Related: [[clean-room-gates]] [[founder-constraints]] [[build-progress]]
