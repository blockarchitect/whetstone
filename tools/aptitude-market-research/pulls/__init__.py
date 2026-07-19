"""Shared helpers for the research pipeline."""
import json
import os
from pathlib import Path

import yaml
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUTPUT = ROOT / "output"
CACHE = DATA / "_cache"
for d in (DATA, OUTPUT, CACHE):
    d.mkdir(parents=True, exist_ok=True)

load_dotenv(ROOT / ".env")


def cfg() -> dict:
    with open(ROOT / "config" / "keywords.yaml") as f:
        return yaml.safe_load(f)


def env(key: str, default=None):
    v = os.getenv(key)
    return v if v else default


def has(*keys) -> bool:
    """True only if every named env key is present and non-empty."""
    return all(env(k) for k in keys)


def write_json(name: str, obj) -> Path:
    p = DATA / name
    p.write_text(json.dumps(obj, indent=2, default=str))
    print(f"  wrote {p.relative_to(ROOT)}")
    return p


def write_df(name: str, df) -> Path:
    p = DATA / name
    df.to_csv(p, index=False)
    print(f"  wrote {p.relative_to(ROOT)}  ({len(df)} rows)")
    return p


def cached(key: str):
    """Return cached JSON for key, or None."""
    p = CACHE / f"{key}.json"
    if p.exists():
        return json.loads(p.read_text())
    return None


def cache(key: str, obj):
    (CACHE / f"{key}.json").write_text(json.dumps(obj, default=str))
    return obj
