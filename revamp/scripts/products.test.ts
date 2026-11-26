import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { catalogue, comingSoon } from "../src/data/catalogue";
import { searchIndex } from "../src/lib/solution-search";

const ids = (items: { id: string }[]) => items.map((item) => item.id);

test("K-Klassified is withdrawn completely", () => {
  assert.equal(ids(catalogue).includes("k-klassified"), false);
  assert.equal(ids(comingSoon).includes("k-klassified"), false);
  // It must not survive in search, artwork or the data file.
  assert.equal(
    searchIndex.some((item) => item.id === "k-klassified"),
    false,
  );
  assert.equal(
    readFileSync("src/data/catalogue.ts", "utf8").includes("Klassified"),
    false,
  );
});

test("K-Cab is coming soon, not on sale", () => {
  // In development: not in the catalogue or search, only on /coming-soon.
  assert.equal(ids(catalogue).includes("k-cab"), false);
  assert.equal(searchIndex.some((item) => item.id === "k-cab"), false);
  const cab = comingSoon.find((item) => item.id === "k-cab");
  assert.ok(cab, "K-Cab is listed as coming soon");
  assert.equal(cab.comingSoon, true);
  // The description now names bike and taxi booking, not cab booking.
  assert.match(cab.line, /bike and taxi booking/i);
  assert.doesNotMatch(cab.line, /^cab booking/i);
  // No outbound product page: nothing to send people to yet.
  assert.equal(cab.href, undefined);
});

test("coming-soon entries never leak into the catalogue or search", () => {
  for (const item of comingSoon) {
    assert.equal(ids(catalogue).includes(item.id), false, `${item.id} in catalogue`);
    assert.equal(
      searchIndex.some((entry) => entry.id === item.id),
      false,
      `${item.id} in search`,
    );
    assert.equal(item.comingSoon, true);
  }
});
