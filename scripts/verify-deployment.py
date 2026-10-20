#!/usr/bin/env python3
"""Fail unless the exact deployment, article diagrams, and discovery links are live."""
import argparse
import html
import json
import re
import time
from urllib.request import Request, urlopen

BASE = 'https://lrinfosec.com'

def fetch(path, commit):
    request = Request(BASE + path + '?release=' + commit, headers={'User-Agent':'LR-InfoSec-release-verification/1.0','Cache-Control':'no-cache'})
    with urlopen(request, timeout=30) as response:
        if response.status != 200:
            raise RuntimeError(f'{path}: HTTP {response.status}')
        return response.read().decode('utf-8')

def verify(commit):
    release = json.loads(fetch('/release.json', commit))
    if release['commit'] != commit:
        raise RuntimeError('Live release marker does not match the deployed commit')
    home, index = fetch('/', commit), fetch('/articles/', commit)
    for article in release['articles']:
        page = fetch(article['path'], commit)
        text = html.unescape(re.sub('<[^>]+>', ' ', page))
        if article['title'] not in text or 'approved-architecture' not in page:
            raise RuntimeError(f"{article['path']}: article title or architecture diagram absent")
        if article['path'] not in index:
            raise RuntimeError(f"{article['path']}: article index link absent")
    if release['articles'] and release['articles'][-1]['path'] not in home:
        raise RuntimeError('Homepage latest-article link absent')
    return release

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--commit', required=True)
    parser.add_argument('--attempts', type=int, default=8)
    args = parser.parse_args()
    for attempt in range(args.attempts):
        try:
            result = verify(args.commit)
            print(json.dumps({'verified':True, **result}, indent=2))
            return
        except Exception as error:
            print(f'Verification attempt {attempt+1}/{args.attempts}: {error}', flush=True)
            if attempt + 1 == args.attempts:
                raise
            time.sleep(15)

if __name__ == '__main__':
    main()
