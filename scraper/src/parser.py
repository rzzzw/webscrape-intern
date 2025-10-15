from bs4 import BeautifulSoup
from urllib.parse import urljoin

def parse_quotes_page(html: str, base_url: str):
    soup = BeautifulSoup(html, "html.parser")
    quotes = []
    next_btn = soup.select_one(".pager .next a")

    for q in soup.select(".quote"):
        text = q.select_one(".text").get_text(strip=True)
        author = q.select_one(".author").get_text(strip=True)
        tags = [t.get_text(strip=True) for t in q.select(".tags .tag")]
        author_url = urljoin(base_url, q.select_one("span a")["href"])
        quotes.append({
            "quote": text,
            "author": author,
            "tags": tags,
            "url": author_url
        })

    next_url = urljoin(base_url, next_btn["href"]) if next_btn else None
    return quotes, next_url

