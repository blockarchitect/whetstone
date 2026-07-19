# Data spine & trust — identity, calibration, and the concordance moat

*Full reasoning + rejected alternatives: `memory/decisions.md` D6, D12, D13.*

## Why this is core infrastructure, not a later feature
Since AI-made questions aren't defensible on their own, the moat is a trusted
**concordance** between practice performance and real outcomes — "practise here, and
your real result lands where we said." Reframed by the north star (`01-strategy.md`):
concordance isn't just a moat/conversion feature, it's the **validity evidence** that
earns the right to become the qualifying assessment itself. That makes this the
**highest-priority foundation** to build early, even before it can model anything.

## The chain
**Lightweight identity** (anonymous device/session IDs + optional email at the
"readiness estimate" moment — not a login wall, see `01-strategy.md`) → **event capture**
(every answer) → **IRT calibration** → **concordance model**.

**Optional richer identity:** "Sign in with LinkedIn" (OpenID Connect) is confirmed
free/self-serve with no approval needed — an optional enhancement pulling
school/industry/role for personalization, layered on top of the anonymous default, not
replacing it. See `04-growth-engine.md` D19 for the full LinkedIn picture.

## IRT calibration
Item Response Theory: estimate each item's **difficulty/discrimination** from real
response data, and place each candidate's **ability** on a common scale independent of
which specific items they saw. Underpins three things:
- realistic **norm-referenced scoring** (most real tests are percentile-vs-peer-group),
- **adaptive delivery** (`02-product-architecture.md` — CAT needs difficulty params),
- the **calibrate-live** step of the content pipeline — how a raw AI item earns trust.

**Cold-start problem:** a freshly generated item has zero response data. Use
**AI-estimated difficulty priors** at generation → refine with live responses → graduate
from proportion-correct to proper IRT (Rasch/2PL/3PL) as volume accumulates. This is the
one place **Python** may earn its keep over TypeScript (see `05-tech-stack.md`).

## The concordance model — and the hardest problem in the venture
Maps *practice performance* → *predicted real outcome*, built on the calibrated ability
estimate. Harder than "no incentive to report": most assessments **never reveal a score
to the candidate** (pass/reject only), so collecting real *scores* is often flatly
impossible, not just unmotivated.

**The reframes that make it tractable:**
- **Label = outcome, not score.** Collect "did you advance / get the job?" — the one
  thing every candidate actually knows, and arguably more useful anyway (a
  pass-probability is more actionable than a raw percentile).
- **Retention lives *inside* the hunt, not after it.** Candidates don't return
  post-hire — they return tomorrow to prep for the next of 15–25 applications (see the
  Priya persona, `01-strategy.md`). Harvest outcomes incrementally while they're already
  here — e.g. via a self-serving application tracker that's genuinely useful to someone
  juggling 20 chaotic applications, with label collection as a byproduct.
- **Bootstrap without organic labels.** (1) **Internal predictive validity** — does
  practice performance predict a held-out harder item set? A readiness signal with zero
  external labels. (2) **Buy a panel seed** (e.g. Prolific: practise on us + sit a
  real/mock assessment + report, with consent) to prove the practice→outcome correlation
  *exists* before betting the moat on it.
  - **B2B/partnership is the clean label source at scale** — and it's the *same channel*
  as the B2B-as-assessor destination (`01-strategy.md`). Employer/university partners
  return outcomes as ground truth, with consent, no individual goodwill required. The
  moat's hardest problem and the business model's best answer converge on B2B.
  - **The north star dissolves this entirely.** If we eventually administer the
  qualifying test ourselves (`01-strategy.md`, D13), **we are the outcome** — ground
  truth by definition, no label-collection problem left.

**Trust and failure modes:** needs volume *and* trust — a confidently-wrong prediction
damages the whole claim, so predictions ship with confidence intervals, and reporting
must correct for **survivorship bias** (only successful candidates volunteer good news by
default).

**De-risk stance:** the product must be **fully valuable without concordance** — it's
upside, not a dependency. Confirm the practice→outcome correlation cheaply (panel data)
before committing further. Collect the signal from day one regardless, even before N
supports a model.

## Fairness / DIF — pulled forward from the item-evolution work
Differential item functioning (subgroup fairness at matched ability) is normally a later
psychometric nicety. The north star makes it a **hard legal requirement** (EU AI Act
high-risk classification, EEOC/Equality Act adverse-impact analysis — see
`01-strategy.md`). Instrument subgroup-tagged data capture now; see
`02-product-architecture.md` for the full item-lifecycle treatment.

**Status:** committed direction, high-priority-early; detailed design (thresholds,
exact IRT model choice, DIF methodology, label-collection mechanics) deferred to a
dedicated pass → `open-questions.md` §E.

## Credential signing — elevated to top priority (promoted from brainstorm, 2026-07-20)
**The literal tamper-proofing the D13 "portable, trusted credential" thesis eventually
needs**, and Ankur's explicit call: this goes to the top of the list, not the parking
lot. Sign every credential (W3C Verifiable Credentials, or a simpler signed-JWT
approach — scheme TBD, `open-questions.md` §O Q63) so an employer can cryptographically
confirm a score wasn't faked.

**The concrete implication that makes this urgent, not just important:** the first
shareable certificate ever issued (the near-term LinkedIn-profile artifact from
`04-growth-engine.md` D19) should be **signed from day one**, not a plain image
retrofitted with signing later. Same "instrument now or lose it" pattern as DIF-tagging
and skill-taxonomy tagging below — verification can't be bolted onto certificates
already circulating. Resolve the signing scheme *before* that first certificate ships.

## The reporting layer: turning the spine into insight
A new architectural layer, downstream of everything above — IRT ability estimate +
item-level signals (timing, distractor choice, see `02-product-architecture.md`'s item
bank evolution) + the concordance model — that turns raw data into a diagnostic report,
not just a score. This is a real product moat in its own right: incumbents give a raw
score; deep, specific diagnosis is differentiated and hard to copy. Most of what it
needs is signal already planned for other reasons, reused for a new purpose:

- **Per-skill breakdown**, not just per-construct (e.g. numerical → data interpretation
  / arithmetic / ratios). **Dependency to lock in now:** generator templates need
  fine-grained skill tags from day one — historical data can't be retroactively sliced
  by sub-skill if it wasn't tagged going in. Same "instrument now or lose it" pattern as
  DIF-tagging above.
- **Speed/accuracy diagnosis** ("fast but careless" vs "accurate but too slow") — reuses
  the timing signal, repurposed from item-quality auditing to individual diagnosis.
- **Error-pattern analysis** — reuses the distractor-distribution signal; there it flags
  a bad item, here it tells a user *what kind* of mistake they're making.
- **Progress over time** across sessions — reinforces the return-and-practice loop
  (retention-inside-the-hunt, above).
- **Benchmarking vs a peer group** (or same-employer test-takers) — compelling to the
  user and a citable stat for AEO (`04-growth-engine.md`); depends on resolving the
  norming question (`02-product-architecture.md`, `open-questions.md` §C).
- **A readiness/concordance summary** — where the moat becomes visible to the user, not
  just a backend model.
- **A specific next action** — "weak on ratios, try these 3 warm-ups" — closes the loop
  with quick-practice mode (`02-product-architecture.md`).

**Status:** committed direction; detailed design deferred → `open-questions.md` §L.
