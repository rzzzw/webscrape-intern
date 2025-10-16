import time, requests
from requests.exceptions import RequestException

def fetch(url: str, delay_ms: int, retries=3):
    for i in range(retries):
        try:
            headers = {"User-Agent": "QuotesScraperBot/1.0 (contact: rzzzw88@gmail.com)"}
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                time.sleep(delay_ms / 1000.0)
                return resp.text
            else:
                print(f"[fetch] Non-200 {resp.status_code} for {url}")
        except RequestException as e:
            print(f"[fetch] Error: {e}, retrying ({i+1}/{retries})")
            time.sleep((2 ** i) * 0.5)
    return None