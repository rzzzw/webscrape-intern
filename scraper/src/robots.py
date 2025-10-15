import requests
from urllib.parse import urljoin

def check_robots_txt(base_url: str):
    robots_url = urljoin(base_url, "/robots.txt")
    try:
        resp = requests.get(robots_url, timeout=5)
        if resp.status_code == 200:
            print(f"[robots] Found robots.txt at {robots_url}")
            print(resp.text)
        else:
            print(f"[robots] No robots.txt found at {robots_url}")
    except Exception as e:
        print(f"[robots] Error fetching robots.txt: {e}")