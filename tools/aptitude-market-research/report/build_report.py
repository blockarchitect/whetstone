"""Assemble ./data pulls into:
   output/keyword_workbook.xlsx   — prioritised keyword opportunities + competitor map
   output/industry_report.md      — a report draft with the numbers filled in

Bring these back into a Claude chat to finish the report, the TAM/SAM/SOM model,
and the content plan.
"""
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT = ROOT / "output"
OUT.mkdir(exist_ok=True)


def load(name):
    p = DATA / name
    return pd.read_csv(p) if p.exists() else pd.DataFrame()


def opportunity_score(df):
    """Simple, transparent priority score: reward volume, punish difficulty.
    score = volume_rank_percentile * (1 - KD/100).  Higher = better wedge."""
    if df.empty or "search_volume" not in df:
        return df
    d = df.copy()
    d["search_volume"] = pd.to_numeric(d["search_volume"], errors="coerce").fillna(0)
    d["keyword_difficulty"] = pd.to_numeric(d.get("keyword_difficulty"), errors="coerce").fillna(50)
    d["vol_pct"] = d["search_volume"].rank(pct=True)
    d["opportunity"] = (d["vol_pct"] * (1 - d["keyword_difficulty"] / 100) * 100).round(1)
    return d.sort_values("opportunity", ascending=False)


def build_workbook():
    kw = opportunity_score(load("keywords.csv"))
    sugg = load("keyword_suggestions.csv")
    serp = load("serp_rankers.csv")
    top_domains = load("serp_top_domains.csv")
    visits = load("competitor_visits.csv")
    geo = load("competitor_geo.csv")
    funding = load("funding_and_graveyard.csv")
    jobs = load("jobs_demand.csv")

    path = OUT / "keyword_workbook.xlsx"
    with pd.ExcelWriter(path, engine="openpyxl") as xw:
        if not kw.empty:
            kw.to_excel(xw, sheet_name="keywords_scored", index=False)
            # winnable = decent volume, low difficulty
            win = kw[(kw["search_volume"] >= 100) & (kw["keyword_difficulty"] <= 35)]
            win.to_excel(xw, sheet_name="winnable_longtail", index=False)
        for df, sheet in [(sugg, "suggestions"), (serp, "serp_rankers"),
                          (top_domains, "incumbent_domains"), (visits, "competitor_traffic"),
                          (geo, "competitor_geo"), (funding, "funding_graveyard"),
                          (jobs, "job_demand")]:
            if not df.empty:
                df.to_excel(xw, sheet_name=sheet, index=False)
    print(f"wrote {path}")
    return kw, top_domains, visits, funding


def build_report(kw, top_domains, visits, funding):
    def top(df, col, n=10):
        return df.head(n).to_markdown(index=False) if not df.empty else "_no data_"

    md = ["# Aptitude Vertical — Industry Report (data-filled draft)\n",
          "_Auto-generated from live pulls. Bring into Claude to finish narrative, "
          "TAM/SAM/SOM model, and content plan._\n",
          "## 1. Search demand\n",
          "Highest-opportunity keywords (volume high, difficulty low):\n",
          top(kw[["geo", "keyword", "search_volume", "keyword_difficulty", "opportunity"]]
              if not kw.empty else kw, "opportunity", 15), "\n",
          "## 2. Who owns the SERPs (incumbent map)\n",
          top(top_domains, "appearances", 15), "\n",
          "## 3. Competitor traffic (Similarweb)\n",
          "Monthly visits by competitor — sizes the real audience and validates the "
          "SEO thesis:\n",
          (visits.pivot_table(index="date", columns="domain", values="visits",
                              aggfunc="first").to_markdown()
           if not visits.empty else "_no data — add SIMILARWEB_API_KEY_"), "\n",
          "## 4. Funding & graveyard (Crunchbase)\n",
          "Who raised, who closed (status = 'closed' is your 'someone tried and failed' "
          "evidence):\n",
          top(funding.sort_values("funding_total_usd", ascending=False)
              if not funding.empty else funding, "funding_total_usd", 20), "\n",
          "## 5. To complete in Claude\n",
          "- TAM / SAM / SOM (bottom-up funnel × top-down market reports)\n"
          "- Voice-of-customer themes from `data/reddit_voc.csv`\n"
          "- Seasonality from `data/trends_over_time.csv` (map to grad-recruitment cycle)\n"
          "- Geography decision (UK vs India) from trends_by_country + competitor_geo\n"
          "- Primary validation plan: survey (Prolific) + fake-door landing-page CTR/WTP test\n"]
    p = OUT / "industry_report.md"
    p.write_text("\n".join(md))
    print(f"wrote {p}")


if __name__ == "__main__":
    kw, top_domains, visits, funding = build_workbook()
    build_report(kw, top_domains, visits, funding)
