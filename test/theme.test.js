import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveTheme, toggleTheme, toggleLabel } from "../public/theme.js";

test("a saved choice beats the system setting", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
});

test("without a saved choice the shop follows the system", () => {
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme(null, false), "light");
});

test("a junk saved value is ignored", () => {
  assert.equal(resolveTheme("purple", true), "dark");
  assert.equal(resolveTheme("", false), "light");
});

test("toggling flips the theme", () => {
  assert.equal(toggleTheme("light"), "dark");
  assert.equal(toggleTheme("dark"), "light");
});

test("the label says what pressing will do", () => {
  assert.equal(toggleLabel("light"), "Switch to dark theme");
  assert.equal(toggleLabel("dark"), "Switch to light theme");
});
