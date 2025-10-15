from scraper.src.parser import parse_quotes_page


def test_parse_quotes_page():
    html = open("scraper/tests/fixtures/quotes_page.html", encoding="utf-8").read()
    actual_quotes, actual_next_url = parse_quotes_page(html, "https://quotes.toscrape.com")

    # Debug prints
    print("QUOTES:", actual_quotes)
    print(len(actual_quotes))
    print("NEXT URL:", actual_next_url)

    # Basic checks




