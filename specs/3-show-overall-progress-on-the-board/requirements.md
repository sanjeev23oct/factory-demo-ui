# Show overall progress on the board

## Overview

The board currently shows a plain text summary ("X open · Y done · Z total", `src/render.js:19`, wired to `#summary` in `index.html` and `src/main.js:12`) but nothing that lets someone see completion at a glance. `src/board.js` has pure helpers (`summary`, `visibleTasks`, `sortTasks`) with no notion of a percentage, and `src/render.js` has no markup for a progress bar. This work adds a visual progress bar with an accompanying text label under the heading, derived from the existing task list, while leaving the current summary line and filters untouched.

## User stories

### Story 1: See completion at a glance

As a person looking at the task board, I want a progress bar and a short text label showing how many tasks are done, so that I can tell how far along the board is without reading or counting the task list.

- **AC 1.1** — Normal case: given a task list with 3 tasks where 1 is done and 2 are open, the board renders a progress bar (`data-testid="progress-bar"`) filled to exactly 33% width and, next to it, a label (`data-testid="progress-label"`) whose text is exactly `1 of 3 done`.
- **AC 1.2** — No tasks: given an empty task list (`[]`), the label text is exactly `No tasks yet`, and the progress bar still renders (it is not hidden or removed) filled to 0% width — never `NaN%`, `Infinity%`, or `undefined%`.
- **AC 1.3** — All done: given a task list where every task is done and the list is non-empty (e.g. 3 of 3 done), the label text is exactly `All done` (not `3 of 3 done`), and the progress bar is filled to 100% width.
- **AC 1.4** — Zero done, not empty: given a non-empty task list where no task is done (e.g. 0 of 3 done), the label text is exactly `0 of 3 done` (this case is distinct from AC 1.2 — zero tasks done is not the same as zero tasks existing), and the progress bar is filled to 0% width.
- **AC 1.5** — Placement: the progress bar and label are rendered directly under the `<h1>` heading and above the existing `#summary` line in `index.html`.
- **AC 1.6** — No regression: the existing `#summary` text format (`"{open} open · {done} done · {total} total"`) and the three filter buttons (`data-testid="filter-all"`, `filter-open"`, `filter-done"`) keep their current text, markup, and behavior unchanged.

### Story 2: Hear the progress, not just see it

As a screen reader user, I want the progress bar to announce the same information a sighted user sees, so that a coloured bar alone does not leave me without the number.

- **AC 2.1** — The progress bar element has `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, and `aria-valuenow` set to the current whole-number percent (so for AC 1.1, `aria-valuenow="33"`).
- **AC 2.2** — The progress bar element has an `aria-valuetext` attribute equal to the same label text visible on screen (`No tasks yet`, `All done`, or `{done} of {total} done`), so the screen reader announces the human-readable state rather than a bare percentage.

## Correctness properties

- Percent is always a whole number between 0 and 100 inclusive, and is never `NaN` or `Infinity` (no division by zero when `total` is 0).
- Percent is exactly 100 when `done === total` and `total > 0`; percent is exactly 0 when `total === 0` or `done === 0`.
- The label is always exactly one of three forms, using the real counts: `No tasks yet` (when `total === 0`), `All done` (when `total > 0` and `done === total`), or `{done} of {total} done` (all other cases).
- The visual bar fill width and `aria-valuenow` always derive from the same computed percent value — they never disagree.
- `aria-valuetext` always equals the visible label text for the same render.
- The existing `#summary` markup/text and the filter buttons' `data-testid` attributes and behavior are unaffected by this change.
- Per the project's architecture (`AGENTS.md`), the percent/label computation is a pure function in `src/board.js` with its own test, and the progress bar/label markup is built in `src/render.js` with its own test; `src/main.js` only wires the computed values to the page.

## Out of scope

- Showing progress broken down by filter (e.g. progress among only "open" tasks).
- Changing the wording, format, or `data-testid` of the existing `#summary` line.
- Color thresholds, animated transitions, or other visual styling choices for the bar beyond fill width.
- Persisting or charting progress over time.

## Needs clarification

- "Under the heading" placement (AC 1.5) is read as: directly below the `<h1>`, above the existing `#summary` line. If the progress bar should instead sit below the existing summary line, or elsewhere on the page, that needs confirmation before implementation.
