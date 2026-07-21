# Open Questions — Whetstone (living brainstorm log)

> **Mode:** we're in brainstorming mode. Every idea Ankur raises tends to spawn follow-ups —
> **they get appended here**, grouped by area, not lost in chat. `memory/decisions.md` is for
> settled decisions; this file is for what's still open. When a question is answered, fold the
> answer into a decision (D#) and mark the item resolved here (or delete it).
>
> Status tags: **[open]** unresolved · **[leaning: X]** tentative · **[parked]** deliberately
> deferred · **[blocked: on X]** waiting on something · **[resolved → D#]** answered.

---

## A. Strategy & business model
1. **Escape route / LTV ceiling (D5).** [resolved-in-direction → D13] Not "B2B as one option"
   — B2B-as-trusted-assessor is the actual destination (D13). Monetization mechanics still
   ~6 months out / parked; free until traction. Revisit sequencing once there's an audience.
2. **Start market — UK vs India (D4).** [resolved for MVP → UK, D26, 2026-07-21; DataForSEO
   confirmation still valuable for later multi-market expansion]
   Highest-intent (UK) vs highest-volume/price-sensitive (India). Decide where density is
   winnable first. **Preliminary evidence, 2026-07-20 (live Google Trends pull, `tools/
   aptitude-market-research`):** India's raw "aptitude test" interest looks highest (63.2 vs
   GB 48.3 on Trends' relative scale), but rising-query composition tells a different story —
   in the sampled rising queries, only ~5% of India's signal volume is genuinely on-thesis
   (corporate pre-employment testing); ~95% is academic-admissions (CUET, IISER) and
   government/PSU banking-exam (SBI PO) demand — categories D1 already explicitly excludes.
   GB's signal is ~78% on-thesis by the same method (once "plural strategy" was identified as
   a real employer, not noise — see keywords.yaml). **Caveats:** small sample (110 rising
   queries total, 57 India / 53 GB), Trends is a relative index not absolute volume, and this
   needs confirming against real DataForSEO volumes before treating as decisive — but it's a
   real, live signal that reframes the "India = highest volume" framing as possibly true only
   for off-thesis demand. Re-run this same relevance analysis once DataForSEO volumes land.
3. **Willingness-to-pay.** [parked with monetization] Does the deadline-driven moment convert at
   a workable price? Test later via fake-door.
4. **Monetization placeholder.** [parked] What shape is the pricing/plan **config stub** (plans
   as data) so switching it on later is a data edit, not a re-architecture? Draft the schema only.

## B. Growth engine — SEO / AEO (D9)
5. **Real keyword volumes.** [open, high priority] Pull via DataForSEO to confirm the long-tail
   SEO thesis and unblock the start-market decision. The research kit is built but unrun.
6. **The v1 pSEO page template.** [open] What does a single `[company]-assessment-practice` page
   that actually ranks look like (content + live tool + schema.org)? Prove one before scaling.
7. **AEO measurement.** [open] Concrete "share-of-AI-voice" tracker — which engines, which target
   questions, via DataForSEO AI-SERP or direct APIs?
8. **Company names in SEO — trademark.** [open] Using employer/publisher names in page titles/URLs
   (nominative fair use vs trademark risk). Confirm the safe pattern with counsel.

## C. Product — engine, skins, delivery (D3 / D10)
9. **Delivery-strategy menu — final enumeration.** [open] Lock the finite list of strategies and
   the Zod schema that selects one per skin.
10. **Which profiles actually need adaptive?** [open] Map the top target tests to linear vs
    adaptive so we know how much of the adaptive tail we truly need (and when).
11. **Norming — where do peer-group norms come from?** [open, hard] Norm-referenced percentiles
    need a comparison population we don't have on day one. Does our own growing user pool *become*
    the norm group? How do we present a percentile honestly before N is meaningful?
12. **The 2–3 launch profiles.** [open] Which highest-traffic profiles ship first (depends on Q5).

## D. Test Intelligence framework (D11) — [committed component; detailed design deferred]
13. **Source priority + access.** [open] Which sources first, and how to stay within ToS for
    forum/Glassdoor data (official APIs / read-only only, no UI scraping).
14. **Human-ratify throughput.** [open] Can one person (Ankur) keep up with drafting→ratifying
    profiles as they scale? What's the batching / tooling to make ratification fast?
15. **Confidence schema.** [open] Define the per-field confidence + provenance + freshness schema.
16. **Drift-detection thresholds.** [open] What signal (how many divergent candidate reports)
    triggers a "format changed" review? Avoid both false alarms and stale profiles.
17. **Opaque / NDA'd formats.** [open] Fallback when a real format is genuinely unknowable —
    default to construct-accurate approximation, labeled. Confirm that's enough for user value.

## E. The data spine — identity, IRT, concordance (D12 / D6) — [committed component; detailed design deferred]
18. **Lightweight identity design.** [open] Exact approach: anonymous device/session IDs +
    optional email at the readiness moment. When/how to prompt without a login wall.
19. **Privacy/GDPR of collecting real-test scores.** [open, important] UK/India data-protection
    implications of storing candidates' real assessment outcomes. Consent flow + counsel.
20. **IRT cold-start priors.** [open] How reliably can AI estimate item-difficulty priors? What N
    per item to converge? Which model — Rasch / 2PL / 3PL? Python service boundary (D8 exception).
21. **Concordance labels — the hardest problem in the whole venture.** [open, hardest] Candidates
    have no reason to return and no reason to report — *and* most assessments **never reveal a score
    to the candidate** (pass/reject to next round only), so "report your score" is often impossible,
    not just unmotivated. The reframes we're leaning on:
    - **21a. Label = outcome, not score.** [leaning] Collect "did you advance / get the job?" (binary/
      ordinal, which they *do* know) instead of a percentile. More collectable AND more useful/citable
      (concordance to pass-probability). This is the key unlock.
    - **21b. Retention lives *inside* the hunt.** [leaning] They don't return post-hire; they return
      *tomorrow* to practise for the next of 15–25 applications. Harvest outcomes incrementally while
      they're already here. A lightweight **application tracker** (useful to them for a chaotic 20-app
      hunt) is the label-collection mechanism disguised as a feature they want. = D5 #1 as a data/
      retention mechanism, not just revenue.
    - **21c. Bootstrap without organic labels.** [leaning] (i) **Internal predictive validity** —
      practice performance predicting a held-out harder item set; a readiness signal with *zero*
      external labels. (ii) **Buy a panel seed** (Prolific: practise on us + sit a real/mock + report,
      with consent) to prove the practice→outcome correlation even *exists*, cheaply, before betting
      the moat on it.
    - **21d. B2B/partnership = the clean label source at scale.** [leaning, important] Employer/
      university partners return outcomes as ground truth, with consent, no individual goodwill. This
      is the **same channel as the D5 #3 escape route** — moat's hardest problem and the business
      model's best answer converge. Strong signal that B2B is the through-line, not one option.
    - **21e. Survivorship bias.** [open] Post-success goodwill reporting only samples winners — must
      correct for it or predictions inflate.
    - **21f. Minimum N** before publishing any prediction; how confidence scales with data.
22. **Concordance trust / failure mode.** [open] How to present predictions with confidence
    intervals so one wrong call doesn't torch the moat.
22b. **De-risk stance.** [decided-ish] Make the product fully valuable *without* concordance (moat =
    upside, not dependency), and spend a few hundred £ on panel data early to confirm the correlation
    exists before committing. Revisit as part of the D12 §E design pass.

## F. Agent / distribution — MCP surface (D8 seam) — [committed direction; deferred, lower priority]
23. **Is an early thin MCP prototype worth it for learning?** [leaning: no / later] It's a bet, not
    a certainty; seam is reserved. Revisit once the engine is real and agent-app distribution matures.
24. **Distribution channels.** [open] If we do expose an MCP/agent tool, how do users/agents
    discover and invoke it?

## G. Legal (cross-cutting — confirm with counsel before launch)
25. **The structure-not-content line (D2/D11).** [open] Counsel confirmation that sourcing format
    metadata + generating original items is clean, and dumps are the only true no-go.
26. **Affiliation disclaimers.** [open] Standard "not affiliated with / endorsed by [publisher]"
    wording on every skin page.
27. **Regulatory scoping for D13 (hiring-instrument compliance).** [open, big] What does
    conformity look like under the **EU AI Act's high-risk classification** for hiring/
    assessment AI, plus US EEOC Uniform Guidelines adverse-impact analysis and UK Equality
    Act, once we're a qualifying instrument (not "just" practice)? When do we need to engage
    counsel + a psychometrician — before or after the first employer conversation?

## H. North star — becoming the trusted qualifying assessment (D13)
28. **Which employer(s) first, and how do we get the first "yes"?** [open] The two-sided
    cold-start problem — who takes the first bet on accepting our test, and what evidence
    threshold do they need before D13's validity work is even done?
29. **Two-pool engine split — design now or retrofit later?** [leaning: design the seam now]
    Generative (consumer, farmable) vs secured/exposure-controlled (qualifying) pools on the
    same D3 engine. How much of this needs to be architected before v1 ships vs bolted on later?
30. **Identity verification for the secured pool.** [open] What's the minimum viable proctoring/
    identity-verification approach (webcam? ID check? live monitoring?) once a test result
    has real consequences — and how does that interact with "free, no-signup" (D4/D5 caveat)?
31. **What counts as sufficient validity evidence to approach an employer?** [open] Minimum
    predictive-validity study design, sample size, and fairness/adverse-impact analysis before
    the first employer pitch is credible rather than premature.
32. **Does the "qualify for next round" model survive contact with existing ATS/vendor
    relationships?** [open] Employers already pay SHL/Aon etc. — is the wedge "replace them,"
    "sit alongside them as a pre-screen," or "let candidates opt to substitute"? Different GTM
    motions, different urgency on the legal gates.
33. **Brand architecture.** [open] Can one brand credibly be both "free cram site" and "trusted
    assessment provider," or does the assessment arm need its own name/identity once it's real?

## I. Item bank evolution (D14) — [committed direction; detailed design deferred]
34. **Probation → live thresholds.** [open] What N of responses (and what CI on
    discrimination) promotes an item out of probation? Ties to D12 Q21f (min N).
35. **DIF methodology + subgroup taxonomy.** [open, important for D13] Which subgroups do we
    tag for DIF (and how do we collect that without turning "free, no-signup" into a form)?
    Mantel-Haenszel vs logistic-regression DIF — which is practical at our early N?
36. **Template-patch trigger + review tooling.** [open] What threshold of aggregated failure
    (dead distractor rate, discrimination drop) auto-flags a template for AI-redraft + human
    ratification? What does that review queue/tool look like — likely lives in the same admin
    surface as the D9 growth dashboard.
37. **Distractor-audit false positives.** [open] A "high-ability users pick option C" pattern
    could mean a bad key — or could mean option C tests a common, legitimate misconception
    (which is fine/desirable). Need a rule (or human review step) to tell these apart before
    auto-flagging.
38. **Exposure-decay policy.** [open] At what exposure count does an item get retired/rotated
    out even if it's performing well, to manage the D13 secured-pool security concern later?

## J. Pre-intent audience capture (D15) — [committed direction; detailed design deferred]
39. **Which clusters actually validate?** [open] Run the discovery methods (keyword
    co-occurrence, referral mining, Trends correlation, Reddit adjacency) for real before
    picking any adjacent content surface — don't build on the IQ-test guess unvalidated.
40. **Brand architecture — resolve before shipping any adjacent content.** [open, blocks D15]
    Same as Q33 (D13) — sub-brand vs same-brand-different-bucket vs fully separate property.
    This is now urgent for two reasons at once (D13 credibility + D15 activation), not one.
41. **Nurture mechanism design.** [open] How do we actually keep a pre-intent user engaged
    over months until their job-hunt trigger fires — email cadence? spaced-repetition-style
    re-engagement? What's the minimum viable version that isn't spammy given "no signup"?
42. **Virality mechanics.** [open] What makes a score card/percentile actually get shared
    (specificity, humor, social comparison) vs ignored — needs its own small design pass,
    probably informed by what already works in the quiz/puzzle content space.
43. **Cannibalization check.** [open] Does adjacent-audience traffic convert into eventual
    job-hunt users at a rate that justifies the effort, or does it mostly just inflate vanity
    traffic? Needs a way to measure the bridge (Q41) before over-investing here.

## K. Test format, UI fidelity & quick practice (D16) — [committed direction; detailed design deferred]
44. **The UI-shell menu — final enumeration.** [open] Lock the finite list of interaction
    patterns (no-back-button, section-review, timer visibility, calculator overlay,
    flag-for-review) and the config schema that selects one per skin.
45. **Trade dress risk threshold.** [open, legal] Where exactly is the line between
    "replicates the functional pattern" (fine) and "close enough to their visual identity to
    confuse" (risk)? Needs a concrete internal style guide, ideally counsel-reviewed alongside
    the D13 regulatory pass (`open-questions.md` §G Q27).
46. **Quick-practice construct mix.** [open] Are warm-ups single-construct (drill mode) or
    mixed (simulate real variety)? Possibly both — which ships first?
47. **Quick-practice → full-mock conversion.** [open] What's the actual UX moment that
    bridges someone from a warm-up into a full timed mock, and does it work?

## L. Deep reporting / insight engine (D17) — [committed direction; detailed design deferred]
48. **Skill taxonomy — design it now.** [open, urgent] Define the per-construct sub-skill
    breakdown (e.g. numerical → data interpretation / arithmetic / ratios) *before* templates
    scale, since it can't be retrofitted onto untagged historical data. Who owns this taxonomy
    — is it generic across employers or does Test Intelligence (D11) surface employer-specific
    skill emphasis too?
49. **Report UX — how much is too much?** [open] Deep and actionable vs. overwhelming;
    needs a design pass on information hierarchy (headline readiness score → drill-down).
50. **Minimum viable report before full IRT/concordance exist.** [open] What can ship on
    day one (raw per-construct score, basic timing) vs. what needs the data spine mature
    (percentile benchmarking, concordance summary)? Sequencing matters — see D12.

## M. Daily micro-content distribution (D18) — [committed direction; cheap experiment, not a pillar]
51. **Channel pilot — which one first?** [leaning: LinkedIn] Test LinkedIn poll vs WhatsApp
    broadcast channel vs X/Twitter vs email on a small scale before over-committing to one.
    D19 tips this toward LinkedIn as the first pilot, purely because it requires no API/
    automation to start (everything else on LinkedIn does) — not because it's proven best.
52. **Curation mechanism.** [open] Manual pick vs algorithmic (e.g. highest-engagement-predicted
    item) selection of the daily question — start manual, is that sustainable long-term?
53. **Measuring the bridge.** [open] Same measurement problem as D15 Q41/43 — does this
    channel actually convert to platform users, or just generate impressions? Needs tracking
    (UTM-style links, per-channel cohort) from day one of the pilot.

## N. LinkedIn integration (D19) — [committed direction; grounded in live 2026-07-20 research]
54. **MDP approval — worth pursuing, and when?** [open] Once organic content is proven, is
    the 4-week-to-4-month Marketing Developer Platform approval process worth starting for
    automated posting/analytics? Needs a company LinkedIn page + a clear use case to apply.
55. **Certificate artifact design.** [open] What does the shareable "add to LinkedIn profile"
    credential actually look like — ties to D17's report design. Needs its own small pass once
    reporting exists.
56. **OAuth sign-in — build now or wait?** [open] "Sign in with LinkedIn" is free/self-serve
    or now, but is it worth building before there's a concrete personalization use for the
    school/industry data it returns? Don't build ahead of a use case.
57. **Re-verify before committing further.** [open] LinkedIn's developer/partner terms shift —
    re-check MDP terms and the Talent Solutions partner program directly before any real
    investment (BD conversation, API application), not just from this research pass.

## O. Roadmap triage (D20) — [committed direction with horizons; none designed yet]
58. **Campus test-captain + live test-night design.** [open, near-term] Program
    mechanics: how captains are recruited/rewarded, event cadence, platform support
    needed for synchronous live sessions (real-time leaderboard, chat). First one is
    the actual design spec.
59. **Bootcamp/ed-tech partnership shape.** [open, near-term] Distribution-only vs.
    paid white-label — decide *before* the first conversation, not during it, given the
    D5 monetization-parking tension flagged in D20. Which bootcamps/ed-techs first?
60. **Streamer sponsorship — selection + brief.** [open, few-months-out] Which
    streamers actually reach the D15 psychographic; what does the sponsored segment
    look like; budget ballpark.
61. **Readiness Index + placement reports — methodology.** [open] What's the underlying
    stat (pass-rate by university? by construct? by employer?), how is anonymization
    guaranteed at low N (small-cohort re-identification risk), and what's the
    publishing cadence.
62. **Academic partner outreach.** [open, down-the-road] Which university I-O
    psychology departments to approach, and what do we need built (D12 data spine
    maturity) before that conversation is credible.
63. **Credential signing — scheme + scope.** [open, elevated priority] W3C Verifiable
    Credentials vs. a simpler signed-JWT approach; what exactly gets signed (a
    completed report? a benchmark pass? both?); key management. Should be resolved
    *before* the first shareable certificate (D19) ships, not after.

## P. Gamification layer (D21) — [committed direction; detailed design deferred]
64. **XP/effort-weighting formula.** [open] Exact formula so streak/XP rewards track
    genuine effort (accuracy, consistency) without incentivizing rushing or guessing —
    needs to be validated against real response data, not just designed on paper.
    Directly protects D14/D17's signal quality.
65. **Leaderboard scope + privacy default.** [open] Global vs. per-skin (e.g. only vs.
    other people prepping for the same employer) vs. friends-only; confirm
    anonymous/pseudonymous-by-default holds up in user testing with the anxious persona.
66. **Self-wager mechanic design.** [open] How the graduated-in prediction-market idea
    actually works — wager sizing, resolution UX (how/when does someone report the real
    outcome), and how it feeds `open-questions.md` §E's label-collection problem.
67. **Badge/credential visual separation — concrete rule.** [open] A literal style-guide
    rule (distinct component library, distinct page, distinct language) so gamification
    badges can never be mistaken for the D20 signed credential, not just a stated intent.
68. **Does gamification undercut the "trusted assessment" brand?** [open] Tie-in to the
    existing brand-architecture question (§J Q40, §H Q33) — does a streaks-and-badges
    layer sit awkwardly next to "the assessment employers trust," and if so, does it need
    its own visual register (playful) distinct from the credential/report register
    (serious)?

## Q. Vertical-agnostic architecture (D22) — [committed principle; applies as discipline, not a build item]
69. **Domain-field schema pass.** [open] Concrete audit of every planned Zod schema
    (item, construct, skin, credential) to confirm a `domain`/`vertical` field is
    designed in before any of them ship, not retrofitted.
70. **Formalize D1's evaluation framework.** [open] Write D1's rejected-alternatives
    criteria (IP posture, verifiability, search demand, competitive landscape) up as an
    explicit, reusable checklist — currently implicit in prose, not a usable artifact.
71. **Where's the line on "generic"?** [open] Some things are genuinely ambiguous — e.g.
    is the delivery-strategy menu (D10) truly vertical-agnostic, or does it quietly
    assume MCQ-style items? Worth a real audit once a second domain is ever seriously
    considered, not now.

## R. Service boundaries (D23) — [committed direction; detailed design deferred]
72. **API contract format.** [leaning: Zod-validated REST/HTTP] Confirm vs. reconsider
    once real consumers exist — REST/OpenAPI-style vs. something else, given the explicit
    goal of cross-product, potentially cross-repo reuse.
73. **Worker/job runtime for Content Engine + Growth Engine.** [open] Vercel Cron/
    serverless functions vs. a dedicated always-on worker — depends on real job
    durations (AI calls, calibration batches) once they're measured, not guessed now.
74. **Postgres schema-separation discipline.** [open] Concrete naming/access rules
    (which app can read which schema, via API only vs. read-only views) — needs to be
    written down before the first migration, not left implicit.
75. **What does Growth Engine's public config surface look like?** [open] If it's meant
    to be genuinely reusable, its config API (keyword seeds, domain, page-template hooks)
    needs real design — this is the actual product surface of the "reusable tool" claim.
76. **When does physical extraction actually trigger?** [open] What's the concrete
    signal (a second real product? a scaling need?) that says "pull Content Engine or
    Growth Engine into its own repo/deploy" — decide the trigger now so it's not a vague
    someday.

## S. Market/vendor intelligence + geography (D24) — [committed direction; detailed design deferred]
77. **Vendor-confidence weighting.** [open] How to weight candidate-voice signal (recent
    but low-volume for less-common employers) against vendor marketing pages (broad but
    stale/self-selected) in a single confidence score.
78. **Detecting a vendor switch, specifically.** [open] Distinguishing "we don't have
    data yet" from "the vendor actually changed" is a real change-detection problem, not
    just a missing-data one — needs its own logic, not a reuse of the base freshness check.
79. **Geography taxonomy granularity.** [open] Country-level (matches existing
    `keywords.yaml` geographies: UK/India/US/Australia) vs. finer region-level — start
    coarse, only go finer if evidence demands it.
80. **Re-verification cadence.** [open] Vendor contracts are typically multi-year — what's
    a sane recheck interval that isn't wasted effort but also isn't stale for years.
81. **Vendor-mapping content page design.** [open] The "which assessment does [company]
    use" public page — ties to `open-questions.md` §O Q61's Readiness Index methodology
    work; likely the same content system, worth designing together not separately.

## T. SEO/AEO data flow (D25) — [committed direction; detailed design deferred]
82. **Build-signal format.** [open] What exactly does a "this cluster is worth a skin"
    message from Growth Engine to Content Engine look like — a queued job, a direct API
    call, a shared opportunity table Content Engine polls? Pick one deliberately.
83. **Event fan-out mechanism.** [open] How Platform's single event stream actually
    splits to two consumers — dual API calls at write time, a message queue with two
    subscribers, or a shared raw-events table both read from (weighing against D25's own
    stated preference for separate typed calls over shared tables).
84. **Page-rendering ownership, precisely.** [open] Confirm which app owns the actual
    page-template logic that merges Content Engine's test data with Growth Engine's
    SEO/AEO requirements — currently implied to be Platform, worth stating explicitly.
85. **Latency requirements on each flow.** [open] Does calibration need near-real-time
    event delivery, or is a daily batch fine? Same question for growth-scoring updates —
    affects whether this needs a queue or a simple cron-based pull is sufficient.

---

## Parking lot / raw ideas (unsorted — promote to a section when they mature)
Unvetted spitball ideas from a 2026-07-20 brainstorm. None designed, none committed —
promote to a numbered decision if one gets pursued for real.

- **AI mock-recruiter debrief** — a personality-driven AI reaction to a completed
  practice test ("harsh mode" / "encouraging mode" toggle), layered onto the D17 report.
- **Deliberately imperfect practice mode** — simulate real assessment-platform jank
  (input lag, connection hiccups) so practice matches real conditions, not a pristine app.
- **"Beat the bot"** — publicly race an LLM against candidates on the same test. Cheap
  PR stunt, real engagement hook.
- **QR-code posters in university career-services offices** — "scan before your SHL
  test next week." Near-zero cost, very high-intent placement.
- **License the engine to government/civil-service exam boards** — same generative
  engine, a much bigger and completely different customer than corporate hiring teams.

**Explicitly rejected, not just parked:** anything resembling a "leaked test" honeypot
or parody site — even as a joke, too close to the "dumps" line the hard constraints
exist to prevent. Not worth the risk for the engagement.
