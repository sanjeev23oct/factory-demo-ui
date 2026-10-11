Status: PASS

| Check | Expected | Actual | Result |
|---|---|---|---|
| `grep -c 'export function isOverdue' src/board.js` | 1 | 1 | PASS |
| `grep -c 'export function summary(tasks, today)' src/board.js` | 1 | 1 | PASS |
| `grep -c 'export function visibleTasks(tasks, filter, today)' src/board.js` | 1 | 1 | PASS |
| `grep -c "filter === 'overdue'" src/board.js` | at least 1 | 1 | PASS |
| `grep -c 'overdue' src/board.js` | at least 2 | 3 | PASS |
| Manual: `isOverdue(task, today)` true exactly when `task.done === false` AND `task.due` set (not undefined/null) AND `task.due < today` (string compare) | matches | `return task.done === false && task.due != null && task.due < today;` — matches exactly (`!= null` excludes both `undefined` and `null`) | PASS |
| Manual: `isOverdue` returns `false` for no `due`, `done: true`, or `due >= today` | matches | confirmed by the same expression above; no `due` → `task.due != null` is false; `done: true` → first clause false; `due >= today` → third clause false | PASS |
| Manual: `summary(tasks, today)` returns `{total, done, open, overdue}` with `overdue` = count of `isOverdue(task, today) === true`, `total`/`done`/`open` unchanged meaning | matches | `summary` computes `done` via `task.done` filter, `overdue` via `tasks.filter((task) => isOverdue(task, today)).length`, returns `{ total: tasks.length, done, open: tasks.length - done, overdue }` — `total`/`done`/`open` logic unchanged from prior behavior | PASS |
| Manual: `visibleTasks(tasks, filter, today)` with `filter === 'overdue'` returns only overdue tasks; `'open'`/`'done'`/default unchanged | matches | `if (filter === 'overdue') return tasks.filter((task) => isOverdue(task, today));`; `'open'` and `'done'` branches unchanged (`!task.done` / `task.done`); default falls through to `return tasks;` (the `'all'`/default behavior) | PASS |
| `node --test` | all tests pass | 7/7 tests pass (0 fail) — includes `summary counts open and done` now asserting `{ total: 3, done: 1, open: 2, overdue: 0 }`, confirming the previously-failing pre-existing test was updated for the new `summary` return shape | PASS |
