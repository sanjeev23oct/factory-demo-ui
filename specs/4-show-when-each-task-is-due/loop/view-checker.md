grep -c "export function renderTask" src/render.js
# EXPECTED: 1

grep -c "dueText" src/render.js
# EXPECTED: at least 1

grep -c "import.*from './board.js'" src/render.js
# EXPECTED: 1

grep -c 'data-testid="due-' src/render.js
# EXPECTED: 1

grep -c 'class="due"' src/render.js
# EXPECTED: 1

grep -c "export function renderList" src/render.js
# EXPECTED: 1

grep -c "export function renderSummary" src/render.js
# EXPECTED: 1

grep -c 'data-testid="empty"' src/render.js
# EXPECTED: 1
