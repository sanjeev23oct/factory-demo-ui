Status: PASS

# Evidence: section 4, tests

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| grep -c "^test(" test/board.test.js | at least 4 new (7 total) | 7 | PASS |
| grep -c "^test(" test/render.test.js | at least 5 new (9 total) | 9 | PASS |
| grep -n "^test('dueText" test/board.test.js | 4 dueText tests (null, due today, formatted non-today, second month/day) | 4 found: "returns null...", "returns \"due today\"...", "formats a due date that is not today", "derives day and month from the due string, not a timezone-shifted Date" | PASS |
| grep -n "^test('renderTask" test/render.test.js | due-related renderTask tests for future due, due today, no due, escapeHtml routing | found: "renders a due element for a future due date", "renders \"due today\" when due equals today", "renders no due element when the task has no due date", "routes due text through escapeHtml, same as the title" | PASS |
| grep -c "renderList threads today through to every task" test/render.test.js | 1 | 1 | PASS |
| grep -c "renderList shows an empty state" test/render.test.js | 1 (unchanged) | 1 | PASS |
| grep -c "renderSummary shows the counts" test/render.test.js | 1 (unchanged) | 1 | PASS |
| node --test | all pass | 16 pass, 0 fail | PASS |
| git show --stat HEAD | only test/board.test.js and test/render.test.js changed | test/board.test.js, test/render.test.js | PASS |

## Manual review against sub-items

- 4.1 `test/board.test.js` adds tests for `dueText(task, today)`, importing it alongside the existing `sortTasks`, `summary`, `visibleTasks` imports from `../src/board.js`.
- 4.1.1 Four new tests cover: no `due` property / `due: null` / `due: undefined` → `null`; `due` equal to `today` → `due today`; `due: "2026-11-03"` with `today: "2026-01-01"` → `due 3 Nov`; a second month/day combination `due: "2026-01-09"` with `today: "2026-01-01"` → `due 9 Jan`. The two formatted-date tests use different `today` values than the `due` value, which only passes if the implementation parses the `due` string's own components rather than constructing a `Date` (read `src/board.js:20-24`: `dueText` splits `task.due` on `-` and indexes into a `MONTHS` array, never constructs a `Date`).
- 4.2 `test/render.test.js` adds tests for `renderTask`/`renderList`, importing `dueText` from `../src/board.js` and `renderList`, `renderTask`, `escapeHtml`, `renderSummary` from `../src/render.js`.
- 4.2.1 New tests cover: a future `due` renders `<span class="due" data-testid="due-1">due 3 Nov</span>`; `due` equal to `today` renders `due today`; a task with no `due` (undefined or `null`) renders no `due-1` element and produces markup byte-for-byte equal between the undefined and null cases; due text containing `<i>t</i>` is routed through `escapeHtml` and compared against the directly-computed `escapeHtml(dueText(...))` value; `renderList` threads `today` through to every task (two same-dated tasks both render "due today"). The pre-existing `renderList shows an empty state` and `renderSummary shows the counts` tests are present, unmodified, and still pass.
- No production code (`src/*.js`) changed in this commit — confirmed via `git show --stat HEAD` (3ae1210), which shows only `test/board.test.js` and `test/render.test.js` modified.
- No `loop/tests-checker.md` file exists for this section in `specs/4-show-when-each-task-is-due/loop/` (only `logic-checker.md`, `view-checker.md`, `page-checker.md` are present); this is consistent with `tasks.md` having no "4.X — Gate" block naming one, so Cat 1 verification here relies on direct grep/read of the test files and the sub-items, as recorded above.

---
_Stamped by the factory: this evidence was written by the checker in this session, a different session from the maker's. It checks the maker's commit `3ae1210`._

---
_Stamped by the factory: this evidence was written by the checker in session `e26da101`, a different session from the maker's (`df869fbd`). It checks the maker's commit `3ae1210`._
