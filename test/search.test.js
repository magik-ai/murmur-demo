import { test } from "node:test";
import assert from "node:assert/strict";
import { matches } from "../public/search.js";
import { PRODUCTS } from "../public/products.js";

test("exact name matches", () => {
  assert.equal(matches("Cedar candle", "Cedar candle"), true);
});

test("case is ignored", () => {
  assert.equal(matches("Cedar candle", "CEDAR"), true);
  assert.equal(matches("Cedar candle", "candle"), true);
});

test("one typo still matches: wrong, missing, extra, swapped", () => {
  assert.equal(matches("Cedar candle", "candel"), true);
  assert.equal(matches("Cedar candle", "candke"), true);
  assert.equal(matches("Cedar candle", "cadle"), true);
  assert.equal(matches("Cedar candle", "candlee"), true);
});

test("two typos do not match", () => {
  assert.equal(matches("Cedar candle", "kandxe"), false);
  assert.equal(matches("Cedar candle", "cedxx"), false);
});

test("empty query matches everything", () => {
  assert.equal(matches("Cedar candle", ""), true);
  assert.equal(matches("Cedar candle", "   "), true);
});

test("words are matched one by one", () => {
  assert.equal(matches("Dot-grid notebook", "notebok"), true);
  assert.equal(matches("Dot-grid notebook", "grid notebok"), true);
  assert.equal(matches("Dot-grid notebook", "notebook mug"), false);
});

test("a short query does not match by typo alone", () => {
  assert.equal(matches("Ceramic mug", "x"), false);
});

test("unrelated products are not found", () => {
  assert.deepEqual(
    PRODUCTS.filter((p) => matches(p.name, "candel")).map((p) => p.id),
    ["candle"]
  );
});
