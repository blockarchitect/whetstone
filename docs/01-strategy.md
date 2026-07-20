# Strategy — what we're building, and why

*Full reasoning + rejected alternatives: `memory/decisions.md` D1, D5, D13.*

## The north star (2 years): become the trusted, portable qualifying assessment
Free consumer practice is the **wedge, not the business.** The target: a candidate tests
once on Whetstone and it **qualifies them for the next round at any participating
employer** — skipping that employer's own first-stage screen. Analogue: the **Duolingo
English Test** — a consumer learning app that built assessment credibility and validity
evidence, then got accepted by universities as a real admissions test, displacing
IELTS/TOEFL at the decision point. Same play, for employability aptitude screening.

**Why this is the real north star — it resolves three problems that otherwise stay open:**
- **The LTV ceiling.** Candidates prep once and churn; a better product alone doesn't
  unlock more revenue. Becoming trusted-assessment infrastructure is recurring, per-hire,
  B2B revenue — not "an" escape route, but the one the others were groping toward.
- **The concordance-label problem** (→ `03-data-and-trust.md`). We stop needing
  candidates to self-report an outcome we can't observe. If we administer the qualifying
  test, **we are the outcome** — ground truth by definition.
- **Churn, reframed as strength.** "Test once, apply to many" is maximally valuable
  exactly when candidates need it most.

**Concordance is the credential.** Proving "our score predicts real performance and is
fair" is the validity evidence that earns an employer's trust to accept the test
directly — not a moat feature bolted on later. This makes the data spine
(`03-data-and-trust.md`) a **highest-priority foundation**, not a nice-to-have.

### The three real gates (hardest first)
1. **Legal & psychometric validity.** A test that qualifies someone for a job is a
   hiring instrument: adverse-impact/fairness analysis (US EEOC Uniform Guidelines, UK
   Equality Act), demonstrated predictive validity, an audit trail. The **EU AI Act
   classifies hiring/assessment AI as high-risk** — conformity assessment, documentation,
   bias monitoring. Expensive and slow, but also the moat: whoever clears it first is
   hard to follow. Needs counsel + a psychometrician, not just engineering.
   **Down-the-road concrete step (promoted from brainstorm, 2026-07-20):**
   co-publishing validity studies with a university I-O psychology department — they
   want publications, we want this evidence. Correctly sequenced *after* consumer-wedge
   traction and D12 data-spine maturity, not accelerated. → `open-questions.md` §O Q62.
2. **Test security vs. the consumer product.** The free product teaches format and lets
   items be farmed — poison for a secure qualifying test. Resolved by a **two-pool
   architecture** (generative/consumer vs. secured/qualifying, same engine, different
   governance) — see `02-product-architecture.md`.
3. **Two-sided cold start.** Employers accept only with evidence + volume; candidates
   value it only if employers accept it. The consumer wedge is how this breaks — arrive
   at the employer conversation with an audience and evidence already in hand.

**The integration path, corrected by live research (2026-07-20):** the instinct is
"integrate with LinkedIn," but LinkedIn discontinued its own Skills Assessments feature
in 2023 and its Talent Solutions partner ecosystem is ATS-focused (Greenhouse, Workday,
Bullhorn), not an assessment-vendor track. **The real integration path is via the ATS
employers already use** (where SHL/Korn Ferry already sit) or a direct employer
relationship. LinkedIn's honest role stays upstream — discovery, application,
identity — not the qualifying step itself. Full detail → `04-growth-engine.md`, D19.

### What this constrains today (without building the endgame yet)
- Treat the data spine as core/early — it's the validity engine.
- Design the construct engine for an eventual two-pool split, even though only the
  generative pool ships now.
- Today's lightweight identity shouldn't architecturally foreclose later identity
  verification.
- Push item calibration/provenance toward assessment-grade rigor even though the
  consumer bar is looser — cheaper to build right once than retrofit.
- Brand deliberately — "trusted assessment" is a different brand than "cram site."

**Not yet:** proctoring, employer-acceptance sales motion, formal validity studies, legal
structuring as an assessment provider. Open questions this raises → `open-questions.md` §A, §H.

---

## The vertical: pre-employment aptitude & psychometric testing
Chosen over SAT/IELTS/GRE-type tests (IP-restrictive, litigious owners), olympiads
(not defensible as a business), professional licensing (AI wrong-answer liability in
safety-critical domains), and Indian government exams (geo-locked, unicorn-crowded).
Why aptitude wins: huge high-search demand, dated/paywalled incumbents, content is
style-based so **AI-generated originals are legal**, and the core constructs are
**objectively verifiable** — which neutralises AI generation's biggest weakness. Global
by nature. Full rejected-alternatives detail → decisions.md D1.

**One vertical, not a unified multi-test platform** — deliberately. This is a
*business/brand* focus decision, not an architecture one: the underlying engine is kept
deliberately vertical-agnostic (`02-product-architecture.md`, D22) so a future pivot or
expansion — IT certs was already logged as the credible alternative — is a config swap,
not a rebuild. Stay narrow on the outside, stay portable underneath.

## Business model & the LTV ceiling
**Monetization is parked (~6 months out).** Everything is free right now — the job is
audience + the concordance dataset, not revenue. Only build a **pricing/plan config
stub** (plans as data) so turning monetization on later is a data edit, not a
re-architecture. **Accounts & auth** are standard, mechanical work — drop in Clerk when
needed, not a design concern.

**The caveat that survives parking:** "free, no-signup" pulls against the concordance
moat, which needs durable identity to link practice → real outcome. Ship **lightweight
identity from day one** — anonymous device/session IDs, optional email capture at the
"get your readiness estimate" moment — *not* a login wall.

**Bootcamp/ed-tech partnerships (promoted from brainstorm, 2026-07-20; now/soon
horizon).** Pursue these as **distribution-first** — audience access via the
partnership, still free — consistent with the parking above. **Flag:** if any of these
become *paid* white-label deals, that's revenue arriving ahead of the "~6 months"
schedule. Decide which kind of deal it is *before* the first conversation, not during
it → `open-questions.md` §O Q59.

**Net effect:** with monetization + auth de-scoped, the genuinely open engineering
problems are the **data spine / concordance** (`03-data-and-trust.md`) and the **Test
Intelligence framework** (`02-product-architecture.md`). Most everything else is designed.

## Personas (who we're building for)
- **Priya, 22** — UK final-year student applying to 15–25 competitive grad schemes.
  Trigger: invited to an SHL test in 5 days, one shot, norm-scored, anxious,
  price-sensitive. Searches "[company] online assessment practice." Churns the moment
  she's hired. (~70% of intent.)
- **Arjun** — India campus placement (Mercer Mettl/AMCAT). Highest volume, mobile-first,
  very price-sensitive.
- **David** — mid-career switcher facing a CCAT/Wonderlic. Lower volume, higher
  willingness-to-pay, underserved.

Priya's "15–25 applications over weeks" pattern is the basis for the **retention-inside-
the-hunt** mechanic used in the concordance-label strategy (`03-data-and-trust.md`) and
the **pre-intent audience capture** channel (`04-growth-engine.md`).
