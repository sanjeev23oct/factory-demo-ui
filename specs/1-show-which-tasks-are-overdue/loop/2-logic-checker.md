# Checker: Section 2 — Logic (`src/board.js`)

Cat 1 checks for `src/board.js`. Run from the repository root.

```bash
grep -c 'export function isOverdue' src/board.js  # EXPECTED: 1
grep -c 'export function summary(tasks, today)' src/board.js  # EXPECTED: 1
grep -c 'export function visibleTasks(tasks, filter, today)' src/board.js  # EXPECTED: 1
grep -c "filter === 'overdue'" src/board.js  # EXPECTED: at least 1
grep -c 'overdue' src/board.js  # EXPECTED: at least 2
```
