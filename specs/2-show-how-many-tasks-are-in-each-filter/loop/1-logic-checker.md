# Checker: Section 1 — Logic (`src/board.js`)

Cat 1 checks for `src/board.js`. Run from the repository root.

```bash
grep -c 'export function filterButtonText' src/board.js  # EXPECTED: 1
grep -c 'export function filterButtonAriaLabel' src/board.js  # EXPECTED: 1
grep -c 'count === 1' src/board.js  # EXPECTED: at least 1
grep -c "'task'" src/board.js  # EXPECTED: at least 1
```
