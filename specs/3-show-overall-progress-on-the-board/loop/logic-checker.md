grep -c "export function progress" src/board.js
# EXPECTED: 1

grep -c "No tasks yet" src/board.js
# EXPECTED: 1

grep -c "All done" src/board.js
# EXPECTED: 1
