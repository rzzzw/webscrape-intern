# 🕷️ Scraper

This is the Python scraper that collects quotes from the public site [Quotes to Scrape](https://quotes.toscrape.com).

---

## ⚙️ Setup

**Requirements:** Python 3.9+  

Install dependencies:
```bash
pip install -r requirements.txt
```

## ▶️ Run a crawl:
```bash
python src/main.py \
  --start=https://quotes.toscrape.com \
  --max-pages=3 \
  --delay-ms=800
```

Flags:
- `--dry-run`: log URLs without saving data  
- `--max-pages`: limit crawl depth  
- `--delay-ms`: polite delay between requests  

The results will be saved to:
```
ui/public/data/items.jsonl
```

Example record:
```json
{
  "quote": "Life is what happens to us while we are making other plans.",
  "author": "Allen Saunders",
  "tags": ["life", "plans"],
  "quote_page_url": "https://quotes.toscrape.com/page/2/",
  "author_url": "https://quotes.toscrape.com/author/Allen-Saunders"
}
```


## 🧪 Tests
Run unit tests for the scraper:
```bash
pytest
```

Includes:
- `test_parser.py`: ensures HTML → structured data parsing  
- Integration test: checks pagination and “Next” button logic  

Fixtures in `tests/fixtures/` simulate saved HTML page for reproducible test.


## ⚖️ Robots & Politeness
- The scraper respects [robots.txt](https://quotes.toscrape.com/robots.txt) (allowed).  
- Custom User-Agent used:  
  ```
  "QuotesScraperBot/1.0 (https://github.com/rzzzw/webscrape-intern)"
  ```
- Default delay: 500–1500 ms between requests.  