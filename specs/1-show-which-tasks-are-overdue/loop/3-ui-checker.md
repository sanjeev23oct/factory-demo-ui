# Checker: Section 3 — UI (`src/render.js`, `src/main.js`, `index.html`, `styles.css`)

Cat 1 checks. Run from the repository root.

```bash
grep -c 'class="due"' src/render.js  # EXPECTED: at least 1
grep -c 'class="overdue-flag"' src/render.js  # EXPECTED: at least 1
grep -c 'isOverdue' src/render.js  # EXPECTED: at least 1
grep -c 'data-testid="filter-overdue"' index.html  # EXPECTED: 1
grep -c 'data-filter="overdue"' index.html  # EXPECTED: 1
grep -c '\.due' styles.css  # EXPECTED: at least 1
grep -c '\.overdue-flag' styles.css  # EXPECTED: at least 1
grep -c 'summary(tasks, today)' src/main.js  # EXPECTED: 1
grep -c 'visibleTasks(tasks, filter, today)' src/main.js  # EXPECTED: 1
```
