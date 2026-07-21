# Requirements specification — Whetstone

*The **what must it do**. Reasoning + rejected alternatives live in `../memory/decisions.md`
(cited inline as D#). The **how it's built** lives in `07-system-design.md` (a later pass,
per D27). The **coverage roadmap** for question types is `question-types.md`.*

> **Why this doc exists (D27).** We went strategy → build plan → code without a formal
> requirements spec in between; the diagrammatic-construct gap surfaced mid-build because
> requirements were implicit. This is the explicit contract. Phase 3+ code is gated on it.

---

## 1. Purpose, scope & how to read

**Scope: the whole product, horizon-tagged.** This spec covers the full Whetstone vision,
but every requirement carries a **horizon tag** and its depth is proportional to that
horizon — near-term requirements are fully testable with acceptance criteria; far-term
requirements are captured as *intent* so nothing is forgotten, without over-specifying
what will change before we build it.

**Horizon tags**
- **[MVP]** — in D26's static, hand-seeded UK launch. Fully specified + acceptance criteria.
- **[Post-MVP]** — the first real engine / data-spine / growth work after the wedge is
  validated. Specified at intent level, sharpened when promoted.
- **[North-star]** — the D13 endgame (qualifying assessment, two-pool, credentialing).
  Intent only; here so the seams aren't foreclosed.

**Requirement IDs.** `FR-<area>.<n>` (functional) and `NFR-<code>.<n>` (non-functional).
IDs are stable and append-only — never renumber; retire with a note instead. Each
requirement cites the D#(s) it derives from.

**Acceptance criteria** (`AC:`) appear on **[MVP]** requirements only — they're what the
fast gate / tests / a manual pass check against. Far-term requirements state intent, not AC.

**How this relates to the other docs**
| Doc | Answers | This spec's relationship |
|---|---|---|
| `../memory/decisions.md` | *why* (history) | every requirement cites a D# |
| `01`–`05`, `question-types.md` | *what's true now* (topic prose) | this spec is the normative, testable extract |
| `07-system-design.md` | *how* (implementation) | design satisfies these requirements |
| `../memory/open-questions.md` | *what's unresolved* | §11 points at the blocking ones; not duplicated |

---

## 2. Product context

**The wedge, one line.** A free, ungated, genuinely good practice test for the
pre-employment aptitude vertical — the acquisition wedge for the D13 north star (become the
trusted, portable *qualifying* assessment). Free practice is not the business. (D1, D4, D13.)

**The two structural ideas everything else hangs off:**
- **Two layers (D3).** A finite **construct engine** (numerical/verbal/logical/diagrammatic/…
  generators) underneath, and lightweight **test-profile skins** (config mapping a target to
  constructs, counts, timing, delivery, UI, styling) on top. *A new test is a config file,
  not a new content pipeline.* Even the MVP keeps this seam (shared item pool + skin configs),
  though it hand-authors items instead of generating them (D26).
- **Two pools (D13).** The generative, freely-practiced *consumer* pool (all that ships now)
  and a future **secured, exposure-controlled *qualifying* pool** (same engine, different
  governance/proctoring/identity). Don't build the secured pool; don't architect it away.

**Users (personas — `01-strategy.md`).** **Priya** (UK grad, ~70% of intent, one SHL test in
5 days, anxious, price-sensitive, churns on hire); **Arjun** (India campus placement, highest
volume, mobile-first); **David** (mid-career CCAT/Wonderlic, higher willingness-to-pay). MVP
is UK-first (D26) — Priya is the design center.

**Assumptions & hard constraints (non-negotiable, govern every requirement):**
- **Content is generated/authored only from public blueprints/syllabi/past papers** — never
  reproduce a test owner's copyrighted items, never use leaked "dumps" (D2).
- **Affiliation is always disclaimed** on any publisher/employer-named surface (D26).
- **No IP-restrictive tests** (SAT/IELTS/GRE/GMAT/…) — out of scope by rule (D1).
- **Research/sourcing is official-API-only** — never scrape Ahrefs/Semrush/LinkedIn/
  Similarweb UIs (D7).
- **Never claim to measure "IQ"** — reasoning/logic framing only (D15).

---

## 3. Functional requirements

### A. Content model & item bank  *(D2, D3, D8, D14, D26)*

- **FR-A.1 [MVP]** — Items live in **one shared pool**, not per-test; skins reference subsets.
  *AC:* `items` is a single table; a skin selects items via the `test_profile_items` FK join
  (verified: no item content is duplicated per skin).
- **FR-A.2 [MVP]** — Each item has: stable string id, construct, stem, ordered options, exactly
  one correct option, optional explanation, tags. *AC:* matches `itemSchema`; seed rejects any
  item whose `correctOptionId` is not among its `options`.
- **FR-A.3 [MVP]** — Items support a **figure (SVG)** on the stem and/or on each option, so
  diagrammatic items render without images. *AC:* `figureSvg` on the item + `svg` on options;
  Zod requires an option to carry `text` **or** `svg`; the UI renders both (see FR-D.4).
- **FR-A.4 [MVP]** — Every item carries free-form `tags`. *AC:* `tags` present (default `[]`),
  used for sub-topic labelling now, the seam for the FR-E.4 skill taxonomy later.
- **FR-A.5 [Post-MVP]** — Items carry a **`domain`/vertical field** from the first schema that
  ships one, so a future non-aptitude vertical is a config swap not a migration (D22). *(Flag:
  the current MVP schema does not yet have this — add before the pool grows; §10.)*
- **FR-A.6 [Post-MVP]** — Items carry an **item-lifecycle state**
  (`generated → probation → live → flagged → retired/repaired`) and provenance (source,
  generator/template id, author, date) (D14).
- **FR-A.7 [Post-MVP]** — Items carry **fine-grained skill tags** (FR-E.4's taxonomy) from
  authoring — cannot be retrofitted onto untagged history (D17).
- **FR-A.8 [Post-MVP]** — Items carry **DIF-subgroup-capable** capture hooks and **exposure**
  counters, instrumented before volume accumulates (D14).

### B. Construct coverage  *(D3, D26; roadmap = `question-types.md`)*

- **FR-B.1 [MVP]** — Support **four construct families at a basic level**: numerical (text word
  problems — %, ratios, rates, currency), verbal (True/False/Cannot Say), logical (text: number/
  letter series, coding, syllogisms, odd-one-out, simple ordering), diagrammatic (SVG shape
  sequences + figural odd-one-out). *AC:* the construct enum is exactly these four; the seeded
  pool covers the ~11 `✅/◐` types marked in `question-types.md`; each family has ≥1 skin that
  features it, so no test reads as conspicuously incomplete (D26 update).
- **FR-B.2 [MVP]** — The diagrammatic set is **small and hand-authored** (~8–12 SVG items via
  `scripts/gen-diagrammatic.ts`, inlined into content) — a proof of the eventual deterministic
  generator, not hand-built bulk (D26 update). *AC:* 8 diagrammatic items seeded; the generator
  script is retained as provenance.
- **FR-B.3 [Post-MVP]** — Expand coverage toward the full `question-types.md` catalogue —
  data-interpretation (tables/charts), Watson-Glaser critical-reasoning set, matrices, spatial/
  3D, SJT — as generative-engine output, not hand-authored volume (D3).

### C. Test profiles / skins  *(D3, D10, D16, D24, D26)*

- **FR-C.1 [MVP]** — A test is defined **entirely by config** (a skin), never bespoke code:
  slug, display name, tier (publisher/employer), company-or-publisher name, disclaimer, delivery
  mode, time limit, SEO description, and an ordered list of item references. *AC:* adding a 13th
  test is a `skins.yaml` edit + re-seed, zero code change.
- **FR-C.2 [MVP]** — `slug` is the permanent public URL key and is immutable once live. *AC:*
  seed **refuses** to run if a re-seed would change an existing profile's slug (a live indexed URL).
- **FR-C.3 [MVP]** — **Disclaimer is required with no default**, structurally enforced. *AC:*
  DB `NOT NULL` **and** Zod `min(20)` — a placeholder/empty disclaimer fails seed (D26).
- **FR-C.4 [MVP]** — Delivery mode is an **extend-never-rename enum**, currently `linear` only.
  *AC:* enum = `["linear"]`; adding adaptive later appends values, never renames `linear`.
- **FR-C.5 [MVP]** — Ship the **12 target UK skins** from the existing seed list (SHL-style,
  CCAT, Watson Glaser, Korn Ferry-style, Plural Strategy-style; Amazon, Deloitte, PwC, KPMG,
  Civil Service, Capgemini, Barclays) (D26). *AC:* 12 skins seeded, mix of both tiers.
- **FR-C.6 [Post-MVP]** — A skin selects a **delivery strategy** (linear-fixed / linear-timed-
  sections / testlet-adaptive / item-adaptive) and a **UI shell** (no-back-button, section-
  review, timer visibility, calculator overlay, flag-for-review) from finite menus (D10, D16).
- **FR-C.7 [Post-MVP]** — A skin carries **scoring/norming** config (most real tests are
  norm-referenced; the readiness score must mimic that per-test) (D10).
- **FR-C.8 [Post-MVP]** — A skin's identity is `{company, publisher, geography}`, not
  `{company, publisher}` — geography instrumented from day one of multi-market (D24).

### D. Test-taking & delivery  *(D10, D16, D26)*

- **FR-D.1 [MVP]** — **Linear, non-adaptive** delivery: a fixed ordered item set, one submit.
  *AC:* the attempt flow presents all items and grades on a single finish action.
- **FR-D.2 [MVP]** — A visible **countdown timer** per the skin's time limit, **honor-system
  only** (no server-enforced cutoff) — a documented, deliberate simplification, not an oversight.
  *AC:* timer renders from `timeLimitMinutes`; no server-side rejection on overrun; the
  simplification is noted in `07-system-design.md`.
- **FR-D.3 [MVP]** — The test-taking page is **client-side, single-page** (local state between
  questions), not a server round-trip per item — matches the non-adaptive scope and avoids
  session-state machinery adaptive would need anyway. *AC:* one page component; one server
  action to finish.
- **FR-D.4 [MVP]** — The player renders **SVG stems and SVG options** for diagrammatic items,
  and text for the rest. *AC:* a diagrammatic item displays its figure sequence and shape options.
- **FR-D.5 [Post-MVP]** — Adaptive/testlet delivery, per-target UI shells, section timing,
  flag-for-review, quick-practice/warm-up mode (D10, D16). Gated on calibrated difficulty
  (`03-data-and-trust.md`).
- **FR-D.6 [North-star]** — Proctored, identity-verified delivery for the secured qualifying
  pool (D13).

### E. Scoring, reporting & feedback  *(D2, D12, D17, D26)*

- **FR-E.1 [MVP]** — Grading is **server-side only**, against the freshly re-fetched full item
  rows. *AC:* the client never receives `correctOptionId` during an active attempt (see NFR-SEC.1).
- **FR-E.2 [MVP]** — Results show **total score + per-construct breakdown**. *AC:* score jsonb =
  `{ total, byConstruct }`; the results page renders both.
- **FR-E.3 [MVP]** — Each item can show a **worked explanation** post-attempt. *AC:* `explanation`
  rendered on the results view where present.
- **FR-E.4 [Post-MVP]** — **Skill taxonomy** — define the per-construct sub-skill breakdown
  (e.g. numerical → data-interpretation / arithmetic / ratios) *before* templates scale; it can't
  be retrofitted onto untagged data (D17). *(Urgent-early: instrument tags now, FR-A.7.)*
- **FR-E.5 [Post-MVP]** — **Deep report**: per-skill breakdown, speed/accuracy diagnosis,
  error-pattern analysis (from distractor choice), progress over time, peer benchmarking,
  a specific next action (D17).
- **FR-E.6 [North-star]** — A **readiness/concordance summary** — "candidates scoring X here
  score Y on the real test / advance at rate Z" — with confidence intervals (D6, D12).

### F. Identity & event capture  *(D5, D12, D26)*

- **FR-F.1 [MVP]** — **Anonymous session identity**: one UUID per visitor, and that UUID *is*
  the cookie value — no login, no PII, no email. *AC:* `sessions` row is a bare UUID; the cookie
  is set/read in middleware (RSCs can't `cookies().set()`); no auth wall anywhere.
- **FR-F.2 [MVP]** — Capture **basic events** (`page_view`, `test_started`, `test_completed`)
  and attempt records (answers + computed score), preserving the data option cheaply. *AC:*
  events + `test_attempts` tables populated on the respective actions.
- **FR-F.3 [Post-MVP]** — **Optional email** capture at the "get your readiness estimate"
  moment — an enhancement, never a requirement; anonymous stays the default (D5, D12).
- **FR-F.4 [Post-MVP]** — Optional **"Sign in with LinkedIn"** (OIDC) enrichment — free/self-
  serve, additive to lightweight identity, built only when a personalization use exists (D19).
- **FR-F.5 [North-star]** — **Identity verification** for the secured pool, without foreclosing
  today's no-signup default (D13).

### G. Content pipeline / generative engine  *(D2, D8, D14)* — [Post-MVP+]

- **FR-G.1 [Post-MVP]** — **Deterministic TypeScript generators** per construct: pure functions
  emitting an item *and its proven-correct answer* from parameters (no AI in the hot path). AI's
  role is offline: author templates once, write non-deterministic (verbal/SJT) content, write
  feedback prose (D8).
- **FR-G.2 [Post-MVP]** — The pipeline is **generate → validate → calibrate-live**; never ship
  raw AI output; the validation loop is the asset (D2).
- **FR-G.3 [Post-MVP]** — **Template-level evolution**: aggregate item signal per template →
  threshold triggers an AI redraft using the failure pattern as brief → human ratifies (D14).
- **FR-G.4 [North-star]** — Engine supports the **two-pool split** — generative-consumer vs.
  secured-qualifying — as governance/config over the same generators (D13).

### H. Test Intelligence  *(D11, D24)* — [Post-MVP]

- **FR-H.1 [Post-MVP]** — Source each target's **format metadata only** (counts, timing,
  constructs, adaptive/linear, publisher, scoring) — **never items** (the structure-not-content
  bright line) (D11).
- **FR-H.2 [Post-MVP]** — Loop = collect → synthesize (Zod-schema'd profile record, every field
  with **source + confidence + date**) → **human ratifies** before live → version → detect drift
  (D11).
- **FR-H.3 [Post-MVP]** — **Vendor mapping** (which vendor an employer uses, per geography) and
  **drift detection** (scheduled re-scan + user post-test "was this like your real test?")
  (D24, D11).

### I. Growth engine (SEO / AEO)  *(D4, D9, D25)*

- **FR-I.1 [MVP]** — **Hand-picked landing pages**: each `/practice/{slug}` is statically
  generated with on-page copy, `FAQPage` JSON-LD (the real Google-supported rich-result type),
  a sitemap, robots, and the disclaimer component — a genuine working tool, not thin pSEO. *AC:*
  all 12 slugs statically generated; `sitemap.xml` lists all 12; disclaimer renders on every one.
- **FR-I.2 [Post-MVP]** — **Automated opportunity loop**: DataForSEO/GSC ingestion → opportunity
  scoring → template page factory → measure → prune/expand (D9).
- **FR-I.3 [Post-MVP]** — **AEO**: schema.org from the same config, be-a-citable-source (publish
  the concordance stat), `llms.txt`, share-of-AI-voice tracking (D9).
- **FR-I.4 [Post-MVP]** — **Pre-intent capture** (adjacent psychographic clusters) + **daily
  micro-content** as standing growth modules (D15, D18).

### J. Gamification  *(D21)* — [Post-MVP]

- **FR-J.1 [Post-MVP]** — Config-driven streaks, **effort-weighted** XP/levels (must not reward
  rushing/guessing — it pollutes the D14/D17 signal), per-skill mastery badges, leaderboards
  (anonymous/pseudonymous by default), shareable result/streak cards (D21).
- **FR-J.2 [Post-MVP]** — Gamification badges are **visually and architecturally separate** from
  the FR-K.1 signed credential — never confused or co-located (D21).

### K. Credentialing  *(D13, D19, D20)* — [North-star]

- **FR-K.1 [North-star]** — A **portable, signed credential** (W3C Verifiable Credentials or a
  signed-token equivalent). **The very first certificate ever issued is signed** — verification
  can't be retrofitted onto certificates already in the wild (D20). *(Design the scheme before
  the first shareable certificate ships — §10.)*

### L. Admin / ratification tooling  *(D11, D14)* — [Post-MVP]

- **FR-L.1 [Post-MVP]** — A thin internal surface for the **human-ratify** steps (Test
  Intelligence profiles, flagged items, template redrafts) and a **Growth** viewer over the
  pipeline's tables — build the loops first, the dashboard last and thin (D9, D11, D14).

### M. Monetization stub  *(D5)* — [Post-MVP]

- **FR-M.1 [Post-MVP]** — **Plans-as-data** config stub only (no billing, no paywall), so
  switching monetization on later is a data edit, not a re-architecture. Everything is free until
  traction (D5).

---

## 4. Non-functional requirements

### Security & test integrity  *(NFR-SEC)*  *(D13, D26)*
- **NFR-SEC.1 [MVP]** — **Answer keys never reach the client** during an active attempt. *AC:*
  the test page fetches only `itemContentSchema`-shaped rows (no `correctOptionId`); grading is
  server-side against re-fetched rows.
- **NFR-SEC.2 [MVP]** — No secrets in the repo or client bundle; `.env.local` gitignored; DB
  connection string server-only. *AC:* build contains no connection string; `.gitignore` covers it.
- **NFR-SEC.3 [North-star]** — Secured-pool **exposure control** (times-served caps, rotation)
  and proctoring — instrument exposure counters early (FR-A.8), enforce later (D13, D14).

### Privacy & data protection  *(NFR-PRIV)*  *(D5, D12)*
- **NFR-PRIV.1 [MVP]** — **Anonymous-only, no PII.** *AC:* no email/name/login collected; the
  session cookie holds only an opaque UUID.
- **NFR-PRIV.2 [MVP]** — Cookie posture is privacy-preserving (functional session cookie; no
  third-party ad/tracking cookies). *AC:* only the first-party session cookie is set.
- **NFR-PRIV.3 [Post-MVP]** — Consent flow + UK-GDPR/DPA basis **before** storing any real-test
  outcome or email; counsel-reviewed (D12, open Q19).

### Legal, fairness & compliance  *(NFR-LEGAL)*  *(D1, D2, D13, D16)*
- **NFR-LEGAL.1 [MVP]** — **Affiliation disclaimer on every publisher/employer-named surface.**
  *AC:* the disclaimer component renders on every `/practice/{slug}` page and is sourced from the
  required DB field (can't be omitted).
- **NFR-LEGAL.2 [MVP]** — **Content is public-format-derived original** — no copied items, no
  dumps. *AC:* items are original; provenance is authored, not lifted.
- **NFR-LEGAL.3 [MVP]** — **Replicate the pressure and the functional pattern, never the pixels
  or branding** — generic UI, no target logos/trade dress (D16). *AC:* one generic UI; no
  target-specific visual branding shipped.
- **NFR-LEGAL.4 [MVP]** — **No IP-restrictive tests** (D1). *AC:* no SAT/IELTS/GRE/GMAT/etc. skin.
- **NFR-LEGAL.5 [North-star]** — Hiring-instrument compliance: EEOC/UK-Equality-Act adverse-
  impact analysis, **EU AI Act high-risk** conformity, demonstrated predictive validity, audit
  trail — needs counsel + a psychometrician (D13, open Q27). Instrument DIF capture now (FR-A.8).

### Performance & scalability  *(NFR-PERF)*  *(D8, D9)*
- **NFR-PERF.1 [MVP]** — Landing + results pages are **statically generated** (SSG) so thousands
  of long-tail pages stay cheap; the interactive player is client-side. *AC:* `/practice/{slug}`
  built via `generateStaticParams`.
- **NFR-PERF.2 [MVP]** — DB access uses **serverless-safe connections** (`drizzle-orm/neon-http`,
  request/response — not a per-invocation `pg.Pool` that exhausts Neon's limit). *AC:* the client
  uses `neon-http`.
- **NFR-PERF.3 [Post-MVP]** — **No AI in the hot path** — item serving is deterministic and
  ~$0/instance; AI is offline only (D8).

### Accessibility  *(NFR-A11Y)*  *(fairness → D13)*
- **NFR-A11Y.1 [MVP]** — The test player meets **WCAG 2.1 AA** basics: keyboard-operable
  options, focus states, sufficient contrast, and a **text alternative for every SVG** item
  (diagrammatic items must not be image-only barriers). *AC:* keyboard-only completion works;
  each SVG carries an accessible label/description.
- **NFR-A11Y.2 [North-star]** — Accessibility as a **fairness** requirement once results have
  hiring consequences (interacts with adverse-impact, NFR-LEGAL.5).

### Reliability & observability  *(NFR-REL)*  *(global protocols)*
- **NFR-REL.1 [MVP]** — Fail loud or handle explicitly — no empty catches / swallowed errors; a
  failed grade or seed surfaces, never silently defaults. *AC:* seed aborts with a clear message
  on any validation failure (bad key, missing disclaimer, orphan item ref).
- **NFR-REL.2 [Post-MVP]** — Structured events at state transitions; error tracking (Sentry);
  a log-scan/digest habit (D8, global protocols).

### Maintainability & portability  *(NFR-MAINT)*  *(D3, D22, D23)*
- **NFR-MAINT.1 [MVP]** — **Config-not-code**: copy, options, targets, limits, disclaimers live
  in data (YAML/DB), not baked into logic. *AC:* a new test is a data edit (FR-C.1).
- **NFR-MAINT.2 [MVP]** — **The shared-pool + skin seam is preserved** so the generative engine
  slots in later without a rewrite (D26). *AC:* skins reference the shared pool via FK; no
  hardcoded per-test question sets.
- **NFR-MAINT.3 [Post-MVP]** — **Vertical-, product-, and geography-agnostic** seams: `domain`
  field (FR-A.5), Content/Growth engines reusable via typed HTTP contracts, no product-specific
  hardcoding inside reusable engines (D22, D23).

### Brand & trust  *(NFR-BRAND)*  *(D13, D15, D21)*
- **NFR-BRAND.1 [MVP]** — Present as a **serious, honest practice tool** — no dark patterns, no
  fake scarcity, no "IQ" overclaims; approximate formats labelled honestly (D2, D15).
- **NFR-BRAND.2 [Post-MVP]** — **Brand architecture** — resolve whether "trusted assessment" and
  any playful/IQ-adjacent acquisition content can share one brand or need separation, before
  shipping adjacent content or the credential (D13/D15/D21, open Q33/Q40).

---

## 5. Beyond MVP — seams to preserve

Not scope; these are the cheap-now / expensive-later constraints the decisions record repeats.
The MVP must not violate them, even though it builds none of the features behind them:

- **Shared-pool + skin seam** (NFR-MAINT.2) — the generative engine's drop-in point.
- **Extend-never-rename enums** (FR-C.4) — `linear` today, adaptive appended later.
- **`domain`/vertical field** (FR-A.5) — add before the pool grows; *not yet present (§10)*.
- **`{company, publisher, geography}` skin identity** (FR-C.8) — geography before multi-market.
- **Instrument-now data capture** — skill tags (FR-A.7), DIF subgroup hooks + exposure counters
  (FR-A.8), signed-from-day-one credential (FR-K.1). None retrofit onto untagged history.
- **Two-pool governance seam** (FR-G.4) — generative vs. secured, same engine.
- **Lightweight identity that doesn't foreclose verification** (FR-F.1 → FR-F.5).

---

## 6. Explicitly out of scope

**Deferred for the MVP (D26) — do not build now:** generative construct engine (FR-G),
adaptive/CAT delivery + per-company UI shells (FR-C.6/FR-D.5), deep reporting/benchmarking
(FR-E.5/6), gamification (FR-J), credential signing (FR-K), automated Test Intelligence &
vendor mapping (FR-H), automated growth/opportunity loop + pre-intent + daily content (FR-I.2–4),
the three-app service split (D23), DIF/skill-taxonomy tagging as active features (instrument the
hooks per §5, don't build the analysis).

**Never (hard "no", any horizon):** leaked/"dump" content or a "leaked test" honeypot; UI
scraping of any research/data source; IP-restrictive tests; claiming to measure "IQ";
replicating a target's visual branding/trade dress; shipping an item with an unverified key.

---

## 7. Traceability

| Area | Requirements | Primary decisions |
|---|---|---|
| Content model / item bank | FR-A.1–8 | D2, D3, D8, D14 |
| Construct coverage | FR-B.1–3 | D3, D26, `question-types.md` |
| Skins / profiles | FR-C.1–8 | D3, D10, D16, D24, D26 |
| Test-taking / delivery | FR-D.1–6 | D10, D16, D26 |
| Scoring / reporting | FR-E.1–6 | D2, D12, D17 |
| Identity / events | FR-F.1–5 | D5, D12, D19 |
| Generative engine | FR-G.1–4 | D2, D8, D14 |
| Test Intelligence | FR-H.1–3 | D11, D24 |
| Growth engine | FR-I.1–4 | D4, D9, D15, D18, D25 |
| Gamification | FR-J.1–2 | D21 |
| Credentialing | FR-K.1 | D13, D19, D20 |
| Admin / ratification | FR-L.1 | D9, D11, D14 |
| Monetization stub | FR-M.1 | D5 |
| Non-functional | NFR-SEC/PRIV/LEGAL/PERF/A11Y/REL/MAINT/BRAND | D1, D2, D8, D13, D16, D22, D23 |

---

## 8. Glossary

- **Construct** — a measured reasoning ability (numerical, verbal, logical, diagrammatic, …);
  the finite thing underneath the many cosmetic test "formats" (D3).
- **Skin / test profile** — the config that turns the engine into a named test (constructs,
  counts, timing, delivery, UI, disclaimer). A new test = a new skin, not new code (D3).
- **Item** — one question: stem, options, exactly one correct option, optional figure/explanation.
- **Two-layer architecture** — construct engine (bottom) + skins (top) (D3).
- **Two-pool architecture** — generative consumer pool vs. secured qualifying pool (D13).
- **Delivery strategy** — how a test is sequenced (linear / timed-sections / testlet / CAT) (D10).
- **UI shell** — the interaction pattern a skin uses (no-back-button, timer visibility, …) (D16).
- **IRT** — Item Response Theory: estimates item difficulty/discrimination and candidate ability
  on a common scale; underpins norming, adaptive delivery, calibrate-live (D12).
- **Concordance** — the modelled map from practice performance → real-world outcome; the moat /
  the credential's validity evidence (D6, D13).
- **DIF** — Differential Item Functioning: does an item behave differently across subgroups at
  matched ability; a legal-fairness requirement for the north star (D14).
- **Norming** — scoring relative to a peer group (percentile) rather than absolute (D10).
- **Honor-system timer** — a visible countdown with no server-enforced cutoff (MVP simplification).
- **Disclaimer** — the required "not affiliated with / endorsed by [target]" statement (D26).

---

## 9. Blocking open questions

Requirements that can't be fully pinned until an open question resolves — tracked in
`../memory/open-questions.md`, not duplicated here:
- **FR-C.8 / NFR-MAINT.3** geography granularity — §S Q79.
- **FR-E.4** skill taxonomy ownership (generic vs. employer-specific) — §L Q48 (urgent-early).
- **FR-F.3 / NFR-PRIV.3** email-capture consent + data-protection basis — §E Q19.
- **NFR-LEGAL.1 / .5** disclaimer wording + hiring-instrument regulatory scope — §G Q26/Q27.
- **NFR-BRAND.2** brand architecture — §H Q33 / §J Q40.
- **FR-K.1** credential scheme (VC vs signed-JWT, what's signed) — §O Q63.

---

## 10. Known gaps to close (spec vs. current build)

Surfaced writing this spec — small, worth fixing before the pool grows, none blocking Phase 3:
- **FR-A.5 `domain` field is not yet in the schema.** The decisions record (D22) wants it "from
  day one, even shipping one domain." Cheap to add now (one nullable column + default), a
  migration later once 80+ items and 12 skins exist. **Recommend adding in the next schema pass.**
- **FR-A.7/A.8 instrument-now hooks** (skill tags beyond free-form `tags`, DIF/exposure) are not
  present. Consistent with D26 deferral, but flagged here so the "instrument now or retrofit
  never" items (§5) are a conscious deferral, not an accident — the exact failure mode D27 exists
  to prevent.
