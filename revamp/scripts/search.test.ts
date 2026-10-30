import assert from "node:assert/strict";
import { test } from "node:test";
import {
  normalizeSearch,
  searchIndex,
  searchSolutions,
} from "../src/lib/solution-search";

test("normalizes case, punctuation, spacing and accents", () => {
  assert.equal(normalizeSearch("  K-SMÁRT  "), "k smart");
});
test("finds featured products by name, alias and use case", () => {
  assert.equal(searchSolutions("Kastrofy")[0]?.id, "kastrofy");
  assert.equal(searchSolutions("K-SMART")[0]?.id, "whatsapp-crm");
  assert.equal(searchSolutions("school fees")[0]?.id, "k-edusity");
  assert.equal(searchSolutions("online exams")[0]?.id, "k-exam");
  assert.equal(searchSolutions("attendence")[0]?.id, "k-edusity");
});
test("searches the whole catalogue and returns multiple relevant matches", () => {
  const matches = searchSolutions("school management").map((item) => item.id);
  assert.ok(matches.includes("k-edusity"));
  assert.ok(matches.includes("k-academics"));
  assert.equal(searchSolutions("restaurant POS")[0]?.id, "k-restro");
  assert.equal(new Set(matches).size, matches.length);
});
test("empty queries show featured products and unknown terms show no matches", () => {
  assert.equal(searchSolutions(" ").length, 5);
  assert.deepEqual(searchSolutions("zzzxxyy123"), []);
});
test("all entries have keywords and only real routes, anchors or existing URLs", () => {
  assert.equal(searchIndex.length, 40);
  for (const item of searchIndex) {
    assert.ok(item.keywords.length);
    assert.ok(
      item.href.startsWith("https://") || item.href.startsWith("/solutions/#"),
    );
  }
  assert.equal(
    searchSolutions("Kastrofy")[0].href,
    "/solutions/#solution-kastrofy",
  );
  assert.equal(searchSolutions("K-Cab")[0].href, "/solutions/#catalogue-k-cab");
});
