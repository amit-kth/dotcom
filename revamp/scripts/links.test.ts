import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { featuredProducts } from "../src/data/products";
import { contact } from "../src/config/variables";

const header = readFileSync("src/components/site-header.tsx", "utf8");

test("every navbar product links to its own site, in a new tab", () => {
  // Each featured product is a real product site from the old site.
  for (const product of featuredProducts) {
    assert.match(product.href ?? "", /^https:\/\//, `${product.name} needs a URL`);
  }
  // The header renders them through one component that opens a new tab.
  assert.match(header, /<ProductNavLink/);
  assert.match(header, /target="_blank"/);
  assert.match(header, /rel="noopener noreferrer"/);
  assert.match(header, /href=\{product\.href\}/);
  // No product entry points back at the homepage list any more: that scroll
  // was silent whenever the product was filtered out of the visible list.
  const productEntries = header
    .split("<ProductNavLink")
    .slice(1)
    .map((chunk) => chunk.slice(0, chunk.indexOf("</ProductNavLink>")));
  assert.equal(productEntries.length, 2, "desktop panel and mobile menu");
  for (const entry of productEntries) assert.doesNotMatch(entry, /#solutions/);
});

test("every WhatsApp link opens with a prefilled enquiry", () => {
  assert.equal(new URL(contact.whatsapp).hostname, "wa.me");
  assert.equal(new URL(contact.whatsapp).pathname, "/918947027625");
  const text = new URL(contact.whatsapp).searchParams.get("text");
  assert.equal(text, contact.whatsappMessage);
  assert.ok((text ?? "").length > 40, "the message should read as a sentence");
  // One config value feeds the header, footer and contact page.
  for (const file of [
    "src/components/site-header.tsx",
    "src/components/site-footer.tsx",
    "src/app/contact/page.tsx",
  ]) {
    assert.match(
      readFileSync(file, "utf8"),
      /contact\.whatsapp\b/,
      `${file} must use contact.whatsapp`,
    );
  }
});
