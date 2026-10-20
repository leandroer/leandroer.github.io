#!/usr/bin/env python3
"""Apply per-page hash-based CSP to a GitHub Pages static export."""
import base64
import hashlib
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

def digest(value):
    return "'sha256-" + base64.b64encode(hashlib.sha256(value.encode()).digest()).decode() + "'"

class Markup(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.styles = set()
        self.scripts = set()
        self.style_blocks = set()
        self.capture = None
        self.chunks = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'style' in attrs:
            self.styles.add(digest(attrs['style']))
        if tag == 'script' and attrs.get('src'):
            src = attrs['src']
            if re.match(r'[a-zA-Z][a-zA-Z0-9+.-]*:', src) or src.startswith('//') or '\\' in src:
                raise ValueError('Unexpected nonlocal script source')
        if tag in ('script', 'style') and not attrs.get('src'):
            self.capture = tag
            self.chunks = []
        if any(name.lower().startswith('on') for name in attrs):
            raise ValueError('Inline event handlers are prohibited')

    def handle_data(self, value):
        if self.capture:
            self.chunks.append(value)

    def handle_endtag(self, tag):
        if tag == self.capture:
            target = self.scripts if tag == 'script' else self.style_blocks
            target.add(digest(''.join(self.chunks)))
            self.capture = None
            self.chunks = []

def harden(source):
    if re.search(r'http-equiv=["\']Content-Security-Policy', source, re.I):
        raise ValueError('Export already contains CSP; do not silently stack policies')
    markup = Markup()
    markup.feed(source)
    markup.close()
    if markup.capture:
        raise ValueError('Unclosed active-content tag in export')
    scripts = markup.scripts
    styles = markup.style_blocks
    policy = "; ".join([
        "default-src 'none'",
        "script-src 'self' " + ' '.join(sorted(scripts)),
        "style-src 'self' " + ' '.join(sorted(styles)),
        "style-src-attr 'unsafe-hashes' " + ' '.join(sorted(markup.styles)) if markup.styles else "style-src-attr 'none'",
        "img-src 'self' data:", "font-src 'self'", "connect-src 'self'",
        "object-src 'none'", "frame-src 'none'", "base-uri 'self'",
        "form-action 'none'", "upgrade-insecure-requests",
    ])
    head = re.search(r'<head\b[^>]*>\s*(?:<meta\b[^>]*charset[^>]*>)?', source, re.I)
    if not head:
        raise ValueError('Missing document head')
    tag = '<meta http-equiv="Content-Security-Policy" content="' + escape(policy, quote=True) + '"/>'
    return source[:head.end()] + tag + source[head.end():]

def main():
    paths = sorted((ROOT / 'out').rglob('*.html'))
    if not paths:
        raise ValueError('Static export is missing')
    for path in paths:
        path.write_text(harden(path.read_text()))
    print(f'Applied hash-based CSP to {len(paths)} exported HTML pages.')

if __name__ == '__main__':
    main()
