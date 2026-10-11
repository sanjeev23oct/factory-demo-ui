Status: PASS

# Evidence: section 3, tests

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| `filterButtonText('All', 3)` in test/board.test.js | `'All 3'` | `'All 3'` | PASS |
| `filterButtonText('Open', 2)` in test/board.test.js | `'Open 2'` | `'Open 2'` | PASS |
| `filterButtonText('Done', 1)` in test/board.test.js | `'Done 1'` | `'Done 1'` | PASS |
| `filterButtonText('Done', 0)` in test/board.test.js | `'Done 0'` | `'Done 0'` | PASS |
| `filterButtonAriaLabel('Done', 1)` in test/board.test.js | `'Done, 1 task'` | `'Done, 1 task'` | PASS |
| `filterButtonAriaLabel('Open', 2)` in test/board.test.js | `'Open, 2 tasks'` | `'Open, 2 tasks'` | PASS |
| `filterButtonAriaLabel('All', 0)` in test/board.test.js | `'All, 0 tasks'` | `'All, 0 tasks'` | PASS |
| `node --test` | all pass | 9 pass, 0 fail | PASS |
| `git show --stat HEAD` only touches test/board.test.js | yes | yes (21 insertions, 1 deletion, only test/board.test.js) | PASS |

---
_Stamped by the factory: this evidence was written by the checker in session `8a28db92`, a different session from the maker's (`c5990a6d`). It checks the maker's commit `1565e2a`._
