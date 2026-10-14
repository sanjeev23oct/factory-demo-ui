grep -c "toISOString" src/main.js
# EXPECTED: at least 1

grep -c "renderList" src/main.js
# EXPECTED: at least 1

grep -c "data-filter" index.html
# EXPECTED: at least 3

grep -c '"due"' data/tasks.json
# EXPECTED: 2

grep -c '"id": 1' data/tasks.json
# EXPECTED: 1

grep -c '"id": 2' data/tasks.json
# EXPECTED: 1

grep -c '"id": 3' data/tasks.json
# EXPECTED: 1

grep -c '"title": "Renew the domain"' data/tasks.json
# EXPECTED: 1

grep -c '"title": "Send the invoice"' data/tasks.json
# EXPECTED: 1

grep -c '"title": "Book the venue"' data/tasks.json
# EXPECTED: 1

grep -c "\.task \.due" styles.css
# EXPECTED: at least 1
