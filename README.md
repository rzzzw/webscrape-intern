Overview

This project demonstrates a simple end-to-end web scraping pipeline:

A Python scraper that crawls quotes from a public website and stores structured data.

A lightweight React UI that visualizes and explores the scraped results.

It’s intentionally built to be easy to run, understand, and extend.

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
