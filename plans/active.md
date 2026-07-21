# Active — in flight now

## Whetstone MVP — static UK launch, 12 practice tests
**Status:** Phases 1–2 done. Phase 1 (scaffold + schema + migration) green. Phase 2
(content) done: 75 items (25/construct, answer-position balanced), 12 UK skins, seed
script with offline dry-run validation + proven guards (bad key, missing disclaimer,
unknown item ref). Next: Phase 3 (test-taking UI), Phase 4 (SEO), Phase 5 (deploy — needs
Neon + Vercel from Ankur).

### Context
Whetstone's strategy (D1–D26 in `../memory/decisions.md`) has fully designed a sophisticated,
config-driven platform — a generative construct engine, automated SEO/AEO discovery, adaptive
delivery, deep reporting, gamification, credential signing — but **zero application code existed
until this plan**. Ankur asked to skip all of that automation for now and ship something real
fast: a non-adaptive, hand-seeded MVP covering 10–15 practice tests for a single market, to
validate the wedge before investing in the generative engine or growth automation. D26 locked this
scope and confirmed **UK** as the launch market (evidence: the Trends relevance analysis showed
~78% on-thesis search signal for UK vs. ~5% for India). This is the concrete build for that MVP.

**The one design discipline carried over from the full architecture, even in this stripped
version:** a shared item pool + separate skin configs (D3's shape), not 10–15 hardcoded question
sets. This costs nothing extra now and is the exact seam a real generative engine slots into
later without a rewrite.

### Recommended approach

**New top-level directory `platform/`** in this same repo (not a separate repo, not a Turborepo
monorepo yet — D26 explicitly defers D23's service split). One Next.js (App Router) project,
TypeScript, Neon Postgres via Drizzle ORM, Zod for validation, deployed on Vercel — all per the
already-decided stack (D8). `docs/`, `memory/`, `reports/`, `tools/` are untouched.

#### Schema (`platform/db/schema.ts`)
Five tables:
- **`items`** — the shared pool. `id` (stable string slug, e.g. `num-014`), `construct`
  (numerical/verbal/logical), `stem`, `options` (jsonb), `correctOptionId`, `explanation`, `tags`.
- **`testProfiles`** — the skin config. `slug` (unique, the permanent `/practice/{slug}` URL key),
  `displayName`, `tier` (publisher/employer), `companyOrPublisherName`, **`disclaimer`** (required,
  no default — the one non-negotiable legal field from D26), `deliveryMode` (enum, only `linear`
  valid for now — extend later, never rename), `timeLimitMinutes`, `seoDescription`.
- **`testProfileItems`** — a real FK join table (not a jsonb list) mapping profiles to items with
  an order index. Costs nothing now; answers "which skins use item X" directly later when D14's
  item-bank evolution work begins — no migration needed to get that.
- **`sessions`** — anonymous identity. A single UUID row per visitor; that UUID *is* the cookie
  value. No email, no login — simpler than even D12's "optional email at readiness moment," which
  is explicitly deferred along with the rest of deep reporting.
- **`testAttempts`** / **`events`** — attempt state (answers, computed score as jsonb: total +
  per-construct breakdown) and basic tracking (page_view / test_started / test_completed).

#### Validation (`platform/lib/schemas.ts`)
Hybrid: `drizzle-zod`'s `createInsertSchema` as the base for flat columns (real single source of
truth there), hand-written Zod overrides for the jsonb shapes (`options`, `score`) since
drizzle-zod can't introspect jsonb. Two critical enforcements live here, not just in the UI:
- `itemSchema` cross-checks `correctOptionId` is actually among `options` (catches a bad key at
  seed time, not in production).
- `testProfileSchema` requires `disclaimer` to be a real string (`min(20)`), so the legal
  requirement can't silently regress to an empty/default value in a future edit.
- A separate `itemContentSchema` (id, construct, stem, options — **no `correctOptionId`**) is what
  the client ever receives during an active attempt. Grading happens server-side against the full
  row, re-fetched fresh.

#### App Router structure
```
platform/
  app/
    layout.tsx
    page.tsx                          # homepage: list all 12 skins
    sitemap.ts  robots.ts
    practice/[slug]/
      page.tsx                        # SEO landing page, generateStaticParams over all slugs
      actions.ts                      # 'use server': startAttempt, finishAttempt (grades here)
      attempt/[attemptId]/
        page.tsx                      # test-taking UI — all questions client-side, one submit
        results/page.tsx
    api/events/route.ts               # POST, fired client-side for page_view etc.
  middleware.ts                       # ensures the anonymous session cookie exists on every request
  db/schema.ts  db/client.ts
  lib/schemas.ts
  content/items.yaml  content/skins.yaml
  scripts/seed.ts
```
Test-taking flow is **all-on-one-page** (client component, local state moves between questions),
not a server round-trip per question — matches the "non-adaptive, simple" scope and avoids
building session-state machinery that D10's later adaptive work would need anyway.

#### Content seeding
`content/items.yaml` (~60–90 items) and `content/skins.yaml` (the 12 profiles), in the same
checked-into-repo convention as the existing `tools/aptitude-market-research/config/keywords.yaml`.
`scripts/seed.ts` (run via `tsx`) parses both, validates every row against the Zod schemas above,
cross-checks that every item a skin references actually exists and that section counts match, then
upserts idempotently (safe to re-run after edits). It refuses to run if a re-seed would change an
**existing** profile's `slug` — that's a live, indexed URL once deployed.

**The 12 target skins** (from `keywords.yaml`'s existing seed list, not new guesses): publisher-
style — SHL-style, CCAT, Watson Glaser, Korn Ferry-style, Plural Strategy-style; named-employer —
Amazon, Deloitte, PwC, KPMG, Civil Service, Capgemini, Barclays.

#### SEO
Each `/practice/{slug}` page is statically generated (`generateStaticParams`), carries on-page copy
+ `FAQPage` JSON-LD (the real, Google-supported rich-result type — `Quiz` schema.org markup isn't a
documented rich-result type, so it's skipped rather than shipped as decoration), and **always**
renders the disclaimer component sourced from the required DB column. `sitemap.ts` covers all 12
URLs.

### What's explicitly out of scope (per D26 — do not build)
Any generative content engine, adaptive/CAT delivery, per-company UI theming, deep psychometric
reporting/benchmarking, gamification, credential signing, automated SEO/growth-engine discovery,
the D23 three-app service split, DIF/skill-taxonomy tagging. If a design choice here would make
adding one of these later *harder*, flag it — don't build it now regardless.

### Known technical risks (address in code, not just note)
- **Never send `correctOptionId` to the client** during an active attempt — query only
  `itemContentSchema`-shaped rows for the test-taking page.
- **Neon + Vercel**: use `drizzle-orm/neon-http` (request/response, not a persistent pool) — a raw
  `pg.Pool` per serverless invocation exhausts Neon's connection limit fast.
- **Anonymous cookie**: set/read it in `middleware.ts`, not ad hoc inside a Server Component (RSCs
  can't call `cookies().set()`).
- **Timer is honor-system only** in MVP (no server-enforced cutoff) — acceptable for a no-stakes
  practice tool, but a deliberate, documented simplification, not an oversight.

### The one blocking dependency — human-gated, not agent-controllable
**Neon and Vercel projects need to exist before this can go live.** I can't create those accounts.
Once you have a Neon connection string and a Vercel project linked to this repo, I'll wire them in
(gitignored `.env.local`, matching the existing `.env` pattern for the research kit) and deploy.
Everything else — schema, seed content, the app itself — can be built and verified locally first.

### Phased build sequence (agent wall-clock, not human-dev hours)
| Phase | What | Est. | Task |
|---|---|---|---|
| 1 | Scaffold `platform/`, Drizzle schema + Zod schemas, first migration | 45–75 min | #1 |
| 2 | Content: ~60–90 items + 12 skin configs in YAML, seed script, validation | 2.5–4 hrs | #2 |
| 3 | Test-taking UI: landing shell, attempt flow, scoring action, results page | 2–3 hrs | #3 |
| 4 | SEO: landing template across all 12 slugs, JSON-LD, sitemap/robots, disclaimer component | 1–1.5 hrs | #4 |
| 5 | Deploy + smoke test all 12 pages (needs Neon + Vercel — see blocker above) | 30–60 min | #5 |

Total ≈ 7–10 hrs of agent-active time. **Phase 2 is the highest-variance phase** — not because
drafting is slow, but because validating original, non-ambiguous, correctly-keyed items is a real
human judgment gate that doesn't compress with agent speed. Plan to review a first draft batch
together before generating the full 60–90.

### Verification
- `pnpm build` + `tsc --noEmit` green after each phase (fast gate).
- `scripts/seed.ts` run against a real (or temporary local) Postgres confirms every cross-check
  passes — no orphaned item references, no duplicate slugs, every profile's disclaimer present.
- Manually complete one full attempt end-to-end locally (`pnpm dev`) for at least one publisher-tier
  and one employer-tier skin before considering any phase "done."
- After deploy: load all 12 `/practice/{slug}` pages, confirm the disclaimer renders on every one,
  confirm `sitemap.xml` lists all 12, submit to Search Console (manual, your Google account).
