# Aptitude-Vertical Market Research Kit

An **API-first, autonomously-runnable** research pipeline for the pre-employment
aptitude / psychometric prep vertical (venture "C2").

You run this in **Claude Code on your own machine** (it needs internet egress —
the chat sandbox doesn't have it). Drop your keys into `.env`, run one command,
and it pulls keyword volumes, demand signals, competitor traffic, funding/graveyard
data, and voice-of-customer, then assembles a keyword workbook + an industry-report
draft.

---

## 1. What it pulls (and which key each needs)

| Module | Source | What you get | Key required | Cost |
|---|---|---|---|---|
| `dataforseo_keywords` | **DataForSEO** | Real search volumes, CPC, competition, keyword difficulty, and SERP top-rankers for your seed list + auto-expanded long tail | `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` | pay-as-you-go (~cents) |
| `free_sources.trends` | **Google Trends** (pytrends) | Interest over time, by-country breakdown (UK vs India vs US), rising related queries, seasonality | *none* | free |
| `free_sources.jobs` | **Adzuna** | Graduate-hiring volume by country/sector (demand-size proxy) | `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` | free tier |
| `free_sources.reddit` | **Reddit** (PRAW) | Voice-of-customer: real candidate pains, from career subreddits | `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` | free |
| `paid_sources.similarweb` | **Similarweb** | Competitor monthly traffic, top countries, traffic sources (sizes the real audience + validates the SEO thesis) | `SIMILARWEB_API_KEY` | paid |
| `paid_sources.crunchbase` | **Crunchbase** | Who raised, who exited, **who died** in test-prep/assessment (your "did someone try and fail" evidence) | `CRUNCHBASE_API_KEY` | paid plan |

**Optional swap-ins** (edit `.env` + module): `SEMRUSH_API_KEY` or `AHREFS_API_TOKEN`
instead of / alongside DataForSEO; `LIGHTCAST` for job-posting text mining (which
employers require which assessment) — the one question free sources can't answer cleanly.

### The lean recommended set
`DataForSEO` + `Similarweb` + `Crunchbase` + the free trio (Trends, Adzuna, Reddit).
A few hundred $/mo, covers keyword + demand + competitor + graveyard + VoC.

### Start free
DataForSEO gives trial credit; Trends/Reddit are free; Adzuna's free tier is enough
to smoke-test. You can run the whole pipeline on trial/free keys first, then add the
paid ones.

---

## 2. Setup

```bash
# in Claude Code, from this folder
python -m venv .venv && source .venv/bin/activate     # (Windows: .venv\Scripts\activate)
pip install -r requirements.txt
cp .env.example .env          # then paste your keys into .env
```

Get the keys:
- **DataForSEO** → dataforseo.com → dashboard → API credentials (login + password)
- **Adzuna** → developer.adzuna.com → register app → app_id + app_key
- **Reddit** → reddit.com/prefs/apps → create app (type: *script*) → client id + secret
- **Similarweb** → similarweb.com → account → API key (Enterprise/API plan)
- **Crunchbase** → data.crunchbase.com → API key (requires a paid plan)

---

## 3. Run

```bash
python run_all.py                 # runs every module you have keys for, writes to ./data
python run_all.py --only keywords # or run a single module: keywords | trends | jobs | reddit | similarweb | crunchbase
python report/build_report.py     # assembles ./data into ./output/keyword_workbook.xlsx + industry_report.md
```

Modules with missing keys are **skipped with a warning**, not fatal — so a partial
key set still produces partial output. Everything is written as CSV/JSON in `./data`
so it's inspectable and re-runnable, and pulls are cached to avoid re-billing.

Then bring `./output/` back into a Claude chat and I'll turn the workbook +
report draft into the finished industry report, the TAM/SAM/SOM model, and the
prioritised keyword-opportunity plan.

---

## 4. The seed keywords

`config/keywords.yaml` is pre-loaded with the vertical's head / mid / long-tail
terms, the major publishers (SHL, Korn Ferry, CCAT, Aon…), the top employer-specific
queries, and the target geographies. DataForSEO auto-expands each seed into its long
tail, so this is a starting frame, not a ceiling — edit it freely.

---

## 5. Terms-of-service — read this

- **Use official APIs** (DataForSEO, Adzuna, Reddit, Similarweb, Crunchbase, Google).
  All are automation-permitted under their terms. This kit only calls official APIs.
- **Do NOT bulk-scrape** Ahrefs/Semrush web UIs, LinkedIn, or Similarweb's site — that
  violates their ToS and gets accounts banned. If you use Semrush/Ahrefs, use their
  **API**, not scraping.
- Keep any LinkedIn use read-only and manual (via the browser), never automated.
- pytrends is an *unofficial* Trends interface; it can rate-limit. The kit backs off
  and retries; if Google blocks it, fall back to the Trends web UI.

---

## 6. What this does NOT do (and where it goes next)
- **Primary demand validation** (survey + fake-door landing-page test) is a separate,
  later step — see `report/build_report.py` notes. That's how you prove willingness-to-pay
  rather than infer it.
- **Employer→assessment mapping** at scale needs Lightcast (paid); free sources only
  proxy hiring volume.
