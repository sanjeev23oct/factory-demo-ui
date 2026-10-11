Status: PASS

# Evidence: section 4, tests

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| `test/board.test.js` has a `progress` test for `[]` → `{percent:0, label:'No tasks yet'}` | present | present (line 26-28) | PASS |
| `test/board.test.js` has a `progress` test for all-done, non-empty → `{percent:100, label:'All done'}` | present | present (line 30-36) | PASS |
| `test/board.test.js` has a `progress` test for zero-done, non-empty → `{percent:0, label:'0 of 3 done'}` | present | present (line 38-45) | PASS |
| `test/board.test.js` has a `progress` test for a mixed count that rounds (1 of 3 → 33) | present | present (line 47-49), asserts `{percent:33, label:'1 of 3 done'}` | PASS |
| `test/render.test.js` has a `renderProgress` test asserting both `data-testid="progress-bar"` and `data-testid="progress-label"` | present | present (line 23-27) | PASS |
| `test/render.test.js` has a `renderProgress` test asserting `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow`, `aria-valuetext` | present | present (line 29-36) | PASS |
| `test/render.test.js` has a `renderProgress` test asserting the bar/testid/aria-valuenow still render at `percent: 0` | present | present (line 43-48) | PASS |
| `node --test` | all pass | 15 pass, 0 fail, 0 cancelled | PASS |
| Only `test/board.test.js` and `test/render.test.js` changed in this maker commit (`git show --stat HEAD`) | test files only | `test/board.test.js \| 27 ++++++++++++++++++++++++++-`, `test/render.test.js \| 29 ++++++++++++++++++++++++++++-`, 2 files changed | PASS |

---
_Stamped by the factory: this evidence was written by the checker in session `dd92450c`, a different session from the maker's (`efa9fff9`). It checks the maker's commit `3c4eb3f`._
