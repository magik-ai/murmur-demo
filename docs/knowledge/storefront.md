# Storefront knowledge

What an agent needs to know before touching the shop. Short on purpose.

## Where the truth lives

- Products: `public/products.js`. Made up for the demo.
- The cart: plain data, `{ [productId]: quantity }`, kept in `localStorage`
  under the key `cart`.
- All cart logic is in `public/cart.js`, as pure functions. `public/app.js`
  only renders and wires clicks.

## Rules that must hold

- Prices are **integer cents** everywhere. Show them only through
  `formatPrice(cents)`. Never divide by 100 in a template.
- Cart functions never change the cart they are given: they return a new one.
  `test/cart.test.js` checks this.
- Copy a shopper reads is short, friendly and in sentence case. No
  exclamation marks, no jargon.
- Anything a shopper sees on a projector stays at 18px or more.

## How to check your work

- `npm test` runs every test with Node's built-in runner, in about a second.
- Open `public/index.html` through any static server (for example
  `python3 -m http.server -d public 8080`) to see the page.
