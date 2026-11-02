import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mock, test } from "node:test";
import { getOfferProductNames, type Offer } from "../src/data/offer";

const sample: Offer = { id: "test", tone: "new", heading: "Special offer", discount: "20% off", products: "all", cta: "Claim offer" };

test("all and selected names resolve from product data", () => {
  assert.equal(getOfferProductNames(null), "All solutions");
  assert.equal(getOfferProductNames(sample), "All solutions");
  assert.equal(getOfferProductNames({ ...sample, products: ["k-exam", "k-edusity"] }), "K-Exam, K-Edusity");
});

test("wrong product IDs warn in development and do not become customer-facing text", () => {
  const before = process.env.NODE_ENV;
  const warning = mock.method(console, "warn", () => {});
  try {
    Reflect.set(process.env, "NODE_ENV", "development");
    assert.equal(getOfferProductNames({ ...sample, products: ["wrong-id", "k-exam"] }), "K-Exam");
    assert.equal(warning.mock.callCount(), 1);
    assert.match(String(warning.mock.calls[0].arguments[0]), /Unknown product id.*wrong-id/);
    Reflect.set(process.env, "NODE_ENV", "production");
    getOfferProductNames({ ...sample, products: ["wrong-id"] });
    assert.equal(warning.mock.callCount(), 1);
  } finally {
    warning.mock.restore();
    if (before === undefined) Reflect.deleteProperty(process.env, "NODE_ENV");
    else Reflect.set(process.env, "NODE_ENV", before);
  }
});

test("offer text exceeds 4.5:1 across every tone gradient", () => {
  const css = readFileSync("src/app/globals.css", "utf8");
  const color = (name: string) => {
    const hex = css.match(new RegExp(`--offer-${name}: (#\\w{6})`))![1];
    return [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  };
  const luminance = (rgb: number[]) => rgb.map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
  const ink = luminance(color("ink"));
  for (const tone of ["new", "hot", "festive"]) {
    const start = color(`${tone}-start`), end = color(`${tone}-end`);
    for (let step = 0; step <= 100; step++) {
      const background = luminance(start.map((c, i) => c + (end[i] - c) * step / 100));
      assert.ok((Math.max(background, ink) + 0.05) / (Math.min(background, ink) + 0.05) >= 4.5, `${tone}: ${step}%`);
    }
  }
});
