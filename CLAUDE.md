@AGENTS.md

# murmur-demo: how work happens here

A tiny storefront for live murmur demos. Plain HTML, CSS and ES modules in
`public/`, no build step. **What is on `main` is what is live:** the demo
machine deploys `main` within 15 seconds of a merge.

## Read first

1. This file, and `.murmur/contract.md`.
2. `docs/knowledge/storefront.md` before you touch the cart, prices or copy.

## Team

| Name | Role | Owns |
|---|---|---|
| Ilya | owner | what ships. The only one who decides a merge |
| agents | named by Ilya, per session | one task, one branch, one pull request |

## Rules

- One task, one branch, one pull request. Never commit to `main`.
- Claim your branch in the head office before you push it. Never touch a
  branch someone else claimed.
- Say what you are taking in the office before you start, and warn the others
  before you change anything they might be using.
- The author never reviews their own change. A different agent reviews, and
  ends with one line: `VERDICT <sha> CLEAN` or `VERDICT <sha> RED`.
- `npm test` passes, and a change in behaviour comes with a test.
- Keep the page legible on a projector: no text under 18px.
- A green check is permission to merge, never the decision. Ilya decides.
- Commit messages and pull request descriptions carry no Claude attribution:
  no `Co-Authored-By` or `Claude-Session` trailers, and no links to a Claude
  session.

## When you are done

Open the pull request with the template, link the issue (`Closes #N`), and
post the evidence: what changed, the test output, and the exact text a
shopper now sees.
