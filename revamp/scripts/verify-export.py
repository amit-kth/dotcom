"""Audit built HTML and compare homepage metadata with the unchanged legacy site."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import json
import re
import struct

ROOT = Path(__file__).resolve().parents[2]
PROJECT = ROOT / "revamp"


class Document(HTMLParser):
    def __init__(self, check_images=True):
        super().__init__()
        self.check_images = check_images
        self.title = ""
        self.titles = 0
        self.canonicals = []
        self.links = []
        self.meta = {}
        self.schemas = []
        self.loaders = 0
        self.images = []
        self.headings = []
        self.ids = []
        self.capture = None
        self.script = None
        self.content = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "title":
            self.titles += 1
            self.capture = (tag, "")
        if re.fullmatch(r"h[1-6]", tag):
            self.capture = (tag, "")
        if tag == "link":
            self.links.append(attrs)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        if tag == "meta":
            key = attrs.get("name") or attrs.get("property")
            if key:
                self.meta.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "img":
            if self.check_images:
                assert "alt" in attrs, "Image missing alt attribute"
            self.images.append(attrs.get("src", ""))
        if tag == "script":
            self.script = attrs
            self.content = ""

    def handle_data(self, text):
        if self.script is not None:
            self.content += text
        elif self.capture:
            self.capture = (self.capture[0], self.capture[1] + text)

    def handle_endtag(self, tag):
        if self.capture and self.capture[0] == tag:
            text = " ".join(self.capture[1].split())
            if tag == "title":
                self.title = text
            else:
                self.headings.append((tag, text))
            self.capture = None
        if tag == "script" and self.script is not None:
            if self.script.get("type") == "application/ld+json":
                self.schemas.append(json.loads(self.content))
            if "www.googletagmanager.com/gtm.js" in self.content:
                self.loaders += 1
            self.script = None


def read(path, check_images=True):
    doc = Document(check_images)
    doc.feed(path.read_text())
    return doc


legacy = read(ROOT / "index.php", check_images=False)
for name, route in [("index.html", "/"), ("contact/index.html", "/contact/"), ("solutions/index.html", "/solutions/")]:
    page = read(PROJECT / "out" / name)
    assert page.titles == 1 and page.title, (name, "title")
    assert page.canonicals == [f"https://www.kriscent.com{route}"], page.canonicals
    for key in ["description", "author", "keywords", "viewport", "og:title", "og:description", "og:type", "og:url", "og:image", "twitter:card", "twitter:site", "twitter:title", "twitter:description", "twitter:image"]:
        assert len(page.meta.get(key, [])) == 1 and page.meta[key][0], (name, key)
    assert not any("noindex" in value for value in page.meta.get("robots", [])), name
    assert "user-scalable=no" not in page.meta["viewport"][0], "Keep accessible zoom"
    assert page.loaders == 1, (name, "duplicate GTM loader")
    assert "GTM-TDFV5SJ4" in (PROJECT / "out" / name).read_text()
    assert Counter(schema["@type"] for schema in page.schemas) == Counter(["Organization", "WebSite", "WebPage"])
    assert "reviewRating" not in json.dumps(page.schemas), "Do not copy placeholder ratings"
    assert len([text for tag, text in page.headings if tag == "h1"]) == 1, (name, "H1 count")
    assert all(text for _, text in page.headings), (name, "empty heading")
    assert len(page.ids) == len(set(page.ids)), (name, "duplicate HTML IDs")
    for image in page.images + page.meta["og:image"]:
        path = urlparse(image).path
        if image.startswith("/") or image in page.meta["og:image"]:
            assert (PROJECT / "out" / path.lstrip("/")).is_file(), (name, image)
    assert page.meta["og:image:width"] == ["1200"]
    assert page.meta["og:image:height"] == ["630"]
    assert page.meta["og:image:alt"][0]
    for size in [16, 32, 48]:
        assert any(link.get("rel") == "icon" and link.get("sizes") == f"{size}x{size}" for link in page.links)
    assert any(link.get("rel") == "apple-touch-icon" for link in page.links)
    assert any(link.get("rel") == "manifest" and link.get("href") == "/site.webmanifest" for link in page.links)
    for link in page.links:
        if link.get("rel") in {"icon", "apple-touch-icon", "manifest"}:
            assert (PROJECT / "out" / urlparse(link["href"]).path.lstrip("/")).is_file(), link
    assert page.meta["twitter:card"] == ["summary_large_image"]
    assert page.meta["og:image"] == ["https://www.kriscent.com/images/og-kriscent.jpg"]
    assert page.meta["twitter:image"] == page.meta["og:image"]
    print(f"{name}: metadata, schemas, headings, image paths and GTM PASS")

    if route == "/":
        assert page.title == legacy.title
        for key in ["description", "author", "keywords", "og:title", "og:site_name", "og:url", "og:description", "og:type", "twitter:site", "twitter:title", "twitter:description"]:
            assert page.meta[key] == legacy.meta[key], (key, page.meta[key], legacy.meta[key])
        old_schema = legacy.schemas[0]
        new_schema = next(schema for schema in page.schemas if schema["@type"] == "WebPage")
        for key in ["name", "url", "description"]:
            assert new_schema[key] == old_schema[key], key
        print("Legacy text metadata matches; social image/card intentionally refreshed; placeholder ratings excluded")

for file in ["robots.txt", "sitemap.xml", "404.html", "images/og-kriscent.jpg", "site.webmanifest", "favicon.ico", "apple-touch-icon.png", "icons/favicon-16x16.png", "icons/favicon-32x32.png", "icons/favicon-48x48.png", "icons/icon-192.png", "icons/icon-512.png"]:
    assert (PROJECT / "out" / file).is_file(), f"Missing export: {file}"
sitemap = (PROJECT / "out/sitemap.xml").read_text()
for route in ["/", "/solutions/", "/contact/"]:
    assert f"<loc>https://www.kriscent.com{route}</loc>" in sitemap
print("Static discovery files and 404 page PASS")

manifest = json.loads((PROJECT / "out/site.webmanifest").read_text())
for icon in manifest["icons"]:
    assert (PROJECT / "out" / icon["src"].lstrip("/")).is_file()
for name, size in [("icons/favicon-16x16.png", 16), ("icons/favicon-32x32.png", 32), ("icons/favicon-48x48.png", 48), ("icons/icon-192.png", 192), ("icons/icon-512.png", 512), ("apple-touch-icon.png", 180)]:
    data = (PROJECT / "out" / name).read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    assert struct.unpack(">II", data[16:24]) == (size, size), name
ico = (PROJECT / "out/favicon.ico").read_bytes()
assert struct.unpack("<HHH", ico[:6]) == (0, 1, 3)
assert [ico[6 + index * 16] for index in range(3)] == [16, 32, 48]
print("Social image dimensions/tags, manifest links and multi-size icons PASS")
