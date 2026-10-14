Status: PASS

# Evidence: section 3, page

| Check | Expected | Found | Result |
| --- | --- | --- | --- |
| grep -c "toISOString" src/main.js | at least 1 | 1 | PASS |
| grep -c "renderList" src/main.js | at least 1 | 2 | PASS |
| grep -c "data-filter" index.html | at least 3 | 3 | PASS |
| grep -c '"due"' data/tasks.json | 2 | 2 | PASS |
| grep -c '"id": 1' data/tasks.json | 1 | 1 | PASS |
| grep -c '"id": 2' data/tasks.json | 1 | 1 | PASS |
| grep -c '"id": 3' data/tasks.json | 1 | 1 | PASS |
| grep -c '"title": "Renew the domain"' data/tasks.json | 1 | 1 | PASS |
| grep -c '"title": "Send the invoice"' data/tasks.json | 1 | 1 | PASS |
| grep -c '"title": "Book the venue"' data/tasks.json | 1 | 1 | PASS |
| grep -c "\.task \.due" styles.css | at least 1 | 1 | PASS |
| node --test | all pass | 7 pass, 0 fail | PASS |

## Manual review against sub-items

- 3.1 `draw()` in `src/main.js` computes `const today = new Date().toISOString().slice(0, 10);` once per call and passes it as the second argument to `renderList(...)`.
- 3.1.1 `today` is derived from `new Date().toISOString().slice(0, 10)`, which reads UTC date components, never local-timezone fields.
- 3.1.2 `today` is computed once per `draw()` call and the single value is threaded through `renderList` to every `renderTask` call for that render.
- 3.1.3 Diff of `src/main.js` (`git show HEAD`) shows no changes to `#tasks`/`#summary` wiring, filter button `aria-pressed` update, or click handling — only the `renderList` call gained the `today` argument.
- 3.2.1 `data/tasks.json` id 1 "Renew the domain" (done: false) has `"due": "2026-11-03"`, which is in the future relative to today (2026-10-14, per system clock at time of check).
- 3.2.2 id 3 "Book the venue" (done: false) has `"due": "2026-10-14"`, equal to today's date (2026-10-14), so it renders "due today".
- 3.2.3 id 2 "Send the invoice" (done: true) has no `due` field (confirmed via diff — only ids 1 and 3 gained `due`).
- 3.2.4 Diff shows `id`, `title`, `done` fields unchanged for all three tasks; only `due` fields were added.
- 3.2.5 File formatting is unchanged — still one task object per line.
- 3.3 `styles.css` gained `.task .due { color: var(--muted); font-size: 14px; }`, which uses the existing `--muted` colour variable defined in `:root`.

---
_Stamped by the factory: this evidence was written by the checker in session `3c1d0197`, a different session from the maker's (`fadd4006`). It checks the maker's commit `47c9d53`._
