Status: PASS

# Evidence: section 1, logic

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| grep -c "export function dueText" src/board.js | 1 | 1 | PASS |
| grep -c "export function summary" src/board.js | 1 | 1 | PASS |
| grep -c "export function visibleTasks" src/board.js | 1 | 1 | PASS |
| grep -c "export function sortTasks" src/board.js | 1 | 1 | PASS |
| grep -c "new Date" src/board.js | 0 | 0 | PASS |
| node --test | all pass | 7 pass, 0 fail | PASS |
| git show HEAD -- src/board.js | pure addition, summary/visibleTasks/sortTasks untouched | diff shows only 9 insertions after sortTasks, no deletions | PASS |
| dueText({...}, '2026-10-14') with no `due` | null | null | PASS |
| dueText({...due: null}, '2026-10-14') | null | null | PASS |
| dueText({...due: undefined}, '2026-10-14') | null | null | PASS |
| dueText({...due: '2026-10-14'}, '2026-10-14') | "due today" | "due today" | PASS |
| dueText({...due: '2026-11-03'}, '2026-10-14') | "due 3 Nov" | "due 3 Nov" | PASS |
| dueText({...due: '2026-01-09'}, '2026-10-14') | "due 9 Jan" | "due 9 Jan" | PASS |

All sub-items (1.1.1–1.1.5) verified: null/undefined `due` returns `null`; exact string match on `today` returns `due today`; day-of-month/month parsed from the `due` string's own components via `.split('-')` (no `new Date` call exists in the file, confirmed by grep); result is independent of timezone since no `Date` object timezone conversion occurs; `summary`, `visibleTasks`, and `sortTasks` are byte-for-byte unchanged per the commit diff, and their existing tests still pass.

---
_Stamped by the factory: this evidence was written by the checker in session `6f961cf6`, a different session from the maker's (`24ecca60`). It checks the maker's commit `240c0a4`._
