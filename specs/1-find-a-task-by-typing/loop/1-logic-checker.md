# Checker: Section 1 — Logic (`src/board.js`)

Cat 1 checks for `src/board.js`. Run from the repository root.

```bash
grep -c 'export function matchesSearch' src/board.js  # EXPECTED: 1
grep -c 'export function visibleTasks(tasks, filter, search' src/board.js  # EXPECTED: 1
grep -c 'toLowerCase' src/board.js  # EXPECTED: at least 2
grep -c 'matchesSearch' src/board.js  # EXPECTED: at least 2
```
