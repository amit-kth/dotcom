import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { catalogue } from "../src/data/catalogue";
import { searchIndex } from "../src/lib/solution-search";

const byId = (id: string) => catalogue.find((item) => item.id === id);

test("K-Klassified is withdrawn completely", () => {
  assert.equal(byId("k-klassified"), undefined);
  assert.equal(
    searchIndex.some((item) => item.id === "k-klassified"),
    false,
  );
  assert.equal(
    readFileSync("src/data/catalogue.ts", "utf8").includes("Klassified"),
    false,
  );
});

test("K-Cab stays in the catalogue, in its original place", () => {
  const ids = catalogue.map((item) => item.id);
  const cab = byId("k-cab");
  assert.ok(cab, "K-Cab must remain a catalogue card");
  // It used to sit between K-Laundry and Car Wash; keep it there.
  assert.equal(ids.indexOf("k-cab"), ids.indexOf("k-laundry") + 1);
  assert.equal(ids[ids.indexOf("k-cab") + 1], "car-wash");
  // Same industry and group as before, so filters behave as they did.
  assert.deepEqual(cab.categories, ["logistics"]);
  assert.equal(cab.group, "Lifestyle");
  // The description names bike and taxi booking, not cab booking.
  assert.match(cab.line, /bike and taxi booking/i);
  assert.doesNotMatch(cab.line, /^cab booking/i);
});

test("only the not-yet-launched card points at /coming-soon", () => {
  const soon = catalogue.filter((item) => item.comingSoon);
  assert.deepEqual(soon.map((item) => item.id), ["k-cab"]);
  // A coming-soon card must not link to a product site.
  assert.equal(soon[0].href, undefined);
  // The card component routes it to the page instead.
  const grid = readFileSync(
    "src/app/solutions/components/catalogue-grid.tsx",
    "utf8",
  );
  assert.match(grid, /item\.comingSoon \?/);
  assert.match(grid, /href="\/coming-soon\/"/);
});

test("the coming-soon page is a single centred title, not a product list", () => {
  const page = readFileSync("src/app/coming-soon/page.tsx", "utf8");
  assert.match(page, /Coming Soon/);
  assert.match(page, /text-center/);
  // It must not render catalogue data.
  assert.doesNotMatch(page, /from "@\/data\/catalogue"/);
  assert.doesNotMatch(page, /\.map\(/);
});
