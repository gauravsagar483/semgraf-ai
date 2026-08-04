---
name: domain-hosting
description: "Primary domain semgraf.in registered at Hostinger; static deploy host not chosen yet."
metadata:
  node_type: memory
  type: project
---

**Why:** brand URL locked; avoid re-buying / re-picking TLD mid-GTM.
**How to apply:**

- **Domain:** `https://semgraf.in/` (not `.ai`)
- **Registrar:** Hostinger
- **Deploy host:** Cloudflare (dash.cloudflare.com) — Pages + Git connect
- Keep Hostinger as registrar; DNS either stay Hostinger or move NS → Cloudflare
- Point apex + `www` at Pages custom domain
- Public go-live still behind COI gate

Related: [[clean-room-gates]] [[founder-constraints]] [[build-progress]]
