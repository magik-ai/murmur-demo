import { PRODUCTS } from "./products.js";
import { matches } from "./search.js";
import { addItem, removeItem, count, total, formatPrice } from "./cart.js";

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

function renderProducts(query = "") {
  const grid = document.getElementById("products");
  const shown = PRODUCTS.filter((p) => matches(p.name, query));
  if (shown.length === 0) {
    grid.innerHTML = `<p class="empty">Nothing matches that yet.</p>`;
    return;
  }
  grid.innerHTML = shown.map(
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

document.getElementById("search").addEventListener("input", (e) => {
  renderProducts(e.target.value);
});

renderProducts();
renderCart();
