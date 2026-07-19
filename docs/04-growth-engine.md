# Growth engine — SEO, AEO, and pre-intent audience capture

*Full reasoning + rejected alternatives: `memory/decisions.md` D4, D9, D15.*

## Why this is core infrastructure, not a marketing add-on
The product is one-time / low-LTV (`01-strategy.md`) — a candidate preps once and churns.
Paid acquisition math never closes at that LTV, so **near-zero-marginal-cost organic
discovery is essentially the entire growth model.** It's built as core infra, same
priority tier as the product engine.

## GTM: free-tools-first, long-tail SEO
Free, ungated, high-quality practice is the acquisition wedge; paid depth later. The
winnable search demand is the **long tail** (company/publisher-specific queries) — high
intent, low competition — not the incumbent-locked head terms. AI-cheap content covers
thousands of variants no hand-authoring team can.

**Open:** start market — UK (highest intent, but universities give students free
incumbent prep) vs. India (highest volume, very price-sensitive). Decide once real
keyword volumes are pulled. → `open-questions.md` §B.

## The unfair advantage
Our content engine *is* our SEO engine. Each `[company]-assessment-practice` page is a
**real, working free tool** (a test-profile skin over live generated items,
`02-product-architecture.md`), not thin pSEO spam — it survives Google's spam
crackdowns because it's genuinely useful. The same config that spins up a "test" spins
up a page.

## Buy vs. build vs. Google — layered, not a single choice
| Layer | Decision | What |
|---|---|---|
| Keyword + AI-SERP data | **Buy the API** | DataForSEO — volumes/difficulty + AI-Overview/AI-mode endpoints (same account tracks AI-answer presence). Never a Semrush/Ahrefs *seat* (can't automate a UI). |
| Ground truth | **Use Google, free** | Search Console API — actual impressions/clicks/position per URL. Non-negotiable feedback loop. (+ Trends.) |
| Orchestration + page factory | **Build, thin, in-house** | No SaaS does this for our template model — this *is* the automation. |
| Dashboard | **Build last, thin** | A viewer onto the pipeline's Postgres tables, inside admin — not the engine. |

## The loop (a `growth/` package, mostly scheduled jobs)
1. **Discover** — DataForSEO expands seeds × companies × publishers → opportunity table.
2. **Prioritise** — score = `volume × prep-intent × (low difficulty) × can-serve-natively`.
   Long-tail employer/publisher terms win; head terms are incumbent-locked.
3. **Generate** — winning cluster → page from a template (skin + items + AI-authored
   supporting copy, offline) → Next.js ISR route + auto sitemap + internal links.
4. **Measure** — GSC API (rankings) + PostHog (completion/engagement) → Postgres.
5. **Iterate** — prune losers, expand winners. Closed loop.

## AEO / GEO — not separate from SEO
AI answers (Perplexity, ChatGPT search, Google AI Overviews, Gemini) are retrieval-based
and cite the clearest, most structured, most authoritative answer — crawlability is the
substrate, not the enemy.

1. **Structure for extraction** — every page emits schema.org (`FAQPage`, `Quiz`,
   `HowTo`) generated from the same config; direct-answer H2s, tables, concrete facts.
2. **Be a citable primary source** — the **concordance score** (`03-data-and-trust.md`)
   is a proprietary statistic AI engines cite because no one else has it. Moat and AEO
   are the same asset — publish it.
3. **Be present where LLMs trust** — Reddit is heavily weighted; the existing VoC
   research doubles as AEO distribution. Add `llms.txt`; keep the crawl fast and clean.
4. **Be the callable tool** — the deepest bet: expose the engine as an **MCP server**
   (seam reserved, `05-tech-stack.md`) so an agent asked for practice content *invokes
   us* directly, not just cites a page.

**Measuring AEO:** track referral traffic from perplexity/chatgpt/gemini domains in
PostHog; run a scheduled **share-of-AI-voice** check — query the AI engines with target
questions, record whether we're cited.

**Build order:** GSC + DataForSEO ingestion → opportunity scoring → one pSEO template
proven to rank → admin Growth tab → AEO structured-data + citation tracker → MCP surface
last.

## Pre-intent audience capture: mine adjacent psychographic clusters
The loop above is entirely **bottom-of-funnel** — transactional, "I have a test in 5
days" intent. This adds a **top-of-funnel, psychographic** channel: reach the same
underlying person (competitive, reasoning-oriented, self-improvement-minded) *before*
their job-hunt trigger fires, via correlated interests (IQ tests, brain teasers, puzzle
communities, competitive-exam culture).

**Discovery — mine the adjacency, don't guess it.** A standing, re-run module extending
the same research kit:
- **Keyword co-occurrence** — DataForSEO "people also search" / related keywords / PAA
  on existing seed terms.
- **Referral-source mining** — Similarweb traffic-source data on competitor domains
  (already pulled) — adjacent channels arrive pre-validated by someone else's traffic.
- **Trends correlation** — interest-over-time between core terms and candidate adjacent
  terms, by geography (temporal/psychographic links, e.g. exam-season spikes).
- **Reddit community adjacency** — cross-membership between career subreddits and
  candidate communities. **Aggregate-level only** — no individual user tracking.

**Activation — same engine, new skin, different motivation.** Reasoning items *are* what
IQ-style content measures — no new content pipeline, just a skin framed for curiosity
("how sharp is your logical reasoning?") instead of anxiety, with shareable score cards.
Capture with the existing lightweight identity and **nurture until the job-hunt trigger
eventually fires** — a genuine retention/LTV lever, not vanity traffic.

**Guardrails — do not skip these:**
- **Brand collision with the north star.** Generic "IQ test" content is a crowded,
  low-trust space (dark-pattern paywalls) — exactly wrong next to "the assessment
  employers trust." Needs a deliberate brand-architecture answer before shipping any
  adjacent content → `open-questions.md` §J, Q40.
- **Claim discipline.** Never claim to measure "IQ" specifically — frame as
  reasoning/logic challenges, not a certified instrument.
- **Scope — a channel, not a pivot.** General cognitive/olympiad content stays
  engine-share only, never a quiet drift into being an IQ-test site.

**Status:** committed direction; open questions → `open-questions.md` §J.

## Daily micro-content distribution — a concrete pre-intent-capture tactic
One calibrated item a day, scheduled, posted as a poll/question people answer in-feed,
with a reply/thread revealing the answer + a short explanation + a link back to
"practice more." **Zero new content pipeline** — it's the quick-practice format
(`02-product-architecture.md`), picked and dispensed on a schedule. Wordle-style
mechanics apply directly: appointment habit, shareable results, zero-friction
participation (answer without leaving the feed).

**Channel — don't commit yet, match the persona** (`01-strategy.md`). The original idea
was a Twitter poll, but that's not obviously the best fit: **LinkedIn** is more
career-native for Priya (UK grad); a **WhatsApp broadcast channel** is likely far
higher-reach for Arjun (India, the highest-volume persona) than Twitter. Candidates to
pilot small before committing: LinkedIn poll, WhatsApp broadcast channel, X/Twitter
poll, daily email.

**Bonus, low-confidence:** even anonymous poll results ("73% got this wrong") are a
free, crude difficulty-calibration signal into item-bank evolution
(`02-product-architecture.md`) — noisy and self-selected, so treat as a weak prior, not
a substitute for real platform data.

**Honest framing:** a cheap experiment worth trying, not a growth *pillar*. Unlike the
pSEO/AEO loop above, reach here depends on audience/virality that isn't guaranteed to
compound the way search does — don't over-invest relative to the core engine.

**Status:** committed direction; open questions → `open-questions.md` §M.

## LinkedIn — organic + OAuth now, ATS/employer integration is the real later play
Grounded in live research (2026-07-20), not assumption — "deep integration" needs to fit
what LinkedIn actually permits, which is much narrower than it sounds.

**Reality check:** LinkedIn has **no self-serve API tier for growth automation.**
Posting automation, analytics, and audience targeting all sit behind Marketing
Developer Platform (MDP) approval — a verified company page, a manual review running
4 weeks to 4 months, "generally reserved for enterprise partners." And two precedents
worth knowing: **LinkedIn discontinued its own Skills Assessments feature** in 2023
(badges removed 2024) — hiring managers valued evidence of applied work over a quiz
badge, a real cautionary data point for credential design, though Whetstone's actual
claim ("a real qualifying step," not "a profile badge") is a different bet. And
**LinkedIn's Talent Solutions partner ecosystem is ATS-integration focused**
(Greenhouse, Workday, Bullhorn), not an assessment-vendor track — so the realistic path
to the D13 north star is via the **ATS employers already use** (where SHL/Korn Ferry
already sit), or a direct employer relationship — not a LinkedIn partnership. LinkedIn's
honest role stays upstream: discovery, application, identity.

**What's real, layered:**
1. **Now, zero API/approval** — company page + founder-led organic content (using
   research-kit data as fodder); **LinkedIn native Polls as the D18 pilot channel**
   (the natural first choice precisely *because* nothing else on LinkedIn is automatable
   yet); a shareable **certificate artifact** for the Licenses & Certifications profile
   section (manual, user-driven — the legitimate version of the credential-display
   pattern LinkedIn itself now points to).
2. **Near-term, confirmed self-serve** — **"Sign in with LinkedIn" (OpenID Connect)**,
   free and unapproved-access, as an *optional* richer layer on the lightweight-identity
   model (`03-data-and-trust.md`).
3. **Later, real BD process, don't build now** — LinkedIn Ads (mismatch for candidate
   acquisition per D9's own paid-doesn't-close logic, but legitimate for B2B buyer
   personas once that motion is active); MDP-approved automated posting (worth the
   approval cost only once manual posting is proven); the real ATS-level assessment
   integration, gated behind the same D13 gates already on record.

**Guardrail, stated explicitly:** no scraping profiles/job posts, no automated
connection requests or DMs, no third-party growth-tool extensions — LinkedIn enforces
this aggressively. Squarely inside the existing official-APIs-only rule (`05-tech-stack.md`).

**Status:** committed direction; open questions → `open-questions.md` §N. Re-verify
before real investment — platform terms shift.
