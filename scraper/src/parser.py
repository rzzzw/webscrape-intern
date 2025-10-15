from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re

def parse_quotes_page(html: str, base_url: str):
    soup = BeautifulSoup(html, "html.parser")
    quotes = []
    next_btn = soup.select_one(".pager .next a")
    next_href = next_btn["href"]
    cur_href = decrement_page_number_re(next_href)
    quote_page_url = urljoin(base_url, cur_href)

    for q in soup.select(".quote"):
        text = q.select_one(".text").get_text(strip=True)
        author = q.select_one(".author").get_text(strip=True)
        tags = [t.get_text(strip=True) for t in q.select(".tags .tag")]
        author_url = urljoin(base_url, q.select_one("span a")["href"])
        quotes.append({
            "quote": text,
            "author": author,
            "tags": tags,
            "quote_page_url": quote_page_url,
            "url": author_url
        })

    next_url = urljoin(base_url, next_btn["href"]) if next_btn else None
    return quotes, next_url


def decrement_page_number_re(href_string):
    pattern = r"/page/(\d+)/"
    match = re.search(pattern, href_string)
    if match:
        current_number = int(match.group(1))
        new_number = current_number - 1
        return re.sub(pattern, f"/page/{new_number}/", href_string)
    return href_string
