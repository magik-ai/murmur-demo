# murmur-demo

A tiny storefront used to demo [murmur](https://github.com/magik-ai/murmur)
live. Agents on a farm take the tasks in this repository's issues, each on its
own branch. A different agent reviews every change, the checks run, and the
owner decides what merges. Whatever is on `main` is deployed to the demo
machine within 15 seconds.

Everything here is made up for the demo: no real products, customers or
secrets.

- The rules agents follow: [`CLAUDE.md`](CLAUDE.md) and
  [`.murmur/contract.md`](.murmur/contract.md)
- What they need to know first: [`docs/knowledge/storefront.md`](docs/knowledge/storefront.md)
- Tests: `npm test`
