# CLAUDE.md — Aptitude-Prep Venture

> Auto-loaded every session. Kept lean on purpose. The full "why" (rationale +
> rejected options) lives in `memory/decisions.md` — read that when context is needed.

## What this project is
An **AI-native practice-test platform for the pre-employment aptitude & psychometric
testing vertical.** Free tools first to build an audience; monetize a validated market
later. **One vertical — not a unified multi-test platform.**

## Who I'm working with
The founder (Ankur) — serial founder, 20+ years software engineering, deeply technical
(can build and validate question content himself). Based in Dubai. Wants me to work
**autonomously and API-first**, and to be **direct** — push back, flag when something is
a bad idea, don't cheerlead.

## Hard constraints — do not violate
- **Content:** AI-generated question banks, but generated **only from public exam
  blueprints / syllabi / past papers.** Never reproduce a test owner's copyrighted
  items, never use leaked live content ("dumps"), always disclaim affiliation. Confirm
  specifics with counsel before launch.
- **Research/data:** **official APIs only.** Never scrape Ahrefs / Semrush / LinkedIn /
  Similarweb UIs — it violates their ToS and gets accounts banned. Use a tool's API if
  we have a seat.
- **Scope:** high-volume verticals only. Global relevance is a strong plus; seeding in
  one geography first is fine. No IP-restrictive tests (SAT, IELTS, GRE, GMAT…).

## The strategy on one screen
- **Product** = auto-verifiable reasoning practice + realistic test-day simulation +
  instant AI feedback. The "native experience" is the point.
- **Architecture** = two layers: (1) a **construct engine** — numerical, verbal, logical
  (+ more later) — finite, AI-generated, *answers machine-checkable*; (2) **test-profile
  "skins"** — per-publisher / per-employer configs over the shared engine. A new "test"
  is a config file, not a new content pipeline. (Details → decisions.md D3.)
- **GTM** = free, no-signup, high-quality practice targeting the **long tail** of
  company/publisher-specific search queries (SEO wedge); paid depth later. Start market:
  UK or India — **open decision** (decisions.md D4).
- **The one big risk = the LTV ceiling.** Candidates prep once, then churn — so a better
  product alone doesn't unlock more revenue. Pick an **escape route early**: broaden the
  job-to-be-done / geography-first / B2B white-label. (decisions.md D5 — still open.)
- **Moat** = a trusted, *predictive* "concordance" score (practice performance → real
  outcome). Start collecting the signal from day one.

## Content pipeline rule
Never ship raw AI output. The pipeline is **generate → validate → calibrate-live**
(auto-solve, answer-uniqueness check, difficulty estimation, then real user data). That
validation loop is the actual asset, not the raw generation.

## Repo map
- `docs/` — strategy briefs: the category brief and the aptitude vertical deep-dive (HTML)
- `tools/aptitude-market-research/` — the API-first research kit (run in Claude Code;
  see its README). Pulls keywords, demand, competitor traffic, funding/graveyard, VoC.
- `memory/decisions.md` — the decision record. **Read this for the reasoning.**

## How to work here
- Prefer complete, copy-paste-ready scripts (heredoc blocks) over fragments; env is
  macOS Apple Silicon + Homebrew.
- Keep this file lean. When we make a real decision, **append it to `memory/decisions.md`**
  (dated, with rationale), and only update this file if the one-screen summary changes.

## Status / next
- Research kit built but **untested against live APIs** — expect to debug on first run.
- Next up: add an **analysis layer** (scoring, clustering, TAM/SAM/SOM, VoC theming) and
  a **report generator**; decide the escape route; pull real keyword volumes.
