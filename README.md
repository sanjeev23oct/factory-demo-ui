# factory-demo-ui

A small task board, used to demonstrate the [software factory](https://github.com/sanjeev23oct/software-factory).
No build step and no dependencies: plain HTML, CSS and JavaScript modules.

    python3 -m http.server 8081     # then open http://127.0.0.1:8081
    node --test                     # run the tests

`src/board.js` holds the logic as pure functions. `src/render.js` turns tasks into HTML strings.
`src/main.js` is the only file that touches the page. Tests cover `board.js` and `render.js`.
