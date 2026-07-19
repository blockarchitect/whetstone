"""Free / low-cost demand sources: Google Trends, Adzuna, Reddit."""
import time

import pandas as pd
import requests
from tenacity import retry, stop_after_attempt, wait_exponential

from . import cfg, env, has, write_df, write_json


# ---------------------------------------------------------------- TRENDS
def trends():
    """Google Trends: interest over time + by-country + rising related queries."""
    try:
        from pytrends.request import TrendReq
    except ImportError:
        print("  [skip] pytrends not installed"); return
    print("  · Google Trends")
    c = cfg()
    py = TrendReq(hl="en-US", tz=0, retries=3, backoff_factor=1.0)
    terms = c["head_terms"][:5]  # Trends allows max 5 per payload

    rows_time, rows_region, rows_related = [], [], []
    for iso2 in [m["iso2"].upper() for m in c["geographies"].values()]:
        try:
            py.build_payload(terms, timeframe="today 5-y", geo=iso2)
            iot = py.interest_over_time()
            if not iot.empty:
                iot = iot.drop(columns=[x for x in ["isPartial"] if x in iot], errors="ignore")
                for date, r in iot.iterrows():
                    for t in terms:
                        rows_time.append({"geo": iso2, "date": date.date(),
                                          "term": t, "interest": int(r.get(t, 0))})
            rq = py.related_queries()
            for t, d in (rq or {}).items():
                rising = d.get("rising")
                if rising is not None:
                    for _, rr in rising.iterrows():
                        rows_related.append({"geo": iso2, "seed": t,
                                             "rising_query": rr["query"], "value": rr["value"]})
            time.sleep(2)  # be polite to Trends
        except Exception as e:
            print(f"    trends {iso2} failed: {e}")

    # single-region comparison of interest by country (uses geo='')
    try:
        py.build_payload(terms, timeframe="today 12-m", geo="")
        ibr = py.interest_by_region(resolution="COUNTRY", inc_low_vol=True)
        for country, r in ibr.iterrows():
            for t in terms:
                rows_region.append({"country": country, "term": t, "interest": int(r.get(t, 0))})
    except Exception as e:
        print(f"    interest_by_region failed: {e}")

    write_df("trends_over_time.csv", pd.DataFrame(rows_time))
    write_df("trends_by_country.csv", pd.DataFrame(rows_region))
    write_df("trends_rising_queries.csv", pd.DataFrame(rows_related))


# ---------------------------------------------------------------- ADZUNA
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=20))
def _adzuna(country, what, page=1):
    url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/{page}"
    r = requests.get(url, params={
        "app_id": env("ADZUNA_APP_ID"), "app_key": env("ADZUNA_APP_KEY"),
        "what": what, "results_per_page": 20, "content-type": "application/json",
    }, timeout=60)
    r.raise_for_status()
    return r.json()


def jobs():
    """Graduate-hiring volume by country/sector — a demand-size proxy."""
    if not has("ADZUNA_APP_ID", "ADZUNA_APP_KEY"):
        print("  [skip] Adzuna keys missing"); return
    print("  · Adzuna job-market demand")
    c = cfg()
    rows = []
    for geo, meta in c["geographies"].items():
        for q in c["job_queries"]:
            try:
                j = _adzuna(meta["iso2"], q)
                rows.append({"geo": geo, "iso2": meta["iso2"], "query": q,
                             "postings": j.get("count"),
                             "mean_salary": (j.get("mean") if "mean" in j else None)})
                time.sleep(1)
            except Exception as e:
                print(f"    adzuna {geo}/{q} failed: {e}")
    write_df("jobs_demand.csv", pd.DataFrame(rows))


# ---------------------------------------------------------------- REDDIT
def reddit():
    """Voice-of-customer: pull candidate posts/comments mentioning the tests."""
    if not has("REDDIT_CLIENT_ID", "REDDIT_CLIENT_SECRET"):
        print("  [skip] Reddit keys missing"); return
    try:
        import praw
    except ImportError:
        print("  [skip] praw not installed"); return
    print("  · Reddit voice-of-customer")
    r = praw.Reddit(
        client_id=env("REDDIT_CLIENT_ID"),
        client_secret=env("REDDIT_CLIENT_SECRET"),
        user_agent=env("REDDIT_USER_AGENT", "aptitude-research"),
    )
    c = cfg()["reddit"]
    rows = []
    for sub in c["subreddits"]:
        for term in c["search_terms"]:
            try:
                for post in r.subreddit(sub).search(term, limit=c["limit_per_query"], sort="relevance"):
                    rows.append({
                        "subreddit": sub, "search_term": term,
                        "title": post.title, "score": post.score,
                        "num_comments": post.num_comments,
                        "created": post.created_utc, "url": f"https://reddit.com{post.permalink}",
                        "selftext": (post.selftext or "")[:2000],
                    })
                time.sleep(1)
            except Exception as e:
                print(f"    reddit {sub}/{term} failed: {e}")
    df = pd.DataFrame(rows).drop_duplicates(subset=["url"])
    write_df("reddit_voc.csv", df)


def run():
    trends()
    jobs()
    reddit()


if __name__ == "__main__":
    run()
