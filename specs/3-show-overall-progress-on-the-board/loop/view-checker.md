grep -c "export function renderProgress" src/render.js
# EXPECTED: 1

grep -c 'data-testid="progress-bar"' src/render.js
# EXPECTED: 1

grep -c 'data-testid="progress-label"' src/render.js
# EXPECTED: 1

grep -c 'role="progressbar"' src/render.js
# EXPECTED: 1

grep -c 'aria-valuemin="0"' src/render.js
# EXPECTED: 1

grep -c 'aria-valuemax="100"' src/render.js
# EXPECTED: 1

grep -c 'aria-valuenow' src/render.js
# EXPECTED: 1

grep -c 'aria-valuetext' src/render.js
# EXPECTED: 1

grep -c "export function renderSummary" src/render.js
# EXPECTED: 1

grep -c "export function renderTask" src/render.js
# EXPECTED: 1
