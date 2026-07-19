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
2. **Start market — UK vs India (D4).** [blocked: on real keyword volumes] Highest-intent (UK)
   vs highest-volume/price-sensitive (India). Decide where density is winnable first.
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

---

## Parking lot / raw ideas (unsorted — promote to a section when they mature)
- (empty — drop half-formed thoughts here as they come up)
