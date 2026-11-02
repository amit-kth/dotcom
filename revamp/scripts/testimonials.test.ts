import assert from "node:assert/strict";
import { test } from "node:test";
import { platformRatings, testimonials, videoTestimonials } from "../src/data/site-content";
import { Assetsbaseurl } from "../src/config/variables";

test("platform ratings retain the supplied scores and real review links", () => {
  assert.deepEqual(platformRatings.map(({ title, starCount }) => [title, starCount]), [
    ["Google", 4.2], ["Ambition Box", 4.6], ["Clutch", 5],
  ]);
  for (const item of platformRatings) {
    assert.ok(item.href.startsWith("https://"));
    assert.ok(item.platformLogo.startsWith(`${Assetsbaseurl}/`));
    assert.ok(item.starCount >= 0 && item.starCount <= 5);
  }
});

test("new Clutch reviews keep their supplied text and individual source links", () => {
  const expected = [
    ["Radhika Aggarwal", "I'm impressed by their support and hard work.", "346445"],
    ["Noora Fateh", "I was impressed by their conduct and collaborations during the entire project.", "400553"],
    ["Mr. Khetpal Singh", "What truly stands out is the way their team works.", "404675"],
  ];
  for (const [name, quote, reviewId] of expected) {
    const item = testimonials.find((review) => review.name === name)!;
    assert.equal(item.quote, quote);
    assert.equal(item.excerpt, quote);
    assert.equal(item.source, "Clutch");
    assert.ok(item.sourceLink?.endsWith(reviewId));
    assert.ok(item.logo.startsWith(`${Assetsbaseurl}/`));
  }
  for (const name of ["Vikash Kunta", "Sudha Agarwal", "Kratant Sharma"]) {
    assert.ok(testimonials.some((item) => item.name === name), "Keep existing client feedback");
  }
  assert.equal(new Set(testimonials.map((item) => item.id)).size, testimonials.length);
});

test("video testimonials use the three supplied YouTube embeds and ImageKit thumbnails", () => {
  assert.deepEqual(videoTestimonials.map((item) => item.videoLink), [
    "https://www.youtube.com/embed/mS6w6YDqrrM",
    "https://www.youtube.com/embed/LA6eE_KCKO0",
    "https://www.youtube.com/embed/1kITFCOS8LU",
  ]);
  for (const item of videoTestimonials) {
    assert.ok(item.name && item.role);
    assert.ok(item.thumbnail.startsWith(`${Assetsbaseurl}/tempAssets/clientsImages/`));
  }
});
