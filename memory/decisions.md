# Decision Record — Aptitude-Prep Venture

A running log of real decisions, with rationale and what we rejected. Append new
entries at the bottom (dated). Newest context wins if anything here conflicts.

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

---

## D6 — Moat: a trusted predictive score
**Decided (principle).** Since AI-made questions aren't defensible, build toward a
**concordance** between practice performance and real outcomes — "practise here, and your
real result lands where we said." That data is a chatbot can't produce; it converts free
users to paid and employers to partners. Collect the signal from day one.

---

## D7 — Tooling: API-first in Claude Code; browser only for exceptions
**Decided.** All research + report generation runs as **code in Claude Code** (the kit in
`tools/aptitude-market-research/`), because it's reproducible, autonomous, and lives with
the repo. The web Chat tab is for **strategy**; the Chrome extension is reserve-only for
no-API sources and one-off human-in-the-loop lookups (and even browser *collection*, if
ever needed, is more robust as Playwright code than the live extension).

---

## Reference — the primary persona (from the deep-dive)
- **Priya, 22** — UK final-year student applying to 15–25 competitive grad schemes.
  Trigger: invited to an SHL test in 5 days, one shot, norm-scored, anxious, price-sensitive.
  Searches "[company] online assessment practice". Churns the moment she's hired. (~70% of intent.)
- **Arjun** — India campus placement (Mercer Mettl/AMCAT). Highest volume, mobile-first,
  very price-sensitive.
- **David** — mid-career switcher facing a CCAT/Wonderlic. Lower volume, higher WTP, underserved.

---

## Open questions to resolve next
1. Escape route (D5) — the gating decision.
2. Start market — UK vs India (D4).
3. Real keyword volumes — pull via DataForSEO/Ahrefs to confirm the long-tail SEO thesis.
4. Willingness-to-pay — does the deadline-driven moment convert at a workable price?
5. Primary validation — survey (Prolific) + fake-door landing-page CTR/WTP test.
