"""Paid sources: Similarweb (competitor traffic) + Crunchbase (funding/graveyard)."""
import datetime as dt

import pandas as pd
import requests
from tenacity import retry, stop_after_attempt, wait_exponential

from . import cfg, env, has, write_df


# ------------------------------------------------------------- SIMILARWEB
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=20))
def _sw(path, params):
    r = requests.get(f"https://api.similarweb.com/v1/website/{path}",
                     params={**params, "api_key": env("SIMILARWEB_API_KEY")}, timeout=60)
    r.raise_for_status()
    return r.json()


def similarweb():
    """Monthly visits, top countries, and traffic sources for each competitor."""
    if not has("SIMILARWEB_API_KEY"):
        print("  [skip] Similarweb key missing"); return
    print("  · Similarweb competitor traffic")
    c = cfg()
    end = dt.date.today().replace(day=1) - dt.timedelta(days=1)
    start = (end.replace(day=1) - dt.timedelta(days=150)).replace(day=1)
    win = {"start_date": start.strftime("%Y-%m"), "end_date": end.strftime("%Y-%m"),
           "country": "world", "granularity": "monthly", "main_domain_only": "false"}

    visits, sources, geos = [], [], []
    for dom in c["competitor_domains"]:
        try:
            v = _sw(f"{dom}/total-traffic-and-engagement/visits", win)
            for row in v.get("visits", []):
                visits.append({"domain": dom, "date": row.get("date"), "visits": row.get("visits")})
        except Exception as e:
            print(f"    similarweb visits {dom} failed: {e}")
        try:
            s = _sw(f"{dom}/traffic-sources/overview-share",
                    {**win, "granularity": "monthly"})
            sources.append({"domain": dom, "raw": s})
        except Exception as e:
            print(f"    similarweb sources {dom} failed: {e}")
        try:
            g = _sw(f"{dom}/geo/traffic-by-country", win)
            for row in g.get("records", [])[:8]:
                geos.append({"domain": dom, "country": row.get("country"),
                             "share": row.get("share")})
        except Exception as e:
            print(f"    similarweb geo {dom} failed: {e}")

    write_df("competitor_visits.csv", pd.DataFrame(visits))
    write_df("competitor_geo.csv", pd.DataFrame(geos))
    if sources:
        pd.DataFrame(sources).to_json(
            __import__("pathlib").Path(__file__).resolve().parent.parent
            / "data" / "competitor_traffic_sources.json", indent=2)


# ------------------------------------------------------------- CRUNCHBASE
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=20))
def _cb_search(query_terms):
    """Search organizations by keyword; return name, status, funding."""
    url = "https://api.crunchbase.com/api/v4/searches/organizations"
    body = {
        "field_ids": ["identifier", "short_description", "operating_status",
                      "funding_total", "founded_on", "num_funding_rounds",
                      "last_funding_type", "website_url", "categories"],
        "query": [
            {"type": "predicate", "field_id": "description",
             "operator_id": "contains", "values": query_terms},
        ],
        "limit": 100,
    }
    r = requests.post(url, json=body,
                      headers={"X-cb-user-key": env("CRUNCHBASE_API_KEY")}, timeout=60)
    r.raise_for_status()
    return r.json()


def crunchbase():
    """Who raised, exited, or DIED in the space — the 'did someone try' evidence."""
    if not has("CRUNCHBASE_API_KEY"):
        print("  [skip] Crunchbase key missing"); return
    print("  · Crunchbase funding / graveyard")
    c = cfg()
    rows = []
    try:
        j = _cb_search(c["market_search_terms"])
        for e in j.get("entities", []):
            p = e.get("properties", {})
            ft = p.get("funding_total") or {}
            rows.append({
                "name": (p.get("identifier") or {}).get("value"),
                "status": p.get("operating_status"),           # active / closed  ← graveyard
                "funding_total_usd": ft.get("value_usd"),
                "num_rounds": p.get("num_funding_rounds"),
                "last_round": p.get("last_funding_type"),
                "founded": p.get("founded_on", {}).get("value") if isinstance(p.get("founded_on"), dict) else p.get("founded_on"),
                "website": p.get("website_url"),
                "desc": p.get("short_description"),
            })
    except Exception as e:
        print(f"    crunchbase search failed: {e}")
    write_df("funding_and_graveyard.csv", pd.DataFrame(rows))


def run():
    similarweb()
    crunchbase()


if __name__ == "__main__":
    run()
