import { test } from "node:test";
import assert from "node:assert/strict";
import { addItem, removeItem, count, isEmpty, total, formatPrice } from "../public/cart.js";
import { PRODUCTS } from "../public/products.js";

test("adding the same product twice counts two", () => {
  const cart = addItem(addItem({}, "mug"), "mug");
  assert.deepEqual(cart, { mug: 2 });
  assert.equal(count(cart), 2);
});

test("removing the last one takes the line out", () => {
  assert.deepEqual(removeItem({ mug: 1 }, "mug"), {});
  assert.deepEqual(removeItem({}, "mug"), {});
});

test("the cart is never changed in place", () => {
  const cart = { mug: 1 };
  addItem(cart, "mug");
  assert.deepEqual(cart, { mug: 1 });
});

test("total sums price times quantity, in cents", () => {
  assert.equal(total({ tote: 1, mug: 2 }, PRODUCTS), 2400 + 2 * 1800);
  assert.equal(total({ unknown: 3 }, PRODUCTS), 0);
});

test("a cart is empty until it holds an item", () => {
  assert.equal(isEmpty({}), true);
  assert.equal(isEmpty(addItem({}, "mug")), false);
  assert.equal(isEmpty(removeItem({ mug: 1 }, "mug")), true);
});

test("prices are shown in dollars with two decimals", () => {
  assert.equal(formatPrice(0), "$0.00");
  assert.equal(formatPrice(2400), "$24.00");
  assert.equal(formatPrice(1205), "$12.05");
});
