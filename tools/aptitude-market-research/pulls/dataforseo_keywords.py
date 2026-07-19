"""Keyword research via DataForSEO: volume, CPC, competition, difficulty, SERP.

Docs: https://docs.dataforseo.com/v3/
Endpoints used (all POST, HTTP Basic auth):
  keywords_data/google_ads/search_volume/live
  dataforseo_labs/google/bulk_keyword_difficulty/live
  dataforseo_labs/google/keyword_suggestions/live
  serp/google/organic/live/advanced
"""
import hashlib
from itertools import islice

import pandas as pd
import requests
from requests.auth import HTTPBasicAuth
from tenacity import retry, stop_after_attempt, wait_exponential

from . import cache, cached, cfg, env, has, write_df

BASE = "https://api.dataforseo.com/v3"
AUTH = None  # set in run()


def _key(*parts) -> str:
    return "dfs_" + hashlib.md5("|".join(map(str, parts)).encode()).hexdigest()[:16]


@retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=30))
def _post(path: str, payload: list) -> dict:
    r = requests.post(f"{BASE}/{path}", json=payload, auth=AUTH, timeout=120)
    r.raise_for_status()
    j = r.json()
    if j.get("status_code") != 20000:
        raise RuntimeError(f"DataForSEO {path}: {j.get('status_message')}")
    return j


def _chunks(seq, n):
    it = iter(seq)
    while batch := list(islice(it, n)):
        yield batch


def volumes(keywords, location_code, language):
    out = {}
    for batch in _chunks(sorted(set(keywords)), 700):
        ck = _key("vol", location_code, *batch)
        j = cached(ck) or cache(ck, _post(
            "keywords_data/google_ads/search_volume/live",
            [{"keywords": batch, "location_code": location_code, "language_code": language}],
        ))
        for res in (j["tasks"][0].get("result") or []):
            out[res["keyword"]] = {
                "search_volume": res.get("search_volume"),
                "cpc": res.get("cpc"),
                "competition": res.get("competition"),
                "competition_index": res.get("competition_index"),
            }
    return out


def difficulty(keywords, location_code, language):
    out = {}
    for batch in _chunks(sorted(set(keywords)), 700):
        ck = _key("kd", location_code, *batch)
        j = cached(ck) or cache(ck, _post(
            "dataforseo_labs/google/bulk_keyword_difficulty/live",
            [{"keywords": batch, "location_code": location_code, "language_code": language}],
        ))
        for item in (j["tasks"][0]["result"][0].get("items") or []):
            out[item["keyword"]] = item.get("keyword_difficulty")
    return out


def suggestions(seed, location_code, language, limit=50):
    ck = _key("sugg", location_code, seed, limit)
    j = cached(ck) or cache(ck, _post(
        "dataforseo_labs/google/keyword_suggestions/live",
        [{"keyword": seed, "location_code": location_code,
          "language_code": language, "limit": limit}],
    ))
    rows = []
    for item in (j["tasks"][0]["result"][0].get("items") or []):
        ki = item.get("keyword_info") or {}
        rows.append({
            "keyword": item.get("keyword"),
            "seed": seed,
            "search_volume": ki.get("search_volume"),
            "cpc": ki.get("cpc"),
            "competition": ki.get("competition"),
        })
    return rows


def serp_top(keyword, location_code, language, depth=10):
    ck = _key("serp", location_code, keyword)
    j = cached(ck) or cache(ck, _post(
        "serp/google/organic/live/advanced",
        [{"keyword": keyword, "location_code": location_code,
          "language_code": language, "depth": depth}],
    ))
    rows = []
    for item in (j["tasks"][0]["result"][0].get("items") or []):
        if item.get("type") == "organic":
            rows.append({
                "keyword": keyword,
                "rank": item.get("rank_group"),
                "domain": item.get("domain"),
                "url": item.get("url"),
                "title": item.get("title"),
            })
    return rows


def run():
    global AUTH
    if not has("DATAFORSEO_LOGIN", "DATAFORSEO_PASSWORD"):
        print("  [skip] DataForSEO keys missing")
        return
    AUTH = HTTPBasicAuth(env("DATAFORSEO_LOGIN"), env("DATAFORSEO_PASSWORD"))
    c = cfg()
    lang = c["language"]

    seeds = c["head_terms"] + c["publisher_terms"] + c["employer_terms"]
    # expand a subset with intent modifiers
    expanded = seeds + [f"{t} {m}" for t in c["head_terms"] + c["publisher_terms"]
                        for m in c["intent_modifiers"]]

    all_rows, serp_rows, sugg_rows = [], [], []
    for geo, meta in c["geographies"].items():
        loc = meta["location_code"]
        print(f"  · {geo}: volumes + difficulty for {len(set(expanded))} keywords")
        vol = volumes(expanded, loc, lang)
        kd = difficulty(list(vol.keys()), loc, lang)
        for kw, v in vol.items():
            all_rows.append({"geo": geo, "keyword": kw, **v,
                             "keyword_difficulty": kd.get(kw)})
        # long-tail expansion from head terms
        for seed in c["head_terms"]:
            sugg_rows += [{"geo": geo, **r} for r in suggestions(seed, loc, lang, 50)]
        # who ranks for the top head + publisher terms (incumbent map)
        for kw in c["head_terms"] + c["publisher_terms"]:
            serp_rows += [{"geo": geo, **r} for r in serp_top(kw, loc, lang, 10)]

    write_df("keywords.csv", pd.DataFrame(all_rows))
    write_df("keyword_suggestions.csv", pd.DataFrame(sugg_rows))
    serp_df = pd.DataFrame(serp_rows)
    write_df("serp_rankers.csv", serp_df)
    if not serp_df.empty:
        top = (serp_df.groupby("domain").size()
               .sort_values(ascending=False).head(25)
               .rename("appearances").reset_index())
        write_df("serp_top_domains.csv", top)


if __name__ == "__main__":
    run()
