Status: PASS

# Evidence: section 3, page (`index.html`, `src/main.js`, `styles.css`)

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| grep -c 'id="progress"' index.html | 1 | 1 | PASS |
| grep -c '<h1>' index.html | 1 | 1 | PASS |
| grep -c 'id="summary"' index.html | 1 | 1 | PASS |
| grep -c 'data-testid="filter-all"' index.html | 1 | 1 | PASS |
| grep -c 'data-testid="filter-open"' index.html | 1 | 1 | PASS |
| grep -c 'data-testid="filter-done"' index.html | 1 | 1 | PASS |
| grep -c 'renderProgress' src/main.js | at least 1 | 2 | PASS |
| grep -c 'progress(' src/main.js | at least 1 | 1 | PASS |
| grep -c 'renderSummary' src/main.js | at least 1 | 2 | PASS |
| node --test | all pass | 7 pass, 0 fail | PASS |

## Manual review

- `#progress` div sits directly after `<h1>Task board</h1>` and directly before `<p id="summary">` in `index.html:11-13`.
- `<h1>`, `#summary`, and the three filter buttons are byte-identical to the pre-change version (confirmed via `git diff HEAD~1 HEAD -- index.html` — only the one `<div id="progress"></div>` line was added).
- `src/main.js` `draw()` now calls `progressBar.innerHTML = renderProgress(progress(tasks))` on every draw (main.js:14), alongside the unchanged `list.innerHTML`, `counts.innerHTML`, and filter `aria-pressed` wiring (main.js:12-15). Click handling (main.js:18) and the filter-button `aria-pressed` loop are untouched.
- `styles.css` adds `#progress` (flex layout for track+label), `.progress` (track, using `var(--line)`), `.progress-fill` (fill, using `var(--accent)`), and `.progress-label`, without modifying any pre-existing rule (confirmed via diff).
- The diff for this commit (`git show --stat HEAD`) touches only `index.html` (+1), `src/main.js` (+6/-2), `styles.css` (+4) — scoped exactly to this section's tasks, with no unrelated changes to `src/board.js` or `src/render.js`.

---
_Stamped by the factory: this evidence was written by the checker in session `4060779c`, a different session from the maker's (`1e0efc15`). It checks the maker's commit `5e186b0`._
