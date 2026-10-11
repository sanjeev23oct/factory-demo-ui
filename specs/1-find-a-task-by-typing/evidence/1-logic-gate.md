Status: PASS

| Check | Expected | Actual | Result |
|---|---|---|---|
| `grep -c 'export function matchesSearch' src/board.js` | 1 | 1 | PASS |
| `grep -c 'export function visibleTasks(tasks, filter, search' src/board.js` | 1 | 1 | PASS |
| `grep -c 'toLowerCase' src/board.js` | at least 2 | 2 | PASS |
| `grep -c 'matchesSearch' src/board.js` | at least 2 | 2 | PASS |
| Manual inspection of `src/board.js`: `matchesSearch(task, search)` is an exported pure function returning `true` iff `task.title.toLowerCase().includes(search.toLowerCase())`, considering only `title`; a falsy/empty `search` (`''`/`undefined`) returns `true` for every task via the `if (!search) return true;` guard; `visibleTasks(tasks, filter, search = '')` has `search` as a third parameter defaulting to `''`, the existing `'open'`/`'done'`/default-`'all'` branches are unchanged and applied first into `result`, which is then further filtered by `matchesSearch`; no `.trim()` call appears anywhere in the file, so whitespace in `search` is not trimmed | all true | all confirmed true by line-by-line reading of `src/board.js` (lines 1-26) | PASS |
| `node --test` (repository root) | all pass | tests 7, pass 7, fail 0, cancelled 0, skipped 0, todo 0 | PASS |
