# Product architecture — the engine, the skins, and how content stays true

*Full reasoning + rejected alternatives: `memory/decisions.md` D2, D3, D10, D11, D14.*

## The two-layer architecture
The aptitude "too many formats" problem is cosmetic — underneath, the measured
**constructs are finite** (numerical, verbal, logical, diagrammatic, abstract, + SJT etc).

- **Layer 1 — construct engine.** AI-authored (offline), difficulty-parameterised,
  **deterministic TypeScript generators** per construct. Auto-verifiable. One numerical
  generator serves SHL, Korn Ferry, Cubiks, and any employer at once. See
  `05-tech-stack.md` for the no-AI-in-hot-path principle this depends on.
- **Layer 2 — test-profile skins.** Lightweight configs mapping a target (publisher or
  named employer) to which constructs, item counts, timing, delivery strategy, styling.
  **A new "test" is a config file, not a new content pipeline.**

**Sequencing:** ship 3 constructs first (numerical, verbal, logical — cover most
graduate/professional screening) in the 2–3 highest-traffic profiles, expand from there.
SJTs (need scenario libraries + best/worst keying) and personality (not "practiceable")
are later/optional. Gamified formats (Pymetrics/HireVue) measure the same constructs →
a new skin, not a rebuild. **The config-driven system is itself the moat** vs.
hand-authoring incumbents.

**Forward-looking constraint (from the D13 north star, `01-strategy.md`):** design this
engine for an eventual **two-pool split** — an infinite, freely-practiced *generative*
pool (what ships now) and a future **secured, exposure-controlled qualifying pool**
(same engine, different governance/proctoring/identity-verification). Don't build the
secured pool yet; don't architect it away either.

## The content pipeline: generate → validate → calibrate-live
**Never ship raw AI output.** Raw AI MCQs carry subtle defects (two correct answers,
wrong keys, mis-calibrated difficulty) — the validation loop is the actual asset, not
the raw generation. Aptitude is ideal because correctness is machine-checkable.

**Hard rule:** generate only from public blueprints/syllabi/past papers; never reproduce
copyrighted items or use leaked "dumps"; always disclaim affiliation. This rule also
governs the Test Intelligence framework below (structure vs. content).

## Delivery is a per-skin strategy, not a global mode
*How* a test is delivered is a property of the skin, config-selected — not a single
engine-wide setting. Every test is tailored to its target, so some are adaptive and most
aren't.

Two config dimensions per skin: **content mix** (constructs, style, difficulty band) and
**delivery mechanics** (sequencing strategy, timing, sectioning, **scoring/norming** —
most real tests are norm-referenced, and the readiness score must mimic that per-test).

**The delivery-strategy menu:**
| Strategy | Example | Dependency |
|---|---|---|
| Linear, fixed | CCAT (50Q/15min), Watson-Glaser | none — ships now |
| Linear, timed sections | many graduate batteries | none — ships now |
| Multi-stage / testlet adaptive | some SHL, Aon/cut-e | difficulty bands |
| Item-level adaptive (CAT) | SHL Verify range | calibrated difficulty + ability estimator |

A new company's test = a config that **selects a strategy + params**, not new code.
**Forced sequencing:** true adaptive needs calibrated item difficulty
(`03-data-and-trust.md`) — you can't branch on uncalibrated AI output without branching
on noise. So: linear/timed strategies first → AI-estimated difficulty priors →
calibrate-live → switch adaptive on for the skins that need it.

## UI shell: a third config dimension, for test-day fidelity
Skins select a **UI shell**, not just content mix + delivery strategy — a finite menu of
interaction patterns: one-question-per-screen with no back button, section-based with a
review screen, visible vs. hidden countdown, calculator overlay, flag-for-review. Same
"config, not new frontend code" philosophy as the delivery-strategy menu above.

**Guardrail — functional pattern yes, visual branding no.** Two different things get
called "replicate the UI":
- **Functional interaction pattern** (no back button, timer position, pacing) — low
  legal risk, and it's what actually matters for realistic test-day pressure. Test
  Intelligence (below) sources this the same way it sources format.
- **Visual branding** (their exact logo, color scheme, chrome) — risks **trade dress /
  passing-off** exposure, a different legal category from the copyright rule above.
  Disclaiming affiliation doesn't fully cure "looks enough to confuse someone."
  **Rule: replicate the pressure and pattern, never the pixels or branding.**

**Quick-practice / warm-up tests** — a new delivery-strategy entry: short, low-stakes,
instant per-item feedback, single or mixed construct. High-leverage on several fronts at
once: reinforces retention-inside-the-hunt (`03-data-and-trust.md`); the ideal
top-of-funnel format for pre-intent capture (`04-growth-engine.md`) — low commitment;
more frequent low-stakes touches accelerate IRT calibration data collection; and it's
the literal content unit for daily micro-content distribution (`04-growth-engine.md`).

## Gamification layer: infrastructure other decisions already depend on
Not a bolt-on skin — several already-decided pieces need this to function: live
test-night events (`04-growth-engine.md`) need a real-time leaderboard to exist at all;
daily micro-content (`04-growth-engine.md`) leans on Wordle-style streak/share mechanics
as its core reason to work; retention-inside-the-hunt (`03-data-and-trust.md`) is
fundamentally "give someone a reason to return tomorrow."

**The mechanics (config-driven, like everything else here):**
- **Streaks** — daily practice, the retention engine.
- **XP/levels, weighted by genuine effort, not raw volume.** Architecturally
  load-bearing: rewarding item count over accuracy incentivizes rushing/guessing to farm
  streaks, which **pollutes the timing and accuracy signals** item-bank evolution and
  deep reporting (both below / `03-data-and-trust.md`) depend on.
- **Per-skill mastery badges** — a friendlier face on the deep-reporting per-skill
  breakdown, once the skill taxonomy exists.
- **Leaderboards** — the literal dependency live events need.
- **Shareable result/streak cards** — the artifact pre-intent capture and daily
  micro-content (`04-growth-engine.md`) both already assumed existed.
- **Self-wager on your own outcome** — a gamification mechanic that's also a possible
  unlock for the concordance label-collection problem (`03-data-and-trust.md`).

**Two guardrails:**
- **Badges stay visually and architecturally separate from the signed credential**
  (`03-data-and-trust.md`) — never confused with, or placed next to, the serious
  employer-trusted artifact.
- **Leaderboards default to anonymous/pseudonymous, opt-in to public** — the primary
  persona is explicitly anxious and price-sensitive (`01-strategy.md`); public ranking
  against peers could read as a stressor, not a motivator.

**Status:** committed direction; detailed design deferred → `open-questions.md` §P.

## Test Intelligence: sourcing skin content, and keeping it current
A continuously-updated framework that discovers each target's test **structure/format**
and keeps skins accurate as real-world tests change. This is the input side of the
architecture above — where skin config content comes from, and how it stays true.

**The bright line — structure, never content.** Sources **format metadata only**: item
counts, timing, constructs, adaptive/linear, publisher, scoring style. **Never ingests
actual items** — the construct engine generates *originals* to fit the observed format.
Format is public knowledge; items are copyrighted. This line is designed in, not bolted on.

**Sources (official-API-first):** publisher spec sheets / prep guides / official
practice; first-person candidate voice (Reddit + WikiJob/TargetJobs/Glassdoor/university
forums — describing *structure*, not content); employer careers pages + job postings;
university careers-service guides. No UI scraping.

**The loop** (D2's discipline applied to metadata):
1. **Collect** — extend the research kit to pull format signals per target.
2. **Synthesize** — AI drafts a Zod-schema'd profile record; every field carries a
   **source citation + confidence + date**.
3. **Ratify** — human confirms before a profile goes live; low-confidence fields ship
   disclaimed or not at all.
4. **Version** — profiles are version-controlled config; every format change is a
   dated, reviewable diff with provenance. *The history is the framework.*
5. **Detect drift** — scheduled re-scans + freshness timestamps + anomaly detection on
   candidate voice → opens a review task.

**Users close the loop.** A one-tap post-test "was this like your real test?" surfaces a
format change before any blog does — the same data infra as the moat, mutually
reinforcing.

**Guardrails:** demand-driven, not exhaustive (follows the growth engine's opportunity
scorer, `04-growth-engine.md`); approximate-but-improving is fine when formats are
opaque/NDA'd, labeled honestly ("based on candidate reports, &lt;date&gt;").

**Status:** committed direction, detailed design deferred → `open-questions.md` §D.

## Item bank evolution: signal beyond accuracy
Accuracy alone only feeds difficulty calibration (`03-data-and-trust.md`). The mechanism
that actually **evolves** the bank operates at two levels: individual item instances,
and — the higher-leverage one — the **generator templates** that produce them. The bank
is a generative space, not a fixed set, so the real question is "which templates produce
good items," not just "which instances are good."

**Signals beyond right/wrong:**
- **Timing** — outlier response times flag item *quality*, not just difficulty.
- **Distractor distribution (highest-value, currently unused).** A distractor **never
  chosen** → not plausible, weakens the item. A distractor **high-ability users pick
  confidently and repeatedly** → likely a wrong key or two defensible answers → an
  **automatic answer-key audit at scale**, enforcing the "never ship raw output" rule
  continuously.
- **Discrimination** — does getting an item right correlate with the ability estimate
  (`03-data-and-trust.md`)? Low/negative discrimination flags a mis-keyed or gameable item.
- **Differential item functioning (DIF)** — does an item behave differently across
  demographic subgroups at matched ability? Normally a later nicety, but the **D13
  north star requires adverse-impact/fairness analysis as a hard legal requirement** —
  instrument subgroup-tagged capture now; retrofitting after years of untagged data isn't
  feasible.
- **Explicit feedback + abandonment** — a "this seems wrong" flag, skip/rage-quit
  patterns.
- **Exposure tracking** — times-served per instance; high exposure erodes quality via
  sharing/memorization, and matters directly once the D13 secured pool exists.

**Item lifecycle:** `generated (AI prior) → probation (limited exposure) → live
(calibrated, trusted) → flagged (low discrimination / DIF / dead distractor / high
abandon) → retired or repaired`. Flags route to human review, never auto-deletion — same
AI-drafts/human-ratifies pattern as Test Intelligence above.

**The evolution mechanism: template-level aggregation.** A single bad item is a data
point; the same failure pattern across *every* instance from one template is evidence
the template is flawed. Patch the template and every future instance improves at once —
aggregate signal per template → threshold triggers an AI redraft using the aggregated
failure pattern as its brief → human ratifies → future generations ship better. This
closes the generate→validate→calibrate-live loop at the level that compounds.

**Cross-link:** a sudden aggregate-performance shift on one company's skin — diverging
from what Test Intelligence says the format should be — is itself a drift signal into
that framework, independent of user self-report.

**Status:** committed direction, detailed design deferred → `open-questions.md` §I.
