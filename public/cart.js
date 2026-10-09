// The cart, as plain data: { [productId]: quantity }. Prices are integer cents.

export function addItem(cart, id, qty = 1) {
  const next = { ...cart };
  next[id] = (next[id] || 0) + qty;
  return next;
}

export function removeItem(cart, id) {
  const next = { ...cart };
  if (!next[id]) return next;
  next[id] -= 1;
  if (next[id] <= 0) delete next[id];
  return next;
}

export function count(cart) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function isEmpty(cart) {
  return count(cart) === 0;
}

export function total(cart, products) {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === id);
    return product ? sum + product.price * qty : sum;
  }, 0);
}

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
