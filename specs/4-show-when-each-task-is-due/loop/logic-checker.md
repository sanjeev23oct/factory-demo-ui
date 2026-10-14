grep -c "export function dueText" src/board.js
# EXPECTED: 1

grep -c "export function summary" src/board.js
# EXPECTED: 1

grep -c "export function visibleTasks" src/board.js
# EXPECTED: 1

grep -c "export function sortTasks" src/board.js
# EXPECTED: 1

grep -c "new Date" src/board.js
# EXPECTED: 0
