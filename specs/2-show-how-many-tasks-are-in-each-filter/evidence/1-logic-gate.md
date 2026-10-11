Status: PASS

# Evidence: section 1, logic (`src/board.js`)

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| `grep -c 'export function filterButtonText' src/board.js` | 1 | 1 | PASS |
| `grep -c 'export function filterButtonAriaLabel' src/board.js` | 1 | 1 | PASS |
| `grep -c 'count === 1' src/board.js` | at least 1 | 1 | PASS |
| `grep -c "'task'" src/board.js` | at least 1 | 0 | FLAWED CHECK (see note) — verified by direct execution instead |
| `node --input-type=module -e "import { filterButtonText, filterButtonAriaLabel } from './src/board.js'; ..."` — `filterButtonText('All', 3) === 'All 3'`, `filterButtonText('Done', 0) === 'Done 0'`, `filterButtonAriaLabel('Done', 1) === 'Done, 1 task'`, `filterButtonAriaLabel('Open', 2) === 'Open, 2 tasks'`, `filterButtonAriaLabel('All', 0) === 'All, 0 tasks'` | all true | all true | PASS |
| `node --test` | all pass | 7 pass, 0 fail | PASS |
| `git show --stat HEAD` | only `src/board.js` changed, additive only | `src/board.js \| 8 ++++++++`, 1 file changed, 8 insertions(+), 0 deletions(-) | PASS |

## Note on the `grep -c "'task'" src/board.js` check

This check in `loop/1-logic-checker.md` assumes the singular word `task` would appear wrapped in single quotes (e.g. a string literal built with `'`). The maker instead wrote the required string with a backtick template literal — `` `${label}, ${count} task` `` — consistent with the existing codebase style (`src/render.js`'s `renderSummary` likewise uses a backtick template, not quoted concatenation). The literal grep therefore finds 0 matches even though the word `task` is present and the function's behavior is verified correct by direct execution above, matching the spec's required outputs (`filterButtonAriaLabel('Done', 1) === 'Done, 1 task'`) exactly. This is a flawed assumption in the loop checker, not a defect in the maker's code.

## Sub-item review

- 1.1.1: `filterButtonText(label, count)` is exported, returns `` `${label} ${count}` ``. Confirmed `filterButtonText('All', 3) === 'All 3'` and `filterButtonText('Done', 0) === 'Done 0'` by direct execution. PASS.
- 1.2.1: `filterButtonAriaLabel(label, count)` is exported, returns `` `${label}, ${count} task` `` when `count === 1`, otherwise `` `${label}, ${count} tasks` ``. Confirmed `filterButtonAriaLabel('Done', 1) === 'Done, 1 task'`, `filterButtonAriaLabel('Open', 2) === 'Open, 2 tasks'`, `filterButtonAriaLabel('All', 0) === 'All, 0 tasks'` by direct execution. PASS.

## Scope review

`git show --stat HEAD` shows only `src/board.js` was changed (8 insertions, 0 deletions), both new functions are pure (no DOM/page access), and no existing exported function (`summary`, `visibleTasks`, `sortTasks`) was modified. Matches `src/board.js` holding only pure logic per the engineering guide.

---
_Stamped by the factory: this evidence was written by the checker in session `103ab984`, a different session from the maker's (`e25e5e44`). It checks the maker's commit `55664bb`._
