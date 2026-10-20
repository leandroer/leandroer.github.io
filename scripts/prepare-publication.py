#!/usr/bin/env python3
"""Validate exact approved sources and prepare a deterministic dated static export."""
import argparse
import hashlib
import json
import os
from datetime import datetime
from pathlib import Path
import shutil
import subprocess
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]

def approved_due(root=ROOT, today=None):
    manifest = json.loads((root / 'publishing/approved.json').read_text())
    today = today or datetime.now(ZoneInfo('America/New_York')).date().isoformat()
    due, future = [], []
    seen = set()
    for article in manifest['articles']:
        slug = article['slug']
        if not slug or any(c not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for c in slug) or slug in seen:
            raise ValueError('Invalid or duplicate article slug')
        seen.add(slug)
        source = root / f'app/articles/{slug}/page.tsx'
        if article['source'] != source.relative_to(root).as_posix() or article['path'] != f'/articles/{slug}/':
            raise ValueError(f'{slug}: inconsistent paths')
        if not article.get('approval', {}).get('turnId'):
            raise ValueError(f'{slug}: missing explicit approval record')
        datetime.strptime(article['date'], '%Y-%m-%d')
        if hashlib.sha256(source.read_bytes()).hexdigest() != article['sourceSHA256']:
            raise ValueError(f'{slug}: approved source changed; review and renew approval hash')
        (due if article['date'] <= today else future).append(article)
    return due, future

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prepare', action='store_true')
    args = parser.parse_args()
    due, future = approved_due()
    if args.prepare:
        # CI/local isolated checkout only: prevent future approved routes being
        # exported early. The catalog independently filters them by the same date.
        for article in future:
            shutil.rmtree(ROOT / 'app/articles' / article['slug'])
        commit = os.environ.get('GITHUB_SHA') or subprocess.check_output(['git','rev-parse','HEAD'], cwd=ROOT, text=True).strip()
        (ROOT / 'public/release.json').write_text(json.dumps({'commit':commit,'articles':[{'path':a['path'],'title':a['title'],'sourceSHA256':a['sourceSHA256']} for a in due]}, indent=2)+'\n')
    print(f'Approved publication sources validated: {len(due)} due, {len(future)} future.')

if __name__ == '__main__':
    main()
