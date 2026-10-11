grep -c 'id="progress"' index.html
# EXPECTED: 1

grep -c '<h1>' index.html
# EXPECTED: 1

grep -c 'id="summary"' index.html
# EXPECTED: 1

grep -c 'data-testid="filter-all"' index.html
# EXPECTED: 1

grep -c 'data-testid="filter-open"' index.html
# EXPECTED: 1

grep -c 'data-testid="filter-done"' index.html
# EXPECTED: 1

grep -c 'renderProgress' src/main.js
# EXPECTED: at least 1

grep -c 'progress(' src/main.js
# EXPECTED: at least 1

grep -c 'renderSummary' src/main.js
# EXPECTED: at least 1
