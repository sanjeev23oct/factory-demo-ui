# Checker: Section 2 — Page (`src/main.js`)

Cat 1 checks for `src/main.js`. Run from the repository root.

```bash
grep -c 'filterButtonText' src/main.js  # EXPECTED: at least 2
grep -c 'filterButtonAriaLabel' src/main.js  # EXPECTED: at least 2
grep -c "setAttribute('aria-label'" src/main.js  # EXPECTED: at least 1
grep -c 'aria-pressed' src/main.js  # EXPECTED: at least 1
grep -c 'summary(tasks)' src/main.js  # EXPECTED: at least 1
```
