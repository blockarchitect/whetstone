# Whetstone docs — index

**Read order for a cold start:** `CLAUDE.md` (repo root) → this file → the
[architecture diagram](00-architecture-diagram.md) for the big picture → the topic doc
you need.

## How the docs are organized (three layers, don't duplicate across them)
- **`docs/` (this folder) — the current picture.** Curated, rewritten as understanding
  changes. Answers "what's true now" for one topic in one place. **Read this first.**
- **`memory/decisions.md` — the historical record.** Append-only, dated, chronological
  (D1, D2, D3…). Answers "why did we decide this, and what did we reject." Every topic
  doc below cites the D-numbers it's built from — go there for the full reasoning and
  rejected alternatives, not repeated here.
- **`memory/open-questions.md` — the living brainstorm log.** Everything still unresolved,
  grouped by area (§A–§R). Follow-ups from any conversation get appended there.

## Topic docs
| Doc | Covers | Key decisions |
|---|---|---|
| [`00-architecture-diagram.md`](00-architecture-diagram.md) | Visual block diagram of the whole platform, what's designed vs. still open | all of the below |
| [`01-strategy.md`](01-strategy.md) | North star, vertical choice, business model, personas | D1, D5, D13 |
| [`02-product-architecture.md`](02-product-architecture.md) | Construct engine, skins, delivery, UI shells, test intelligence, item bank evolution, gamification, vertical-agnostic design | D2, D3, D10, D11, D14, D16, D21, D22 |
| [`03-data-and-trust.md`](03-data-and-trust.md) | Identity, IRT calibration, concordance model / the moat, deep reporting, credential signing | D6, D12, D17, D20 |
| [`04-growth-engine.md`](04-growth-engine.md) | GTM, pSEO/AEO loop, pre-intent audience capture, daily micro-content, LinkedIn, community/events | D4, D9, D15, D18, D19, D20 |
| [`05-tech-stack.md`](05-tech-stack.md) | Stack choices, service boundaries, no-AI-in-hot-path, MCP seam, tooling | D7, D8, D23 |
| [`question-types.md`](question-types.md) | Full catalogue of aptitude question types + styles, marked for MVP coverage | D3, D26 |
| [`06-requirements.md`](06-requirements.md) | Requirements spec — functional + non-functional, horizon-tagged (MVP/Post-MVP/North-star), with acceptance criteria on MVP items | D27 (all D#) |
| [`07-system-design.md`](07-system-design.md) | System/technical design — modules, data model, APIs, flows (a later pass, after §06 is ratified) | D27 (not yet written) |

## Maintenance rule
When a topic doc goes stale (a new decision changes it), **edit it in place** — don't
append a dated update inline. Dated context belongs in `decisions.md`; this layer stays
a clean current-state read. If a new D# meaningfully changes a topic doc, update the doc
*and* note the doc was touched in that D# entry.
