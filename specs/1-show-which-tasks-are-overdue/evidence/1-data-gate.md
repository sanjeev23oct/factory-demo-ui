Status: PASS

| Check | Expected | Actual | Result |
|---|---|---|---|
| `grep '"id": 1' data/tasks.json \| grep -c '"due": "2020-01-01"'` | 1 | 1 | PASS |
| `grep '"id": 1' data/tasks.json \| grep -c '"done": false'` | 1 | 1 | PASS |
| `grep '"id": 3' data/tasks.json \| grep -c '"due": "2099-12-31"'` | 1 | 1 | PASS |
| `grep '"id": 3' data/tasks.json \| grep -c '"done": false'` | 1 | 1 | PASS |
| `grep '"id": 2' data/tasks.json \| grep -c '"due"'` | 0 | 0 | PASS |
| `node --test` | all tests pass | 7 pass, 0 fail (tests: summary counts open and done; visibleTasks filters by state; sortTasks puts open tasks first and does not change its input; renderTask escapes the title; renderTask marks done tasks; renderList shows an empty state; renderSummary shows the counts) | PASS |
