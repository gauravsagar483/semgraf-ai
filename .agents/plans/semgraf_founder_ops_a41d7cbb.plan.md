---
name: Semgraf Founder Ops
overview: 90-day Semgraf founder ops playbook (YC + design partners in parallel) living only under ~/.cursor/plans/. Hard weekly time caps so product build stays primary. Covers company hygiene, pitch/demo, contacts, LinkedIn, blog/Substack, and weekly cadence.
todos:
  - id: write-playbook-md
    content: Write ~/.cursor/plans/semgraf_founder_ops_playbook.md with full templates (50-char, outreach, demo script, LinkedIn pillars)
    status: pending
  - id: link-product-plan
    content: Cross-link dual-plane product plan + founder tracker; weekly budget reminder
    status: pending
  - id: seed-week0
    content: Seed Week-0 hygiene + LinkedIn profile tasks into tracker on execute
    status: pending
  - id: coi-gate
    content: "Week-0: re-read employment agreement; manager COI chat + employer conflict process before public Semgraf / YC / outreach"
    status: pending
isProject: false
---

# Semgraf Founder Ops Playbook (90 days)

**Product:** Semgraf — dual-plane runtime for data agents: compile governed metrics, traverse verified relationships.  
**Home:** local only — [`~/.cursor/plans/`](file:///Users/gsagar/.cursor/plans/) and this repo’s `.agents/plans/` (not public GitHub product until ready).  
**North star:** Option **3** — YC pack + design partners + LinkedIn/blog **in parallel**, with hard weekly caps.  
**Companion:** separate tracker plan/file — `semgraf-founder-tracker` (progress, follow-ups, CRM lite).

## Constraints (locked)

- Nights/weekends (~8–12h/wk total build+ops).
- Day job — **no employer IP, schemas, or internal numbers** in public posts/demos. Do not name employer in this repo.
- Private product repo: `gauravsagar483/semgraf` (when created).
- Solo founder default until a real cofounder appears.
- **Clean-room / COI gate before public pitch, fundraising, or design-partner outreach** — see section below (not legal advice; confirm with manager / counsel / employment agreement).

---

## Clean-room, COI, naming — what to be aware of

**Disclaimer:** Generic founder hygiene for employed founders. **Not legal advice.** Employment agreement + local law control. When unsure → manager + employer conflict-of-interest process / counsel.

### Policy sources (read yourself)

| Doc | Why it matters |
|-----|----------------|
| Employer code of conduct / outside business policy | Proprietary info, COI, outside employment, misuse of company property |
| Employer conflict of interest + social media + AI acceptable use | Formal COI + public posting rules |
| Acceptable use of company technology | Employer devices/systems = business use; data created in course of company business → Company property |
| Information classification / IP policies | Source code, ML models/artifacts, IP treated as protected business info |
| Employer patent / invention disclosure process | Inventions in course of work duties → disclose as required; assignment may apply |
| Employment agreement | Confidentiality + **invention assignment** (primary ownership lever — re-read yours) |

### Can / must / never (practical checklist)

**Must**

1. **Disclose outside business** if it could be a COI: owning a business / second job / board seat that (a) eats job time, (b) conflicts with employer interests, or (c) risks employer business/reputation (e.g. leaking confidential info). Tell **manager**, get approval, follow employer COI form/process.
2. Treat **trade secrets, codebase, algorithms, models, company-developed software**, non-public financials, customer/partner data as confidential — never in Semgraf repo, demos, YC app, LinkedIn, or Substack.
3. Build Semgraf only on **personal time + personal hardware + personal GitHub** — not employer laptop, VPN, Slack, wiki, or employer checkouts as source.
4. Assume **overlap with day-job domain** (metrics platforms, text-to-SQL / query compilers, lineage graphs / agents over data) is **high COI + high invention-assignment risk** — get COI clarity **before** public launch / YC / paid pilots.
5. Anything invented **in course of work duties** may need invention disclosure; employer may own / file patents. Prior employer-filed text-to-SQL / query-compiler work stays employer lane — Semgraf must not claim, re-implement from that disclosure, or pitch “same invention.”

**Never**

- Copy employer code, schemas, prompts, eval sets, graph schemas, YAML metric defs, internal architecture docs, or customer data into Semgraf.
- Use employer systems to develop Semgraf (company IT use presumed business-related; work product on those systems is employer-side).
- Blog / LinkedIn about **non-public employer work**, roadmaps, or how internal systems were built.
- Name Semgraf after employer products or confuse the market with employer marks / internal product names.
- Position Semgraf using employer confidential know-how; never use employer role to take employer business opportunities for personal gain.
- Publicly disclose patentable employer work without the proper IP/legal process.

**Can (with clean room + COI approval)**

- Personal closed-source product on **generic industry problems** (agents + metrics + lineage) using **public** prior art (dbt, Cube, Colrows marketing, open papers) and **fresh** code.
- Say publicly you work on data/AI at a large company **without** naming confidential systems; founder-market-fit stories stick to **outcomes** (“shipped MCP tools for metrics,” “built NL→query systems”) not employer internals.
- Use permissive OSS (MIT/Apache) with NOTICE — not employer proprietary.

### Naming & brand

| Do | Don’t |
|----|--------|
| **Semgraf** (locked) | Employer product names, internal codenames, employer marks |
| “dual-plane,” “compile metrics,” “traverse relationships” | “employer-product for everyone,” “open-source internal metagraph,” “our query-compiler patent” |
| Toy ecommerce/fintech fixtures | Real employer schemas, partner names, internal metric IDs |
| Attribute OSS normally | Claim employer trademarks or internal product names |

Market near-miss: **Semantica** (getsemantica.ai) — say “Sem-graf”; keep one-liner on compile+traverse.

### Founder-ops gates (add to tracker)

| Gate | Before you… |
|------|-------------|
| COI: manager chat + form if required | Public Semgraf LinkedIn, design-partner outreach, YC submit, fundraising |
| Clean-room attest (self) | First external demo / video |
| Patent hygiene: Semgraf claims ≠ employer-filed invention | Any investor/YC “IP / defensibility” answer |
| Employer social media / tech blog rules | LinkedIn posts that touch day-job work |

### Talk to counsel / People when

- Manager unclear on COI approval.
- Want written clarity on whether Semgraf domain is “competing” or too close to job scope.
- Preparing to incorporate / raise / leave employer.
- Any third party asks for employer code, data, or “how your employer does it.”

## Weekly time budget (non-negotiable)

| Bucket | Hours/wk | Purpose |
|--------|----------|---------|
| Product (Semgraf build) | **6–8h** | Phase demos from product plan |
| Founder ops | **2–3h** | Pitch drafts, contacts, LinkedIn, YC fields |
| Buffer | **1h** | Follow-ups / admin |

If ops >3h in a week → cut LinkedIn to comments-only; never cut product below 6h.

---

## Workstream A — Company hygiene (Week 0–2)

Minimum viable “looks like a company”:

1. **Name + one-liner locked** (done): Semgraf + compile/traverse line.
2. **50-char company description** (YC field) — draft 10 variants; pick 1.
3. **Legal entity** — Delaware C-corp path later; for now note “not incorporated” honestly on YC. No rush to incorporate before traction unless raising.
4. **IP hygiene** — personal laptop, private GitHub, no employer code; patent-adjacent text2SQL work stays out of Semgraf claims. **COI disclose** (manager + employer process) before public Semgraf activity — see Clean-room section.
5. **Assets folder (local)** — `~/Documents/semgraf-founder/` (personal machine only): logo drafts, pitch answers, demo scripts, LOI templates, COI notes (no employer confidential docs stored here).
6. **Domain** — **DONE:** `semgraf.in` @ Hostinger. Park until COI + static deploy (CF Pages / Vercel). Optionally still claim `.ai`/`.com` later as redirect.
7. **Employment agreement re-read** — confidentiality + invention-assignment clauses; note jurisdiction.

---

## Workstream B — Pitch artifacts (Week 1–4, then refresh)

YC weights **clarity + founder + progress**, not deck polish ([YC how to apply](https://www.ycombinator.com/howtoapply)).

| Artifact | Spec | Owner use |
|----------|------|-----------|
| **One-liner** | Locked Semgraf line | Everywhere |
| **50-char** | No jargon | YC + LinkedIn headline add-on |
| **What we make** | ≤50 words, one specific thing | YC |
| **Problem / insight** | Why dual-plane now (agents fail on wrong SQL + blind lineage) | YC + blog |
| **Founder bio** | Shipped MCP / metrics / lineage-shaped *outcomes* without naming proprietary internals | YC “impressive thing” |
| **1-min founder video** | Face on camera, natural, **no script read**; product demo is separate | YC app |
| **1-min product demo** | Web Ask first (metric compile → trace), then 15s relationship blast-radius | YC optional / investors / LinkedIn |
| **10-min interview sheet** | Competitors (Cube, dbt MCP, Atlan, Colrows, Kaelio, Alkera), why us, why now, go-to-market, risks | Mock drills |
| **One-pager PDF** | Problem → product → demo link → ask | Warm intros only |

**Demo script (canonical 60s):**

1. 0–5s: problem (“agents guess SQL; lineage is a different plane”).
2. 5–25s: Ask metric → compiled SQL + version hash (fail loud if OOS).
3. 25–45s: blast radius / lineage on same fixture.
4. 45–60s: plane badge + “same core via MCP.”

---

## Workstream C — Design partners & contacts (ongoing)

**ICP (narrow):** Data/platform eng or analytics eng at mid-size SaaS who already run metrics + care about agent reliability (not “any AI buyer”).

**Target 90 days:** 20 warm outreaches → 8 conversations → 3 design-partner chats → **1–2 LOIs or written “would try”**.

**Contact sources (personal graph first):**

- LinkedIn 1st-degree data/ML/platform
- Ex-colleagues *outside* confidential employer scope
- YC alumni / founder Slack if accessible
- Conference/meetup (1 event/month max)

**Outreach template spine:** 5 sentences — who you are, Semgraf one-liner, why them, 15-min ask, no deck attached.

**Follow-up cadence:** Day 0 send → Day 4 nudge → Day 12 close loop. Log every touch in tracker.

**LOI ask (light):** “If Semgraf compiled your metrics + showed blast radius in a sandbox, would you pilot 4 weeks?” — yes/no + preferred metric.

---

## Workstream D — LinkedIn (founder-led distribution)

B2B default: personal profile > company page ([founder-led content playbooks](https://startupcookie.com/guides/founder-led-content/)).

**Profile (Week 0):**

- Headline: `Building Semgraf · dual-plane runtime for data agents` (or similar ≤220 chars)
- About: problem → one-liner → ICP → CTA (DM “semgraf”)
- Featured: demo video when ready; until then 1 strong post

**Topic ladder (only these 4 pillars):**

1. Agents + wrong SQL / governance  
2. Metrics that compile (deterministic)  
3. Relationships / lineage / blast radius  
4. Build-in-public Semgraf (shipping logs, no employer secrets)

**Cadence (fits 2–3h ops):**

- **2 posts/week** (not 5 — solo + day job)
- **5 thoughtful comments/week** on ICP posts (high ROI)
- No company page until 1k+ engaged followers or first design partner

**Never post:** employer internals, customer names without OK, employer product names as if Semgraf’s, patent claim language tied to employer filings, fake traction. Prefer industry-generic framing after COI gate.

---

## Workstream E — Blog / Substack

You already have Substack (system design tips on [GitHub profile](https://github.com/gauravsagar483/gauravsagar483)).

**Plan:**

- Keep Substack for career/system-design if desired.
- **Semgraf lane:** 1 long-form / 2 weeks on LinkedIn article *or* a Semgraf Substack section — same pillars as LinkedIn.
- First 3 posts (pre-written outline in ops hours):
  1. “Why text-to-SQL is the wrong happy path for governed metrics”
  2. “Two planes: compile vs traverse”
  3. “What I won’t ship as OSS (and why)” — positioning, not confidential leak

Month 0–3: LinkedIn primary; Substack only if a LinkedIn post wants depth.

---

## Workstream F — YC application pack (parallel, not all-consuming)

Official: [ycombinator.com/howtoapply](https://www.ycombinator.com/howtoapply) + apply form when cycle opens.

**Build continuously so next deadline is copy-paste:**

1. Draft all text answers in local `yc-answers.md`
2. Record founder video after Phase 1 web Ask works
3. Progress line: design-partner count, demo views, waitlist — honest zeros OK if velocity clear
4. Mock interview ×3 with friends before any real interview

Do **not** pause Semgraf product for “perfect app.” Product velocity *is* the application.

---

## 90-day milestone map

```mermaid
flowchart LR
  W0[Week0_hygiene]
  W2[Week2_pitch_drafts]
  W4[Week4_demo_v0]
  W8[Week8_3_partner_chats]
  W12[Week12_YC_ready_pack]
  W0 --> W2 --> W4 --> W8 --> W12
```

| Gate | Done when |
|------|-----------|
| W2 | 50-char + what-we-make + bio + LinkedIn profile live; tracker started |
| W4 | 60s product demo recorded; 10 outreaches logged |
| W8 | ≥3 design-partner conversations; 8 LinkedIn posts shipped |
| W12 | YC answer pack + founder video + 1 LOI-or-equivalent signal |

---

## Co-founder operating rhythm

**Weekly (30 min, Sunday):**

1. Open tracker — mark done / slip / next
2. Pick **one** ops outcome for the week (e.g. “5 outreaches” or “record demo”)
3. Draft 2 LinkedIn posts in batch
4. Sync with product plan phase (don’t invent new product scope in ops)

**I (AI cofounder) role when you say execute / weekly:**

- Rewrite pitch fields, critique demo script, draft posts, suggest who to contact *types*, update tracker checkboxes — never post as you, never invent metrics.

---

## Out of scope (90 days)

- Paid ads, fancy marketing site, hiring marketers
- Full incorporation/bank stack before LOI
- Conference speaking tour
- Public Semgraf GitHub (stays private)

## Deliverables when you approve execute

1. Write playbook markdown: `~/.cursor/plans/semgraf_founder_ops_playbook.md` (this content, expanded templates)
2. Init separate tracker file (see companion plan)
3. Seed Week-0 checklist items as open rows in tracker
