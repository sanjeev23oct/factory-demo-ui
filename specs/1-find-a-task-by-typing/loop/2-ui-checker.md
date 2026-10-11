# Checker: Section 2 — UI (`index.html`, `src/main.js`)

Cat 1 checks. Run from the repository root.

```bash
grep -c 'data-testid="search"' index.html  # EXPECTED: 1
grep -c 'let search' src/main.js  # EXPECTED: 1
grep -c "addEventListener('input'" src/main.js  # EXPECTED: at least 1
grep -c 'visibleTasks(tasks, filter, search)' src/main.js  # EXPECTED: 1
grep -c 'summary(tasks)' src/main.js  # EXPECTED: 1
```
