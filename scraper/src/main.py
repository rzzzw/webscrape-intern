import argparse, json, os, uuid
from .robots import check_robots_txt
from .fetcher import fetch
from .parser import parse_quotes_page

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", required=True)
    parser.add_argument("--max-pages", type=int, default=5)
    parser.add_argument("--delay-ms", type=int, default=700)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    os.makedirs("scraper/data", exist_ok=True)
    check_robots_txt(args.start)

    visited = set()
    next_url = args.start
    count = 0

    # output_path = "scraper/data/items.jsonl"
    output_path = "ui/public/data/items.jsonl"
    f = open(output_path, "w", encoding="utf-8") if not args.dry_run else None

    while next_url and count < args.max_pages:
        if next_url in visited:
            print(f"[crawl] Already visited {next_url}, skipping.")
            break

        print(f"[crawl] Fetching page {count+1}: {next_url}")
        html = fetch(next_url, args.delay_ms)
        if not html:
            break

        quotes, next_page_url = parse_quotes_page(html, args.start)
        visited.add(next_url)

        if args.dry_run:
            print(f"[dry-run] Found {len(quotes)} quotes")
        else:
            for q in quotes:
                # Add a unique ID to the quote dictionary
                q["id"] = str(uuid.uuid4())
                f.write(json.dumps(q, ensure_ascii=False) + "\n")
        next_url = next_page_url
        count += 1

    if f:
        f.close()
    print(f"[done] Crawled {count} pages")

if __name__ == "__main__":
    main()