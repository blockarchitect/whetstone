"""Run the full research pipeline (or a single module).

Usage:
  python run_all.py                    # everything you have keys for
  python run_all.py --only keywords    # keywords | trends | jobs | reddit | similarweb | crunchbase
"""
import argparse
import sys
import time

from pulls import dataforseo_keywords, free_sources, paid_sources


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", choices=["keywords", "trends", "jobs", "reddit",
                                       "similarweb", "crunchbase", "free", "paid"])
    args = ap.parse_args()

    steps = {
        "keywords":   dataforseo_keywords.run,
        "trends":     free_sources.trends,
        "jobs":       free_sources.jobs,
        "reddit":     free_sources.reddit,
        "similarweb": paid_sources.similarweb,
        "crunchbase": paid_sources.crunchbase,
        "free":       free_sources.run,
        "paid":       paid_sources.run,
    }

    order = (["keywords", "free", "paid"] if not args.only else [args.only])
    t0 = time.time()
    for name in order:
        print(f"\n=== {name} ===")
        try:
            steps[name]()
        except Exception as e:
            print(f"  !! {name} failed: {e}", file=sys.stderr)
    print(f"\nDone in {time.time()-t0:.0f}s. Data in ./data — now run report/build_report.py")


if __name__ == "__main__":
    main()
