# CLAUDE.md — Aptitude-Prep Venture

> Auto-loaded every session. Kept lean on purpose — this is a map, not the content.
> **For the current strategy, read `docs/` (start at `docs/README.md`).** For the
> reasoning/history behind it, read `memory/decisions.md`. For what's still open,
> read `memory/open-questions.md`.

## What this project is
An **AI-native practice-test platform for the pre-employment aptitude & psychometric
testing vertical.** Free tools first to build an audience; monetize a validated market
later. **One vertical — not a unified multi-test platform.**

**2-year north star:** become the **trusted, portable qualifying assessment** — a
candidate tests once on Whetstone and it qualifies them for the next round at any
participating employer. Free practice is the wedge, not the business. Full detail →
`docs/01-strategy.md`.

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

## The strategy, one line each — full detail lives in `docs/`
- **Architecture diagram** (visual, whole platform, green=decided/amber=open) → `docs/00-architecture-diagram.md`
- **Strategy & business model** (north star, vertical choice, LTV, personas) → `docs/01-strategy.md`
- **Product architecture** (engine, skins, delivery, test intelligence, item bank) → `docs/02-product-architecture.md`
- **Data & trust** (identity, IRT calibration, the concordance moat/credential) → `docs/03-data-and-trust.md`
- **Growth engine** (GTM, pSEO/AEO loop, pre-intent audience capture) → `docs/04-growth-engine.md`
- **Tech stack & tooling** → `docs/05-tech-stack.md`

## Repo map
- `docs/` — the curated, current-state reference (see above). Start at `docs/README.md`.
- `reports/` — external-facing strategy briefs: the category brief and the aptitude
  vertical deep-dive (HTML).
- `tools/aptitude-market-research/` — the API-first research kit (run in Claude Code;
  see its README). Pulls keywords, demand, competitor traffic, funding/graveyard, VoC.
- `memory/decisions.md` — the decision record (D1–D23+). The historical *why*.
- `memory/open-questions.md` — the living brainstorm log: everything still open, grouped by area.

## How to work here
- Prefer complete, copy-paste-ready scripts (heredoc blocks) over fragments; env is
  macOS Apple Silicon + Homebrew.
- **When we make a real decision:** append it to `memory/decisions.md` (dated, with
  rationale), **and** update the relevant `docs/*.md` topic file in place so it stays
  the accurate current-state read. Decisions file = history (append-only); docs/ = now
  (curated, rewritten). Don't duplicate prose between them — docs/ cites the D# for
  full reasoning instead of repeating it.
- **Brainstorming mode:** when Ankur raises an idea, surface the follow-up questions it
  spawns and **append them to `memory/open-questions.md`** (grouped by area). Don't let
  follow-ups evaporate in chat. Fold answered questions back into a decision + doc update.
- Keep this file lean — it's a map. If the map itself changes (new pillar, renamed
  doc), update it; strategy detail belongs in `docs/`, not here.

## Status / next
- Research kit built but **untested against live APIs** — expect to debug on first run.
- Architecture largely designed (see `docs/`); nothing built yet (no app code, repo just seeded).
- The two genuinely-open engineering problems: the **data spine → concordance**
  (`docs/03-data-and-trust.md`) and the **Test Intelligence** framework
  (`docs/02-product-architecture.md`). Monetization + auth parked.
- Next concrete step: **pull real keyword volumes** (unblocks start-market + the v1 pSEO page).
