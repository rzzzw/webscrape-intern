from scraper.src.parser import parse_quotes_page
from scraper.src.main import main
from scraper.src import fetcher, parser
import subprocess
import json


def test_parse_quotes_page():
    html = open("scraper/tests/fixtures/quotes_page.html", encoding="utf-8").read()
    actual_quotes, actual_next_url = parse_quotes_page(html, "https://quotes.toscrape.com")

    # Debug prints
    # print("QUOTES:", actual_quotes)
    # print(len(actual_quotes))
    # print("NEXT URL:", actual_next_url)

    # Basic checks
    assert len(actual_quotes) == 10
    q = actual_quotes[0]
    assert "quote" in q
    assert "author" in q
    assert isinstance(q["tags"], list)
    assert actual_next_url.endswith("/page/2/")

    # assert all("quote" in q for q in actual_quotes)
    # assert all("author" in q for q in actual_quotes)



def test_live_crawl_limited():
    subprocess.run([
        "python", "-m", "scraper.src.main",
        "--start=https://quotes.toscrape.com",
        "--max-pages=2",
        "--delay-ms=200"
    ])
    data = [json.loads(l) for l in open("ui/public/data/items.jsonl")]
    assert len(data) > 10
