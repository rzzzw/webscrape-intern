# 🕸️ Web Scraping + Mini UI Exercise  
**Target site:** [Quotes to Scrape](https://quotes.toscrape.com)


## 📖 Overview
This project demonstrates a simple **end-to-end web scraping pipeline**:  
1. A **Python scraper** that crawls quotes from a public website and stores structured data.  
2. A lightweight **React UI** that visualizes and explores the scraped results.  

It’s intentionally built to be easy to run, understand, and extend.


## 📁 Project Structure
```
webscrape-intern/
  scraper/
    src/
      main.py          # Entry point for scraper
      fetcher.py       # Handles HTTP requests, retries, delay
      parser.py        # Extracts quotes, authors, tags from HTML
      robots.py        # Checks robots.txt and enforces polite crawling
    tests/
      fixtures/        # HTML fixtures for parser tests
      test_parser.py   # Unit tests for parsing logic
    data/
      items.jsonl      # Generated scraped data
    README.md
  ui/
    src/
      App.tsx          # Main React app
      components/
        Table.tsx      # Displays quotes in a table
        Filters.tsx    # Tag filter & search bar
        Chart.tsx      # Simple bar chart visualization
      lib/loadData.ts  # Loads JSONL data
    public/data/items.jsonl  # Copied from scraper/data after crawling
    README.md
  README.md             # (this file)
```


## ⚙️ Setup & Run

### 🐍 1. Scraper (Python)
**Requirements:** Python 3.9+  
Install dependencies:
```bash
cd scraper
pip install -r requirements.txt
```

Run a small crawl:
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

### 💻 2. UI (React + Vite)
**Requirements:** Node.js 18+

```bash
cd ui
npm install
npm run dev
```

Then open the app in your browser at:
```
http://localhost:5173
```


Features:
- 🔍 Search quotes by keyword  
- 🏷️ Filter by tag  
- ↕ Sort by author  
- 📊 Bar chart of top tags  
- 📄 Click row → show quote details
- ⏭️ Client pagination


## 🧪 Tests
Run unit tests for the scraper:
```bash
pytest
```

Includes:
- `test_parser.py`: ensures HTML → structured data parsing  
- Integration test: checks pagination and “Next” button logic  

Fixtures in `tests/fixtures/` simulate saved HTML page for reproducible test.


## 🧩 Design Decisions
- **Libraries:** `httpx` + `beautifulsoup4` for simple HTML parsing.  
- **No headless browser:** site is static, no JS rendering required.  
- **JSONL format:** easy to append, stream, and reload in frontend.  
- **Frontend:** Vite + React for speed and simplicity.  


## 🚀 Future Improvements
- Resume crawl support (skip already-scraped URLs).  
- Concurrent fetching with a small async queue.  
- Backend API endpoint to serve fresh data dynamically.
- Unit tests for rate-limiting and retry logic.


## ⚖️ Robots & Politeness
- The scraper respects [robots.txt](https://quotes.toscrape.com/robots.txt) (allowed).  
- Custom User-Agent used:  
  ```
  "QuotesScraperBot/1.0 (https://github.com/rzzzw/webscrape-intern)"
  ```
- Default delay: 500–1500 ms between requests.  