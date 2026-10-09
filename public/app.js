import { PRODUCTS } from "./products.js";
import { addItem, removeItem, count, total, formatPrice } from "./cart.js";
import { THEME_KEY, resolveTheme, toggleTheme, toggleLabel } from "./theme.js";

const KEY = "cart";
let cart = load();

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {
    /* private mode: the cart lives for this visit only */
  }
}

function renderProducts() {
  const grid = document.getElementById("products");
  grid.innerHTML = PRODUCTS.map(
    (p) => `
      <article class="product">
        <div class="emoji" aria-hidden="true">${p.emoji}</div>
        <h3>${p.name}</h3>
        <p class="price">${formatPrice(p.price)}</p>
        <button data-add="${p.id}">Add to cart</button>
      </article>`
  ).join("");
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = Object.entries(cart)
    .map(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return "";
      return `
        <li>
          <span>${p.emoji} ${p.name} × ${qty}</span>
          <button class="remove" data-remove="${id}" aria-label="Remove one ${p.name}">−</button>
        </li>`;
    })
    .join("");
  document.getElementById("cart-count").textContent = count(cart);
  document.getElementById("cart-total").textContent = formatPrice(total(cart, PRODUCTS));
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const remove = e.target.closest("[data-remove]");
  if (add) cart = addItem(cart, add.dataset.add);
  else if (remove) cart = removeItem(cart, remove.dataset.remove);
  else return;
  save();
  renderCart();
});

renderProducts();
renderCart();

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

const toggle = document.getElementById("theme-toggle");
let theme = resolveTheme(readSavedTheme(), matchMedia("(prefers-color-scheme: dark)").matches);

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  toggle.textContent = theme === "dark" ? "☀ Light theme" : "☾ Dark theme";
  toggle.setAttribute("aria-label", toggleLabel(theme));
}

toggle.addEventListener("click", () => {
  theme = toggleTheme(theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode: the choice lasts for this visit only */
  }
  applyTheme();
});

applyTheme();
