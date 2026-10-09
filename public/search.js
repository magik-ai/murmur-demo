// Product search: pure functions, no DOM.

// Edit distance where one wrong, missing, extra or swapped letter counts as 1.
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

const words = (s) => s.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);

// One query word matches a name word when it sits inside it (so typing
// "cand" works) or is one typo away. Very short words must sit inside it.
function wordMatches(nameWord, q) {
  if (nameWord.includes(q)) return true;
  return q.length >= 3 && distance(nameWord, q) <= 1;
}

// True when every word of the query matches some word of the name.
export function matches(name, query) {
  const q = words(query);
  if (q.length === 0) return true;
  const n = words(name);
  return q.every((w) => n.some((nw) => wordMatches(nw, w)));
}
