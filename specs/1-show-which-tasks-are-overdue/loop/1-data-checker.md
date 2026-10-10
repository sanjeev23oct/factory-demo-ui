# Checker: Section 1 — Data

Cat 1 checks for `data/tasks.json`. Run from the repository root.

```bash
grep '"id": 1' data/tasks.json | grep -c '"due": "2020-01-01"'  # EXPECTED: 1
grep '"id": 1' data/tasks.json | grep -c '"done": false'  # EXPECTED: 1
grep '"id": 3' data/tasks.json | grep -c '"due": "2099-12-31"'  # EXPECTED: 1
grep '"id": 3' data/tasks.json | grep -c '"done": false'  # EXPECTED: 1
grep '"id": 2' data/tasks.json | grep -c '"due"'  # EXPECTED: 0
```
