"""Run after npm run build; checks actual HTML tags, not embedded RSC payloads."""
from html.parser import HTMLParser
from pathlib import Path
import json

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.titles = self.canonicals = self.loaders = 0
        self.schemas = []
        self.script = None
        self.content = ''
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title': self.titles += 1
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonicals += 1
        if tag == 'script': self.script = attrs; self.content = ''
    def handle_data(self, text):
        if self.script is not None: self.content += text
    def handle_endtag(self, tag):
        if tag != 'script' or self.script is None: return
        if self.script.get('type') == 'application/ld+json':
            self.schemas.append(json.loads(self.content)['@type'])
        # next/script's afterInteractive bootstrap has one GTM loader.
        if 'www.googletagmanager.com/gtm.js' in self.content: self.loaders += 1
        self.script = None

for name in ['index.html', 'contact/index.html', 'solutions/index.html']:
    page = Document()
    page.feed(Path('out', name).read_text())
    assert (page.titles, page.canonicals, page.loaders) == (1, 1, 1), vars(page)
    assert page.schemas == ['Organization', 'WebSite'], page.schemas
    print(f'{name}: one title, one canonical, one GTM loader, one schema per type — PASS')
