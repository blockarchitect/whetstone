# Decision Record — Aptitude-Prep Venture

A running log of real decisions, with rationale and what we rejected. Append new
entries at the bottom (dated). Newest context wins if anything here conflicts.

> **Looking for the current-state picture instead of the history?** See `docs/` —
> curated, topic-organized, kept up to date (`docs/README.md` is the map). This file is
> the *why*; `docs/` is the *what's true now*.

---

## D1 — Vertical: pre-employment aptitude & psychometric ("C2")
**Decided.** Build for the aptitude/psychometric testing vertical.

**Why:** best fit for the actual criteria — huge, high-search demand ("[company] online
assessment practice", "SHL numerical", etc.); supply is dated/paywalled incumbents plus
a low-quality free swamp; content is style-based so **AI-generated originals are legal**;
and answers to the core constructs are **objectively verifiable**, which neutralises AI
generation's biggest weakness. Global by nature.

**Rejected / deprioritised:**
- **SAT / IELTS / TOEFL / GRE / GMAT / LSAT / MCAT** — IP-restrictive: owners lock content,
  litigate over paraphrased items, enforce trademark on naming, and bundle free official
  prep to crush third parties. Out of scope by rule.
- **Olympiads ("C3")** — considered as a co-pick, rejected as a *business*. The free
  content that makes it clean-IP is exactly why it's not defensible; AoPS already covers
  even the thin verticals (math/CS/physics/chem) with a community + coaching moat that
  AI-content doesn't touch; and Brilliant already ran the AI-native experiment here and
  pivoted to broad STEM enrichment. Keep only as an optional **engine-share** (the
  reasoning engine also powers competition/coding practice), not a bet.
- **Professional licensing (USMLE/NCLEX/CPA/Bar)** — highest willingness-to-pay, but
  AI-generated wrong answers are a liability in safety-critical domains, and UWorld/Becker
  own the explanation-quality moat. Wrong first move.
- **Finance designations (CFA/FRM/PMP)** — high value + Gulf-relevant, but Schweser/UWorld
  entrenched and CFA Institute is IP-protective. Later, maybe.
- **Government/competitive exams (India)** — proves the mock-test model works at scale, but
  geo-locked (kills the global-plus goal) and a knife-fight against unicorns (Testbook,
  Physics Wallah). Cautionary precedent, not a lane.
- **IT/cloud certifications ("C1")** — genuinely strong founder-fit and viable; not chosen
  as the lead but kept as the most credible **alternative vertical** if aptitude stalls.

---

## D2 — Content: AI-generated, but validated and calibrated
**Decided.** Generate the bank with AI; never ship raw output.

**Why:** AI collapses the industry's core cost (human item-writers) and makes staying
current cheap. But raw AI MCQs ship subtle defects (two correct answers, wrong keys,
mis-calibrated difficulty). Pipeline = **generate → validate → calibrate-live**. The
validation loop is the asset. Aptitude is ideal because correctness is machine-checkable.

**Rule:** generate only from public blueprints/syllabi/past papers; never reproduce
copyrighted items or use "dumps"; disclaim affiliation.

---

## D3 — Architecture: construct engine + test-profile skins
**Decided.** Two layers.

**Why:** the aptitude "too many formats" problem is cosmetic. Underneath, the measured
**constructs are finite** (numerical, verbal, logical, diagrammatic, abstract, + SJT etc.).
- **Layer 1 — construct engine:** AI-generated, difficulty-parameterised items per
  construct. Auto-verifiable. One numerical generator serves SHL, Korn Ferry, Cubiks, and
  any employer at once.
- **Layer 2 — test profiles:** lightweight configs mapping a target (publisher or named
  employer) to which constructs, item counts, timing, adaptive/linear, styling. Each new
  "test" is a config file, not a new content pipeline.
- **Sequence:** ship **3 constructs first** (numerical, verbal, logical — they cover most
  graduate/professional screening) in the 2–3 highest-traffic profiles; expand from there.
- SJTs (need scenario libraries + best/worst keying) and personality (not "practiceable")
  are scoped as **later/optional**.
- Gamified formats (Pymetrics/HireVue) measure the same constructs → a new skin, not a
  rebuild. The config-driven system is itself the moat vs. hand-authoring incumbents.
- **Delivery mechanics** (linear/adaptive, timing, scoring/norming) also live in the skin
  → D10. **Where skin content comes from + how it stays current** → D11 (Test Intelligence).

---

## D4 — GTM: free-tools-first, long-tail SEO
**Decided (direction).** Free, ungated, high-quality practice as the acquisition wedge;
paid depth later.

**Why:** the winnable search demand is the **long tail** (company/publisher-specific
queries) — high intent, low competition — not the incumbent-locked head terms. AI-cheap
content lets us cover thousands of variants no hand-authoring team can. Funnel: free
practice → account + readiness estimate (retention + calibration data) → paid mocks /
employer packs / analytics.

**Open:** **start market — UK vs India.** UK = highest intent + free-access headwind
(universities give students free incumbent prep); India = highest volume + very
price-sensitive. Decide based on where density is winnable first. (Validate with keyword
volumes before committing.)

---

## D5 — The LTV ceiling and the escape routes  ← KEY OPEN DECISION
**Open.** This is the decision that determines whether C2 is a business or just a product.

**Problem:** aptitude prep is transactional — candidates prep ~5–10 hrs over 1–2 weeks in
one job hunt, then churn forever. No habit, no recurring need. A better product doesn't
unlock proportionally more revenue; that's why the 30-yr incumbent still sells one-time
packs and why VCs stayed away.

**Escape routes (pick one early — it reshapes the whole product):**
1. **Broaden the job-to-be-done** — a whole-job-hunt companion (CV → aptitude → interview →
   offer). Raises LTV, defends vs. chatbot; risk = scope creep.
2. **Geography-first grad funnel** — own one ecosystem (UK or India) via
   university/society partnerships + employer packs + careers-service distribution.
   Distribution moat; keeps global upside; risk = still per-candidate.
3. **B2B / white-label flip** — license prep to universities & bootcamps for their
   students (the free-access model, but *we're* the vendor), or to employers/assessment
   vendors. Recurring, breaks the ceiling; risk = longer sales cycle.

Current lean (to pressure-test): **the B2B/white-label flip**, as the only route that
fully breaks the per-candidate ceiling.

**Update 2026-07-20 — monetization parked ~6 months; free until traction.**
Everything is **free now** — the job is audience + the concordance dataset, not revenue.
So: don't build billing/paywalls yet; keep only a **pricing/plan config stub** (plans as
data, in the config-driven spirit of D3/D8) so switching monetization on later is a data
edit, not a re-architecture. The escape-route choice above stays open but is **not
work-now**; revisit once there's traction. **Accounts & auth** are treated as standard,
mechanical work — drop in Clerk when needed (D8), not a design concern.

**Caveat that survives the parking:** "free, no-signup" (D4) pulls against the
concordance moat (D6), which needs durable identity to link practice → real outcome. So
ship **lightweight identity from day one** — anonymous device/session IDs, optional email
capture at the "get your readiness estimate" moment — *not* a login wall. Zero identity =
no D6 signal.

**Net effect on the build:** with monetization + auth de-scoped for now, the only genuinely
open engineering problems are (1) **concordance data collection** (D6 — hard) and (2) the
**agent-callable MCP surface** (D8 seam). The rest is designed or routine.

---

## D6 — Moat: a trusted predictive score
**Decided (principle).** Since AI-made questions aren't defensible, build toward a
**concordance** between practice performance and real outcomes — "practise here, and your
real result lands where we said." That data is a chatbot can't produce; it converts free
users to paid and employers to partners. Collect the signal from day one.

**Reframed by D13:** concordance isn't just a moat/conversion feature — it's the **validity
evidence** that earns the right to become the qualifying assessment itself. See D13.

---

## D7 — Tooling: API-first in Claude Code; browser only for exceptions
**Decided.** All research + report generation runs as **code in Claude Code** (the kit in
`tools/aptitude-market-research/`), because it's reproducible, autonomous, and lives with
the repo. The web Chat tab is for **strategy**; the Chrome extension is reserve-only for
no-API sources and one-off human-in-the-loop lookups (and even browser *collection*, if
ever needed, is more robust as Playwright code than the live extension).

---

## D8 — Tech stack: TypeScript end-to-end on Next.js/Vercel/Neon
**Decided.** Build the platform as one TypeScript codebase.

**Stack:**
- **Language:** TypeScript everywhere. One documented exception is allowed: the
  offline **psychometric calibration** (IRT / difficulty estimation) may use Python
  if the stats ecosystem earns it — but nothing user-facing.
- **Web:** **Next.js (App Router)** — SSG/ISR statically renders the thousands of
  long-tail `[company]-assessment-practice` pages (the D4 SEO wedge) while React runs
  the interactive timed test player.
- **Hosting:** **Vercel** — best Next.js DX, zero-config ISR + preview deploys, fastest
  agent iteration (every PR → preview URL). Chosen over Cloudflare for velocity-to-first-
  1000-pages, which is what the whole SEO thesis needs validated first.
- **Data:** **Neon** (serverless Postgres) + **Drizzle** ORM + **pgvector** (item
  dedup / answer-uniqueness in the same DB). Postgres over SQLite/D1 because concordance
  (D6) is a data play. Neon DB-branching pairs with per-PR throwaway databases.
- **Schemas:** **Zod** is the backbone, not a detail — test-profile skins (D3), item
  schemas, and *every* AI output are Zod schemas. A new "test" = a validated config object.
- **AI:** **Claude API + Agent SDK** for the generate→validate loop (D2), outputs forced
  through Zod. Analytics: **PostHog** + raw events → Postgres (concordance from day one).
- **Auth:** deferred (v1 is no-signup, D4); drop in **Clerk** when accounts + readiness
  scores arrive.
- **Tooling:** pnpm + Turborepo monorepo, Vitest + Playwright, Biome, Sentry.

**Key principle — no AI in the hot path.** Because answers are machine-verifiable
(D2/D3), the construct engine is **deterministic TypeScript generators**: pure functions
that emit an item *and its proven-correct answer* from parameters (infinite calibrated
instances, ~$0, zero hallucination). AI's role is narrower and offline: (1) author the
generator templates once (reviewed), (2) write verbal/SJT scenario content where
determinism doesn't apply, (3) write feedback prose at runtime. This is "the validation
loop is the asset" (D2) expressed in code, and it makes the engine cheap and testable.

**Agent-callable seam — expose the engine as an MCP server / clean API (reserve now,
build later).** The frontier of discovery is people asking an AI agent, not Google (see
D9). The deepest form of "optimise for agents" is to be the **tool the agent invokes**
("give me a numerical reasoning practice test") — not just a cited page. So design the
construct engine behind a clean, API-first boundary from day one, and plan an **MCP
server** surface over it. We're already on the Agent SDK and the engine is deterministic,
so this is a natural early-mover edge pure-content competitors can't follow. Don't build
the MCP surface in v1 — just keep the engine boundary clean so it drops in later.

**Rejected:**
- **Cloudflare (Workers/Pages + D1/R2)** — cheaper at global scale and the skills are on
  hand, but the Next.js story is rougher (OpenNext) and D1 is SQLite, not the Postgres the
  concordance play wants. Revisit only if unit-cost at scale ever beats time-to-validation.
- **Python/Django or a JS+Python split for the app** — every language boundary is a
  context-switch tax on future agent sessions. TS-everywhere maximises agent velocity.
- **Prisma** — Drizzle's transparent typed SQL is easier for agents to reason about than
  Prisma's codegen. **SQLite/D1** — see Cloudflare above.

---

## D9 — Growth engine: programmatic SEO loop + AEO, mostly built in-house
**Decided (direction).** Organic discovery is the growth model, not a marketing add-on.

**Why it's core infra, not marketing.** The product is one-time / low-LTV (D5): a user
preps once and churns. Paid acquisition math never closes at that LTV, so **near-zero-
marginal-cost organic discovery is essentially the entire growth model.** It gets built
as core infrastructure.

**The unfair advantage.** Our content engine *is* our SEO engine. Each
`[company]-assessment-practice` page is a **real, working free tool** (the D3 test-profile
skin over live generated items), not thin pSEO spam — so it survives Google's spam
crackdowns and is genuinely useful. Same config that spins up a "test" spins up a page.

**Buy vs. build vs. Google — all three, layered:**
- **Buy the API (already have it):** **DataForSEO** — reuse the existing pull kit for
  keyword volumes/difficulty *and* its AI-Overview / AI-mode SERP endpoints (same account
  tracks AI-answer presence). Do **not** buy a Semrush/Ahrefs *seat* — can't automate a UI,
  per-seat cost; use their API only if we outgrow DataForSEO.
- **Use Google, free:** **Search Console API** — ground truth for actual
  impressions/clicks/position per URL; the feedback loop. Non-negotiable. (+ Trends.)
- **Build in-house (thin):** the orchestration loop + the pSEO page factory. No SaaS does
  this for our template model — this *is* the automation.
- **Dashboard = a viewer, not the engine.** One "Growth" tab in the internal admin that
  *reads* the pipeline's Postgres tables. Build it **last and thin**; build the loop first.

**The loop** (a `growth/` package; mostly Vercel-cron jobs):
1. **Discover** — DataForSEO expands seeds (`config/keywords.yaml`) × companies ×
   publishers → opportunity table in Postgres.
2. **Prioritise** — score = `volume × prep-intent × (low difficulty) × can-serve-natively`.
   This is *what keywords to build for, driven by data* — long-tail employer/publisher
   terms win; head terms are incumbent-locked (D4).
3. **Generate** — winning cluster → page from a template (skin + items + AI-authored
   supporting copy, offline per D8) → Next.js ISR route + auto sitemap + auto internal links.
4. **Measure** — GSC API (rankings) + PostHog (completion/engagement) → Postgres.
5. **Iterate** — prune losers, expand winners. Closed loop.

**AEO / GEO ("people ask AI now") — not separate from SEO.** AI answers (Perplexity,
ChatGPT search, Google AI Overviews, Gemini) are retrieval-based and cite the clearest,
most structured, most authoritative answer — so crawlability is the substrate, not the
enemy. Four moves:
1. **Structure for extraction** — every page emits schema.org (`FAQPage`, `Quiz`,
   `HowTo`) generated from the same Zod config; direct-answer H2s, tables, concrete facts.
2. **Be a citable primary source** — our **concordance score (D6) is the asset**:
   "candidates scoring X in practice score Y on the real test" is a proprietary statistic
   AI engines cite because no one else has it. Moat and AEO are the same thing. Publish it.
3. **Be present where LLMs trust** — Reddit is heavily weighted; our Reddit VoC research
   doubles as AEO distribution. Add `llms.txt`; keep the crawl fast and clean.
4. **Be the callable tool** — the deepest bet: expose the engine as an **MCP server** so an
   agent asked for "a numerical reasoning practice test" *invokes us*. (Seam reserved in D8.)

**Measuring AEO:** track referral traffic from perplexity/chatgpt/gemini in PostHog, and
run a scheduled **share-of-AI-voice** check — query the AI engines (DataForSEO AI-SERP or
direct APIs) with target questions, record whether we're cited.

**Build order:** GSC + DataForSEO ingestion → opportunity scoring → one pSEO template
proven to rank → admin Growth tab → AEO structured-data + citation tracker → MCP surface last.

---

## D10 — Delivery is a per-skin strategy, not a global mode (refines D3)
**Decided.** *How* a test is delivered is a property of the test-profile skin, config-
selected — not a single global engine setting. Every test is tailored to the target
company/publisher, so some are adaptive and most aren't; the skin declares which.

**Two config dimensions per skin:**
1. **Content mix** — which constructs, style, difficulty band (the "what").
2. **Delivery mechanics** — sequencing strategy, timing, sectioning, **and scoring/
   norming** (the "how"). Norming matters: most real tests are norm-referenced
   (percentile vs a peer group), and the readiness/concordance score must mimic that
   per-test.

**The delivery-strategy menu** (finite; maps to what publishers actually do):
- **Linear, fixed** — e.g. CCAT (50Q/15min), Watson-Glaser. Ships now, no dependency.
- **Linear, timed sections** — many graduate batteries. Ships now.
- **Multi-stage / testlet adaptive** — some SHL, Aon/cut-e. Needs difficulty bands.
- **Item-level adaptive (CAT)** — SHL Verify range. Needs calibrated difficulty +
  ability estimator (see D12).

A new company's test = a config that **selects a strategy + params**, not new code
(generalize over special-casing, §7). Adaptive is *one strategy*, flagged on per skin.

**Forced sequencing:** true adaptive needs calibrated item difficulty (D12) — you can't
branch on uncalibrated AI output without branching on noise. So: **linear/timed strategies
first** (cover most profiles, ship immediately, start collecting responses) → AI-estimated
difficulty priors → calibrate-live → **switch adaptive on** for the skins that need it.

---

## D11 — Test Intelligence framework: source structure, keep it current
**Decided (direction).** A continuously-updated framework that discovers each target's
test **structure/format** and keeps skins accurate as real-world tests change. This is the
input side of D3/D10 — where skin config *content* comes from and how it stays true.

**The bright line — structure, never content.** Per the hard constraints (D2), this sources
**format metadata only**: item counts, timing, which constructs, adaptive/linear, publisher,
scoring style, format quirks. It **never ingests actual items** ("dumps"); the construct
engine generates *original* items to fit the observed format. Format is public knowledge;
items are copyrighted. Getting this wrong is existential-legal, so the line is designed in,
not bolted on.

**Sources (official-API-first, per D7):** publisher spec sheets / prep guides / official
practice; first-person candidate voice (Reddit — already pulled — plus WikiJob/TargetJobs/
Glassdoor/university forums, describing *structure* not content); employer careers pages +
job postings (name the vendor); university careers-service guides. No UI scraping.

**The loop (D2 discipline applied to metadata, not items):**
1. **Collect** — extend the existing research kit to pull format signals per target.
2. **Synthesize** — AI drafts a **Zod-schema'd profile record**; every field carries a
   **source citation + confidence + date**.
3. **Ratify** — human confirms before a profile goes live (AI drafts, human ratifies);
   low-confidence fields ship disclaimed or not at all.
4. **Version** — profiles are version-controlled config (D3/D8); every format change is a
   dated, reviewable diff with provenance. *The history is the framework.*
5. **Detect drift** — scheduled re-scans + per-profile freshness timestamp + anomaly
   detection on incoming candidate voice (new format? vendor switch?) → opens a review task.

**Users close the loop.** External sources lag; our own users are the best drift sensor —
a one-tap post-test "was this like your real test?" (plus the D6 concordance data) surfaces
a format change before any blog does. Same data infra as the moat, mutually reinforcing:
realism depends on format accuracy, and users validate both at once.

**Two guardrails against infinite work:**
- **Demand-driven, not exhaustive** — the D9 opportunity scorer ranks which profiles are
  worth building/maintaining; test intelligence follows that priority list.
- **Approximate-but-improving is fine** — constructs are stable even when exact counts are
  opaque/NDA'd; an approximate skin over an accurate engine still delivers value, labeled
  honestly ("based on candidate reports, <date>") — which is also good AEO + legal cover.

**Buy vs build:** build (no clean third-party feed; incumbents won't sell it), by extending
the research kit we already have.

**Status:** committed direction — we *will* build this. Detailed design deferred to a
dedicated later pass; the questions it must answer are tracked in `open-questions.md` §D.

---

## D12 — The data spine: identity → events → IRT calibration → concordance
**Decided (principle) / partly open.** The backend that makes both realism and the moat
possible is a single chain. Stand it up early — it gates the highest-value features.

**The chain:** lightweight **identity** (D5 caveat: anonymous device/session IDs + optional
email at the readiness-estimate moment — *not* a login wall, or D6 has no data) → **event
capture** (every answer) → **IRT calibration** → **concordance model** (D6).

**IRT calibration** — Item Response Theory: estimate each item's **difficulty/discrimination**
from real responses, and place each candidate's **ability** on a common scale independent of
which items they saw. It underpins three things: realistic **norm-referenced scoring**,
**adaptive delivery** (D10 — CAT needs difficulty params), and the **calibrate-live** step of
the content pipeline (D2 — how a raw AI item earns trust). *Cold-start problem:* a fresh item
has no data → use **AI-estimated difficulty priors**, refine with live responses, graduate
from proportion-correct → proper IRT (Rasch/2PL/3PL) as volume accumulates. This is the one
place **Python** may earn its keep (D8 exception).

**Concordance model** (the moat, D6) — maps *practice performance* → *predicted real
outcome*, built on the calibrated ability estimate. **The hardest problem in the whole
venture** — and worse than "no incentive to report": most assessments **never reveal a score
to the candidate** (pass/reject only), so collecting real *scores* is often impossible. The
reframes that make it tractable (detail → `open-questions.md` §E Q21):
- **Label = outcome, not score** — collect "did you advance / get the job?" (they *do* know
  it; more collectable *and* more useful as a pass-probability).
- **Retention is inside the hunt** — they return to practise for the next of 15–25
  applications, not post-hire; harvest outcomes incrementally, e.g. via a self-serving
  application tracker.
- **Bootstrap label-free** — internal predictive validity + a bought Prolific panel seed to
  prove the practice→outcome correlation exists before betting on it.
- **B2B/partnership is the clean label source at scale** — and it's the *same channel* as the
  D5 #3 escape route. The moat's hardest problem and the business model's best answer
  **converge on B2B**, which strengthens B2B as the likely through-line.

Needs volume *and* trust — a confidently-wrong prediction damages the claim, so it ships with
confidence intervals and corrects for survivorship bias. **De-risk stance:** make the product
fully valuable *without* concordance (moat = upside, not dependency); confirm the correlation
cheaply (panel) before committing. Collect the signal from day one even before N supports a model.

**Through-line:** IRT + concordance are the *same investment* — build the spine now and both
fall out as data accumulates. **Calibration gates adaptive delivery and a trustworthy
concordance score**, so the data spine is the highest-leverage backend to stand up early,
before it can model anything. (The MCP agent surface, D8, is separate and deferred.)

**Status:** committed direction — the spine is high-priority-early. Detailed design of IRT
calibration + the concordance model deferred to a dedicated later pass; open questions in
`open-questions.md` §E. The **MCP agent surface** (D8 seam) is likewise committed-but-later
(§F).

---

## D13 — North star (2yr): become the trusted, portable qualifying assessment
**Decided (direction).** Free consumer practice is the **wedge**, not the business. The
2-year target: Whetstone becomes the assessment employers **trust and accept directly** —
a candidate tests once on our platform and it **qualifies them for the next round at any
participating employer**, skipping their own first-stage screen. Analogue: **Duolingo
English Test** — consumer learning app that built assessment credibility and validity
evidence, then got accepted by universities as a real admissions test, displacing IELTS/
TOEFL at the decision point. Same play, for employability aptitude screening.

**Why this is the real north star — it resolves three open problems at once:**
- **D5 (LTV ceiling / escape route) — effectively answered.** Becoming trusted-assessment
  infrastructure is recurring, per-hire, B2B revenue. Not "B2B is *an* option" — B2B-as-
  assessor *is* the destination the other options were groping toward.
- **D12 §E (concordance labels) — the hardest problem dissolves.** We stop begging
  candidates to self-report an outcome we can't observe. **If we administer the qualifying
  test, we *are* the outcome** — ground truth by definition, no label-collection problem.
- **Churn — reframed as strength.** "Test once, apply to many" is maximally valuable
  exactly when candidates need it most — it's not practice, it's the actual gate.

**Concordance is re-scoped as the credential (see D6 update).** Proving "our score predicts
real performance and is fair" isn't a moat feature — it's the validity evidence that earns
an employer's trust to accept the test directly. The data spine (D12) is therefore the
**highest-priority foundation**, not a nice-to-have.

**What has to be true — the three real gates, hardest first:**
1. **Legal & psychometric validity (the big one).** A test that qualifies someone for a
   job is a hiring instrument: adverse-impact/fairness analysis (US EEOC Uniform
   Guidelines, UK Equality Act), demonstrated predictive validity, audit trail. The **EU AI
   Act classifies hiring/assessment AI as high-risk** — conformity assessment, documentation,
   bias monitoring. AI-generated items driving real hiring decisions is precisely the
   scenario regulators are watching. Expensive, slow, non-negotiable — and also the moat:
   whoever clears it first is hard to follow. Needs counsel + a psychometrician, not just
   engineering.
2. **Test security vs. the consumer product — a real design tension.** The free product
   *teaches format and lets items be farmed*, which is poison for a secure qualifying test.
   Resolve with a **two-pool architecture**: an infinite, freely-practiced *generative* pool
   (consumer, D3) and a **secured, calibrated, exposure-controlled qualifying pool**
   (assessment) — same engine, different governance + proctoring + identity verification.
   Design the engine for this split now; build the secured side later.
3. **Two-sided cold start.** Employers accept only with validity evidence + candidate
   volume; candidates value it only if employers accept it. The consumer wedge is exactly
   how this breaks — arrive at the employer conversation with an audience and evidence
   already in hand, not a pitch deck.

**How this constrains the current build (without building the endgame yet):**
- Treat the **data spine (D12)** as core/early, not deferred — it's the validity engine.
- **Design the construct engine (D3) for an eventual two-pool split** (generative vs
  secured) even though only the generative pool ships now.
- Today's **lightweight identity (D5 caveat)** should not architecturally foreclose later
  **identity verification** for the secured pool.
- Push item **calibration/provenance toward assessment-grade rigor** even though the
  consumer bar is looser — cheaper to build it right once than retrofit.
- **Brand deliberately** — "trusted assessment" is a different brand than "cram site";
  don't let short-term growth tactics burn the credibility the endgame depends on.

**Not yet:** proctoring, employer-acceptance sales motion, formal validity studies, legal
structuring as an assessment provider. These start once the consumer wedge has traction —
see `open-questions.md` §A/§H for the open questions this raises.

**Update 2026-07-20 — LinkedIn integration research corrects the precedent, doesn't kill
the thesis (see D19).** Verified live: LinkedIn discontinued its own Skills Assessments
feature in 2023 and removed badges by 2024 — hiring managers found evidence of applied
work more valuable than quiz-badge results. That's a real cautionary data point (a major
platform tried "assessment badge on profile" and pulled it), but it doesn't invalidate
the north star — Whetstone isn't meant to be a profile decoration, it's meant to be an
actual qualifying step *inside the hiring decision*, closer to how SHL functions today.
Also verified: LinkedIn's Talent Solutions partner ecosystem is **ATS-integration
focused** (Greenhouse, Workday, Bullhorn), not an assessment-vendor track. **Reframe:**
the realistic 2-year integration path is via the **ATS employers already use** (where
SHL/Korn Ferry already sit) or a direct employer relationship — not a LinkedIn
partnership. LinkedIn's role stays upstream (discovery, application, identity), not the
assessment step itself. Full detail → D19.

---

## D14 — Item bank evolution: signal beyond accuracy, at the item *and* template level
**Decided (direction).** Extends D2/D12. Accuracy alone is the shallow signal (it feeds
IRT difficulty — D12). Volume unlocks richer signals, and the mechanism that actually
"evolves the bank" is feeding them back at **two levels**: individual generated item
instances, and — the higher-leverage one — the **generator templates** that produce them
(D3). The bank is a generative space, not a fixed set, so the real question is "which
templates produce good items," not just "which instances are good."

**Signals beyond right/wrong:**
- **Timing.** Outlier response times flag *item quality*, not just difficulty — unusually
  long often means confusing wording, not a hard construct; suspiciously fast-and-correct
  often means weak/giveaway distractors.
- **Distractor distribution (highest-value, currently unused).** For every wrong option,
  track which one is picked and how often. A distractor **never chosen** → not plausible,
  wasted, weakens the item → feeds back to make it more tempting. A distractor **high-
  ability users pick confidently and repeatedly** → likely the key is wrong or there are two
  defensible answers → an **automatic answer-key audit at scale**, enforcing D2's "never
  ship raw output" rule for free, continuously.
- **Discrimination.** Does getting it right correlate with the D12 ability estimate?
  Low/negative discrimination flags a mis-keyed, ambiguous, or gameable item.
- **Differential item functioning (DIF).** Does an item behave differently across
  demographic subgroups at matched ability? Normally a "later" psychometric nicety, but
  **D13's endgame requires adverse-impact/fairness analysis as a hard legal requirement** —
  instrumenting DIF-capable subgroup-tagged data capture now is cheap; retrofitting it after
  two years of untagged data is not. Pull this dependency forward.
- **Explicit feedback + abandonment.** A "this seems wrong" flag, skip/rage-quit patterns —
  cheap, direct, catches issues before statistics have enough N.
- **Exposure tracking.** Times-served per instance; high exposure → answers get
  shared/memorized → quality erodes. Matters most for D13's future secured pool, but log
  from day one rather than retrofit.

**Item lifecycle:** `generated (AI prior) → probation (limited exposure, priors only) →
live (calibrated, trusted) → flagged (low discrimination / DIF / dead distractor / high
abandon) → retired or repaired`. Flags route to review, not auto-deletion — same
**AI-drafts, human-ratifies** pattern as D11.

**The actual evolution mechanism — template-level aggregation.** A single bad item is a
data point; the same failure pattern across *every instance from one template* is evidence
the template itself is flawed. Patch the template and every future instance improves at
once. Concretely: aggregate signal per template → crossing a threshold triggers an AI pass
that **redrafts the template** using the aggregated failure pattern as its brief (e.g.
"distractor C is never selected across 400 instances — redesign it") → human ratifies →
future generations ship better. This is D2's generate→validate→calibrate-live loop closed
at the level that compounds.

**Cross-link to D11:** a sudden aggregate-performance shift on one company's skin — scores
diverging from what test-intelligence says the format should be — is itself a drift signal,
feeding D11 from the psychometric side as a second, independent sensor alongside user
self-report.

**Status:** committed direction; detailed design (thresholds, exact DIF methodology, review
tooling) deferred — open questions in `open-questions.md` §I.

---

## D15 — Pre-intent audience capture: mine adjacent psychographic clusters (extends D9)
**Decided (direction).** D9's growth loop is entirely **bottom-of-funnel** — transactional,
"I have a test in 5 days" intent. This adds a **top-of-funnel, psychographic** channel:
reach the same underlying person (competitive, reasoning-oriented, self-improvement-minded)
*before* the job-hunt trigger fires, via correlated interests (IQ tests, brain teasers,
puzzle communities, competitive-exam culture). Different funnel stage, same engine.

**Discovery — mine the adjacency, don't guess it.** Extends the D9/D7 research kit rather
than new infra:
- **Keyword co-occurrence** — DataForSEO "people also search" / related-keywords / PAA on
  existing seed terms surfaces what else the same searchers look for. A measured pattern,
  not a hunch.
- **Referral-source mining** — Similarweb traffic-source data on competitor domains (already
  pulled) shows where their audience currently comes from; adjacent channels arrive
  pre-validated by someone else's traffic.
- **Trends correlation** — interest-over-time comparison between core terms and candidate
  adjacent terms, by geography, surfaces temporal/psychographic links (e.g. does "IQ test"
  search volume in India spike around campus placement season?).
- **Reddit community adjacency** — extend the existing VoC pull: which subreddits show
  cross-membership with career subreddits? **Aggregate-level only** — no individual user
  tracking; the marginal signal isn't worth that privacy line.

This is a **standing, re-run module** in the growth engine, not a one-time brainstorm —
psychographic clusters shift the way keyword opportunities do.

**Activation — same engine, new skin, different motivation.** D3's insight applied to
*audience* instead of employer: numerical/verbal/logical reasoning items **are** what
IQ-style content measures — no new content pipeline, just a skin framed for curiosity
("how sharp is your logical reasoning?") instead of anxiety ("practice for your SHL test"),
with shareable score cards for virality. Capture with the existing lightweight identity
(D5/D12) and **nurture until the job-hunt trigger eventually fires** — pre-intent capture
with a long runway; a genuine retention/LTV lever, not just vanity traffic.

**Guardrails (do not skip):**
- **Brand collision with D13.** Generic "IQ test" content is a crowded, low-trust space
  (dark-pattern paywalls, junk-science reputation) — exactly wrong next to "the assessment
  employers trust." Needs a deliberate **brand-architecture answer** (already open, Q33),
  not a default; likely a distinct sub-brand/bucket held to the same no-dark-patterns rigor
  so it reinforces credibility instead of undermining it.
- **Claim discipline.** Never claim to measure "IQ" specifically — a stronger, more legally
  exposed claim than "reasoning score." Same overclaim discipline as D2. Frame as reasoning/
  logic challenges.
- **Scope guardrail — this is a channel, not a pivot.** D1 already parked general
  cognitive/Olympiad content as *engine-share only, not a business*. This stays exactly
  that: an acquisition channel on the existing engine, never a quiet drift into being an
  IQ-test site.

**Status:** committed direction; open questions in `open-questions.md` §J.

---

## D16 — Test format & UI/UX fidelity, plus quick-practice modes (extends D3, D10, D11)
**Decided (direction).** Extends the skin model with a new dimension: skins select a
**UI shell**, not just content mix + delivery strategy. A finite menu of interaction
patterns — one-question-per-screen with no back button, section-based with a review
screen, visible vs. hidden countdown, calculator overlay, flag-for-review — the same
"config, not new frontend code" philosophy as D10's delivery-strategy menu. A new test
picks a UI shell + delivery strategy + content mix.

**Guardrail — functional pattern yes, visual branding no.** Two different things get
called "replicate the UI":
- **Functional interaction pattern** (no back button, timer position, pacing) —
  legally low-risk (functional UI patterns are generally not protectable), and it's
  what actually matters for realistic test-day pressure. Test Intelligence (D11) should
  source this the same official-API-first / candidate-voice way it sources format.
- **Visual branding** (their exact logo, color scheme, chrome) — risks **trade dress /
  passing-off** exposure, a *different* legal category from D2's copyright concern.
  Disclaiming affiliation doesn't fully cure "looks enough like SHL to confuse someone."
  **Rule: replicate the pressure and pattern, never the pixels or branding.**

**Quick-practice / warm-up tests** — a new entry in the D10 delivery-strategy menu:
short, low-stakes, instant per-item feedback, single or mixed construct. High-leverage
for several reasons at once: reinforces retention-inside-the-hunt (something to do
between full mocks, see D12); the ideal top-of-funnel format for pre-intent capture
(D15) — low commitment; more frequent low-stakes touches accelerate IRT calibration
data collection (D12); and it's the literal content unit for D18's daily micro-content.

**Status:** committed direction; open questions in `open-questions.md` §K.

---

## D17 — Deep reporting: an insight engine downstream of the data spine
**Decided (direction).** A genuinely new architectural layer, not previously designed:
sits downstream of IRT calibration + item-level signals + the concordance model (D12)
and turns them into a diagnostic report, not just a score. This is a real product moat
in its own right — incumbents give a raw score; deep, specific diagnosis is
differentiated and hard to copy.

**What a deep report surfaces (mostly signal already planned for other reasons,
reused for a new purpose):**
- **Per-skill breakdown**, not just per-construct (e.g. numerical splits into data
  interpretation / arithmetic / ratios). **Dependency to lock in now:** generator
  templates need fine-grained skill tags from day one — the same "instrument now or
  lose it" pattern as D14's DIF-tagging point. Historical data can't be retroactively
  sliced by sub-skill if it wasn't tagged going in.
- **Speed/accuracy diagnosis** ("fast but careless" vs "accurate but too slow") —
  reuses D14's timing signal, repurposed from item-quality auditing to individual
  diagnosis.
- **Error-pattern analysis** — reuses D14's distractor-distribution signal; there it
  flags a bad item, here it tells a user *what kind* of mistake they're making.
- **Progress over time** across sessions — reinforces the return-and-practice loop.
- **Benchmarking vs a peer group** (or same-employer test-takers) — compelling to the
  user and a citable stat for AEO (`04-growth-engine.md`); depends on resolving the
  norming question (`open-questions.md` §C Q11).
- **A readiness/concordance summary** — where the D12 moat becomes visible to the user,
  not just a backend model.
- **A specific next action** — "weak on ratios, try these 3 warm-ups" — closes the loop
  with D16's quick-practice format.

**Status:** committed direction; open questions in `open-questions.md` §L.

---

## D18 — Daily micro-content distribution (extends D15/D9)
**Decided (direction).** A concrete, channel-agnostic tactic under pre-intent audience
capture (D15): one calibrated item a day, scheduled, posted as a poll/question people
answer in-feed, with a reply/thread revealing the answer + a short explanation + a link
back to "practice more." Zero new content pipeline — it's D16's quick-practice format,
picked and dispensed on a schedule. Wordle-style mechanics apply directly: appointment
habit, shareable results, zero-friction participation (answer without leaving the feed).

**Channel — don't commit yet, match the persona.** The original spitball was Twitter,
but that's not obviously the best fit for the actual personas (`01-strategy.md`):
LinkedIn is more career-native for Priya (UK grad); a **WhatsApp broadcast channel** is
likely far higher-reach for Arjun (India, the highest-volume persona) than Twitter.
Candidates to test: LinkedIn poll, WhatsApp broadcast channel, X/Twitter poll, daily
email — pick by where the audience actually is, not by which felt most obvious first.

**Bonus, low-confidence:** even anonymous poll results ("73% got this wrong") are a
free, crude difficulty-calibration signal into D14's item evolution — noisy and
self-selected, so treat as a weak prior, not a substitute for real platform data.

**Honest framing:** a cheap experiment worth trying, not a growth *pillar*. Unlike the
SEO/AEO loop (D9), reach here depends on audience/virality that isn't guaranteed to
compound the way search does — don't over-invest relative to the core engine.

**Status:** committed direction; open questions in `open-questions.md` §M.

---

## D19 — LinkedIn: organic + OAuth now, ATS/employer integration is the real later play
**Decided (direction), grounded in live research 2026-07-20.** LinkedIn is where a large
share of the target audience's job hunt actually happens, so it's worth a deliberate
plan — but the plan has to fit what the platform actually permits, not what "deep
integration" sounds like it should mean.

**Reality check (verified, not assumed):**
- **No open API for growth automation.** All meaningful LinkedIn API access (posting
  automation, analytics, audience targeting) sits behind Marketing Developer Platform
  (MDP) approval — a verified company page, manual review running 4 weeks to 4 months,
  "generally reserved for enterprise partners." No self-serve growth-automation tier
  exists. This is the existing official-APIs-only rule (D7) applied to a platform that
  currently has almost nothing self-serve to call.
- **LinkedIn Skills Assessments is dead — corrects a precedent, doesn't kill the
  thesis.** LinkedIn discontinued its own skills-quiz-badge feature in 2023, badges
  removed by 2024, citing that hiring managers valued evidence of applied work over
  quiz results more than a badge. Real cautionary data point (see D13 update), but
  Whetstone's thesis was never "be a profile badge" — it's "be an actual qualifying
  step in the hiring decision," a different claim entirely.
- **LinkedIn Talent Solutions' partner ecosystem is ATS-integration focused**
  (Greenhouse, Workday, Bullhorn), not an assessment-vendor track. **The real 2-year
  integration path is via the ATS employers already use** (where SHL/Korn Ferry already
  sit) or direct employer relationships — not a LinkedIn partnership. LinkedIn's honest
  role stays upstream: discovery, application, identity. See D13 update.

**What's actually available, layered by what's real now vs. later:**
1. **Now, zero API/approval:**
   - Company page + founder-led organic content (Ankur posting insights, using
     research-kit data — D9 — as content fodder). Proven, zero-cost B2B/founder-led
     growth channel.
   - **LinkedIn native Polls as the D18 daily-micro-content pilot channel.** Since no
     automation is available anyway, manual-first is the *only* realistic option here —
     making LinkedIn the natural first channel to pilot D18 on, ahead of WhatsApp/email.
   - A shareable **"certificate" artifact** for LinkedIn's Licenses & Certifications
     profile section — fully manual, user-driven. A candidate who completes a report
     (D17) or clears a benchmark gets a certificate they add themselves. This *is* the
     legitimate version of the credential-display pattern LinkedIn now points to
     (third-party certs), not the dead in-platform quiz pattern.
2. **Near-term, confirmed self-serve, no approval required:** **"Sign in with LinkedIn"
   (OpenID Connect)** — free, self-serve, no approval needed. Extends the lightweight-
   identity model (D12): an *optional* richer sign-in pulling school/industry/role with
   zero onboarding friction. Anonymous stays the default (D5/D12) — this is an
   enhancement, not a requirement. Also a partial (not sufficient) building block for
   D13's eventual identity-verification question.
3. **Later, real BD/partnership process — don't build now:**
   - **LinkedIn Ads** — a mismatch for candidate acquisition (contradicts D9's own
     paid-doesn't-close logic on a one-time-LTV product), but legitimate later for
     reaching career-services/TA buyer personas once the B2B motion is active —
     completely different LTV math on that side.
   - **MDP-approved automated posting** — only worth the weeks-to-months approval cost
     once daily content is proven manually.
   - **The real deep integration** — an ATS-level assessment-provider relationship,
     gated behind the same three D13 gates already on record. LinkedIn doesn't shortcut
     those.

**Explicit guardrail — extends D7.** No scraping profiles/job posts, no automated
connection requests or DMs, no third-party "growth tool" browser extensions. LinkedIn
enforces this aggressively (account bans, real litigation history) — squarely inside the
existing official-APIs-only rule, stated explicitly here because "deep integration"
could otherwise be misread as license to automate.

**Status:** committed direction; open questions in `open-questions.md` §N.

---

## D20 — Roadmap triage: seven parking-lot ideas promoted, with horizons
**Decided (direction).** Triage of the 2026-07-20 brainstorm parking lot — which raw
ideas get real investment and roughly when, moving them from "unvetted spitball" to
"committed direction with a horizon." Doesn't design any of them in detail yet.

- **Now/soon — campus "test captain" ambassadors + live "test night" events.** The
  same motion: captains organize local synchronous test events. New growth channel —
  community/events — distinct from pSEO/AEO/pre-intent-capture/daily-content (D9/D15/D18).
- **Now/soon — bootcamp/ed-tech partnerships.** Distribution-first (audience access,
  still free), consistent with D5's parked monetization. **Flag:** if any of these
  become *paid* white-label deals, that's revenue arriving ahead of the "~6 months
  parked" monetization schedule — worth flagging explicitly when it happens, not a
  blocker to pursuing the conversations now.
- **A few months out — sponsor a streamer speedrunning a mock test.** A concrete D15
  pre-intent-capture tactic, explicitly later-horizon (needs the product to be
  demo-worthy first).
- **Ongoing, traffic-driving — the Reasoning Readiness Index + placement reports.**
  Folds into the existing AEO "be a citable primary source" move (D9) — public,
  aggregate, anonymized content that builds authority ahead of the D13 endgame.
- **Down the road — academic validity studies.** Matches D13's own sequencing (gate #1,
  meant to follow consumer-wedge traction) — not accelerated, just confirmed.
- **Elevated to top priority — verifiable-credential signing.** Ties directly to D13's
  "portable, trusted credential" thesis and D19's near-term shareable-certificate idea.
  **Concrete implication:** the first certificate ever issued should be **signed from
  day one** (W3C Verifiable Credentials or an equivalent signed-token approach) — same
  "instrument now or lose it" pattern as DIF-tagging (D14) and skill-taxonomy tagging
  (D17). Verification can't be retrofitted onto certificates already in the wild.

**Status:** committed direction, horizons set; none of these are designed yet — see
`open-questions.md` §O.

---

## D21 — Gamification layer: infrastructure several decisions already depend on
**Decided (direction).** Not a bolt-on skin — several already-decided pieces quietly
need this to function: live test-night events (D20) need a real-time leaderboard to
exist at all; daily micro-content (D18) leans on Wordle-style streak/share mechanics as
its core reason to work; retention-inside-the-hunt (D12) is fundamentally "give someone
a reason to return tomorrow." A gamification layer is what delivers all three, not a
decoration added after them.

**The mechanics (a menu, config-driven like everything else in this architecture):**
- **Streaks** — daily practice, the retention engine for D12/D18.
- **XP/levels, weighted by genuine effort, not raw volume.** Architecturally load-
  bearing, not cosmetic: rewarding item count over accuracy incentivizes rushing/
  guessing to farm streaks, which **pollutes the timing and accuracy signals** D14's
  item-bank evolution and D17's reporting depend on. Reward accuracy-adjusted
  engagement.
- **Per-skill mastery badges** — a friendlier face on D17's per-skill breakdown, once
  the skill taxonomy exists.
- **Leaderboards** — the literal dependency D20's live events need.
- **Shareable result/streak cards** — the artifact D15 (virality) and D18 (daily
  content) both already assumed existed.
- **Self-wager on your own outcome** (parking lot idea, `open-questions.md`) —
  graduates into this layer rather than staying standalone; a gamification mechanic
  that's also a possible unlock for D12's hardest problem (concordance labels).

**Two guardrails, stated now rather than discovered later:**
- **Keep badges visually and architecturally separate from the signed credential
  (D20).** A streak badge must never be confused with, or sit next to, the serious
  employer-trusted artifact. Same brand-discipline instinct as D15's IQ-test-content
  guardrail and D13's trust question.
- **Leaderboards default to anonymous/pseudonymous, opt-in to public.** The primary
  persona (Priya, `01-strategy.md`) is explicitly anxious and price-sensitive — a public
  ranking against peers possibly applying to the same job could read as a stressor, not
  a motivator.

**Status:** committed direction; detailed design deferred → `open-questions.md` §P.

---

## D22 — Vertical-agnostic architecture: the platform vs. the plugin
**Decided (principle).** The engine, delivery, and mechanisms should work for *any* test
type, not just aptitude/psychometric — so a future pivot or expansion is a config swap,
not a rebuild. Not new scope: it's the same discipline that's recurred throughout this
record (DIF tagging D14, skill taxonomy D17, credential signing D20 — "instrument now or
retrofit never") generalized one level up, applied everywhere, not just those four spots.

**The split — most of the machinery is already generic, almost by accident, because
"config, not new pipeline" has been the throughline since D3:**
| Platform (vertical-agnostic, already mostly right) | Plugin (vertical-specific, needs discipline) |
|---|---|
| Delivery strategies (D10), UI shells (D16), IRT calibration (D12), item lifecycle/evolution (D14), gamification (D21), credential signing mechanism (D20), growth-engine machinery (D9), Test Intelligence's collect→synthesize→ratify→version loop (D11) | The construct generators themselves (D3 layer 1), Test Intelligence's *source list*, the hard-constraint specifics (which tests are IP-excluded), GTM seed keywords/personas (D4/D9), the skill taxonomy (D17) |

**Concrete discipline this requires, cheap now / expensive to retrofit later:**
- Item/construct schemas (Zod, D8) carry a `domain` field from day one, even with one
  domain shipping.
- Test Intelligence's source config is parameterized by vertical, not hardcoded to
  publisher/employer sources.
- The skill taxonomy (D17) is a per-domain pluggable config, not logic baked into the
  reporting engine.
- **D1's rejected-alternatives table is already a reusable evaluation framework** (IP
  posture, verifiability, search demand, competitive landscape) — recognize it as that
  explicitly, so assessing a future pivot is "run the framework again," not "start over."

**Reconciles with D1, doesn't contradict it.** D1 ("one vertical, not a unified
multi-test platform") is a *business/brand focus* decision — don't blur GTM, content
investment, or brand across verticals. This is an *architecture* decision — don't let
that focus leak into the engine as hardcoded assumptions. Stay narrow on the outside,
stay portable underneath.

**Guardrail against over-engineering.** This is "keep the seams clean and named," not
"build a multi-vertical plugin marketplace now" — that would be exactly the speculative
over-engineering the codebase's own engineering principles warn against (a seam for a
real second use, not a hypothetical one). The cost here is genuinely small: field names
and config boundaries, not a plugin framework.

**Status:** committed direction/principle; applies retroactively as discipline to
D2–D21, not a new build item on its own → `open-questions.md` §Q.

---

## D23 — Service boundaries: Platform / Content Engine / Growth Engine
**Decided (direction).** Split the system into three independently deployable apps,
staying in the **same Turborepo monorepo** (D8) rather than separate repos — independence
comes from clean contracts, not physical repo separation:
- **Platform** — the customer-facing Next.js app (delivery, reporting UI, gamification,
  pSEO pages). **Whetstone-specific.**
- **Content Engine** — the construct engine, item lifecycle, calibration (D3/D12/D14).
  **Reusable across products.**
- **Growth Engine** — the SEO/AEO tooling (D9). **Reusable across products** — this was
  the explicit trigger for this decision: it should be usable by future ventures, not
  wired into Whetstone.

**The second axis of D22's principle.** D22 asked "can the engine serve a different
*test type*." This asks "can the engine/tooling serve a different *product entirely*."
Same mechanism both times: no product-specific hardcoding (keyword seeds, branding,
domain names) lives *inside* Content Engine or Growth Engine — it's **supplied to them**
as config from outside. Whetstone is their first customer, not baked into their core.

**The mechanism that makes "independent yet seamlessly leveraged" real, not
aspirational:**
- **The only shared code is a type contract, never business logic.** A `schemas/`
  package (Zod) with item/skin/growth-opportunity/credential definitions. Every app
  compiles against it; none import each other's internals.
- **Runtime communication is typed HTTP, not shared DB access.** Platform calls Content
  Engine's API for items; it never reads its tables directly. Same for Growth Engine.
  This is what makes the boundary real instead of convenient fiction.
- **Each app owns its own Postgres schema** — same Neon instance for now (no reason to
  pay for three databases on day one, doesn't contradict D8), logically separated so a
  future physical split is a config change, not a migration project.

**A real decision, not a default:** for the Content-Engine/Growth-Engine boundary
specifically, lean toward **plain Zod-validated HTTP APIs over tRPC**, even though tRPC
is the more natural TS-monorepo choice. tRPC ties consumers to sharing this exact
type-import setup — fine internally, but works against "usable by other products" the
moment a consumer isn't in this repo. Standard HTTP is the more portable default given
the explicit reuse goal.

**Open, not resolved:** Content Engine and Growth Engine are batch/worker-shaped
(scheduled jobs, AI calls, longer-running) — a different runtime profile than Platform's
low-latency serving. Whether that's Vercel Cron functions or a separate worker process
isn't decided.

**Guardrail against over-engineering.** All of this fits in the *same* repo on day one —
not three infra stacks now. Physical extraction (separate repo/deploy target, independent
scaling) is a lever to pull when a second product genuinely needs it, not before. Same
discipline as D22.

**Status:** committed direction; open questions in `open-questions.md` §R.

---

## D24 — Market/vendor intelligence + geography scoping (extends D11)
**Decided (direction).** Two additions to Test Intelligence (D11).

**1. Vendor mapping — the "who," not just the "what."** D11 assumes you already know
which publisher an employer uses and sources what that publisher's test looks like. This
adds the layer before it: which vendor(s) a given employer currently uses at all, since
that changes as employers switch providers (contract renewals, M&A). **Cheap extension,
not a new pipeline** — same sources D11 already pulls (candidate voice), tagged to also
capture which vendor was mentioned. Plus two vendor-specific public sources: employer
careers/FAQ pages (often name the assessment partner directly) and vendor case-study/
client pages (public, but lower-confidence for *currency* — marketing lags reality and
showcases favorable clients only).

**Currency reuses D11's existing drift-detection mechanism, extended by one field.** The
post-test "was this like your real test?" prompt also captures which vendor it was — the
same "users close the loop" mechanism, not a new one.

**2. Geography scoping — a schema implication, not just a data point.** The same
employer often uses different vendors/formats in different regions (UK grad scheme vs.
India campus placement, e.g.). A test-profile skin's identity isn't `{company,
publisher}` — it's `{company, publisher, geography}`. Vendor-mapping and format records
need a **geography field from day one** — same "instrument now, don't retrofit" pattern
as DIF-tagging (D14), skill taxonomy (D17), credential signing (D20).

**Sharpens D4's stakes.** Expanding to a second start-geography isn't just translating
content/SEO — it's re-running vendor-mapping and format research for that market. **A
third axis of D22's principle** (domain portability → D22, product portability → D23,
now geography portability) — same discipline: don't hardcode geography assumptions into
a supposedly generic sourcing loop.

**Nice byproduct:** the vendor-mapping data is itself public-content material — "which
assessment does [company] use" is a real search pattern, same AEO play as the Reasoning
Readiness Index (D20). Building it for accuracy and shipping it as growth content are
the same effort.

**Guardrail:** demand-driven like D11 — track company×geography pairs the D9 opportunity
scorer says are worth it, starting with the chosen start-market, not globally.

**Status:** committed direction; open questions in `open-questions.md` §S.

---

## D25 — SEO/AEO data flow across the three apps (extends D23)
**Decided (direction).** "Growth Engine decides what to build, Content Engine builds it,
Platform delivers it" is the right forward-flow framing, but there's an equally
important backward flow it leaves out: **measurement forks into two, not one loop back.**

**Forward (decide → build → deliver):** Growth Engine scores an opportunity and sends
Content Engine a build signal — this company × publisher × geography cluster is worth a
skin. Content Engine's Test Intelligence (D24) sources the real detail; the construct
engine generates + calibrates the items; it's exposed as a skin via API (D23). Platform
renders **both** the test-taking experience **and** the pSEO page — combining Content
Engine's real test data with Growth Engine's separate SEO/AEO requirements (schema.org,
meta patterns, target keyword cluster). The page is a genuine tool wearing SEO clothing,
not the reverse.

**Backward (measure → recalibrate / measure → reprioritize) — the fork.** Platform
captures **one raw event stream**. It splits to two different consumers for two
different purposes:
- **→ Content Engine:** item-response data (correct/incorrect, timing, distractor
  choice) feeds IRT calibration and item-bank evolution (D12/D14).
- **→ Growth Engine:** page-level traffic/engagement data, alongside GSC data pulled
  independently, closes its own opportunity-scoring loop (D9) — which clusters are
  actually working, prune vs. expand.

Same source, two destinations, two different jobs. Neither consumer needs the other's
half of the stream — this is itself an argument for D23's schema-per-app separation:
Content Engine's calibration tables and Growth Engine's traffic-scoring tables are
different shapes, populated from the same Platform-captured events via two separate
typed API calls (or a fan-out event queue), not one shared table both read from.

**Status:** committed direction; open questions in `open-questions.md` §T.

---

## Reference — where things live now
This file is the **historical reasoning log** (why we decided X, what we rejected) — it
stays append-only and chronological. Two other places hold the material that used to
live inline here:
- **`docs/`** — the curated, current-state reference (personas, architecture, growth
  engine, stack, etc.), organized by topic and kept up to date. Start there for "what's
  true now"; come back here for "why." See `docs/README.md` for the map.
- **`memory/open-questions.md`** — the living brainstorm log. Follow-ups from any
  conversation get appended there, grouped by area, not here.
