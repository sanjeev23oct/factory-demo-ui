# Show how many tasks are in each filter

## Overview

The filter buttons (`All`, `Open`, `Done`) currently show only a label, so a user has to click through each one to see how many tasks it holds. The requested change is to show each filter's task count on its button and keep that count up to date as the task list changes.

What I read as evidence:
- `index.html:13-17` — the three filter buttons, each with a `data-filter` and `data-testid` (`filter-all`, `filter-open`, `filter-done`), currently labelled only `All`, `Open`, `Done`.
- `src/board.js:3-6` — `summary(tasks)` already returns `{ total, done, open }` for the full task list.
- `src/render.js:19-21` — `renderSummary` turns that summary into the `<p id="summary">` text (`"2 open · 1 done · 3 total"`), separate from the filter buttons.
- `src/main.js:10-16` — `draw()` calls `renderSummary` and sets `aria-pressed` on each filter button, but never touches the buttons' label text or an accessible name for the count.
- `data/tasks.json` — sample data has 3 tasks (2 open, 1 done), matching the issue's example counts (`All 3`, `Open 2`, `Done 1`).
- The issue explicitly says the summary line under the heading ("2 open · 1 done · 3 total") stays as it is; only the filter buttons change.

## User stories

### Story 1: See each filter's count on its button

As a user of the task board, I want each filter button to show how many tasks it contains, so that I know what each filter holds before clicking it.

- AC 1.1: With the sample data (2 open tasks, 1 done task, 3 total), the `All` button's visible text is `All 3`, the `Open` button's visible text is `Open 2`, and the `Done` button's visible text is `Done 1`.
- AC 1.2: The `All` button's count is always `tasks.length` (the full list), regardless of the current filter.
- AC 1.3: The `Open` button's count is always the number of tasks with `done: false`, regardless of the current filter.
- AC 1.4: The `Done` button's count is always the number of tasks with `done: true`, regardless of the current filter.
- AC 1.5: The three buttons' `data-testid` attributes (`filter-all`, `filter-open`, `filter-done`) and `data-filter` attributes are unchanged.

### Story 2: Counts stay current when the task list changes

As a user of the task board, I want the counts on the filter buttons to update whenever the underlying task list changes, so that I don't see stale numbers.

- AC 2.1: After `tasks` is reassigned and the board is redrawn (the same `draw()` path already triggered by data load and filter clicks), each filter button's count reflects the new `tasks` array, recomputed the same way as AC 1.2–1.4.
- AC 2.2: Clicking a filter button changes which tasks are listed and which button is marked `aria-pressed="true"`, but does not change any button's displayed count.

### Story 3: A filter with zero matching tasks is still usable

As a user of the task board, I want a filter with no tasks to show `0` and remain clickable, so that I can still select it to see its empty state.

- AC 3.1: If `tasks` has no tasks with `done: true`, the `Done` button's visible text is `Done 0`.
- AC 3.2: If `tasks` has no tasks with `done: false`, the `Open` button's visible text is `Open 0`.
- AC 3.3: If `tasks` is empty, the `All` button's visible text is `All 0`.
- AC 3.4: A filter button showing `0` is not disabled: it can still be clicked, it still receives `aria-pressed="true"` when selected, and selecting it shows the existing empty-list state (`data-testid="empty"`, text `Nothing here.`) in the task list.

### Story 4: Screen readers hear the count as part of the button

As a screen reader user, I want to hear each filter's count announced together with its label, so that I know how many tasks are behind a button without seeing it.

- AC 4.1: Each filter button has an accessible name that includes both its label and its count, in the form `"<Label>, <count> task"` when the count is 1, and `"<Label>, <count> tasks"` otherwise (e.g. `"Open, 2 tasks"`, `"Done, 1 task"`, `"All, 0 tasks"`).
- AC 4.2: The accessible name is produced by an `aria-label` attribute on the button (the visible text from Story 1 stays as the button's rendered label; `aria-label` overrides what is announced without duplicating or contradicting the visible text's numbers).

## Correctness properties

- The count shown on each filter button always equals the result of the corresponding field of `summary(tasks)` (`total` for `All`, `open` for `Open`, `done` for `Done`) for the current in-memory `tasks` array — never a count computed from the currently filtered/visible list.
- `all` count == `open` count + `done` count, for any task list (every task is either open or done, per `summary`'s existing definition).
- Selecting a filter never changes any button's count; only `aria-pressed` and the rendered task list change.
- The separate summary line (`<p id="summary">`, `data-testid="summary"`) keeps its current text format and is not affected by this change.

## Out of scope

- Changing the wording or format of the `<p id="summary">` line under the heading — the issue says it "can stay as it is."
- Adding new filters or changing which tasks each existing filter matches.
- Persisting or animating count changes; a count is simply redrawn with the rest of the board on each `draw()`.

## Needs clarification

- The issue's only accessible-name example is `"Open, 2 tasks"`; it does not say what to announce for a count of exactly 1 (`"1 task"` vs `"1 tasks"`) or for `"All"` (whether it says `"All, 3 tasks"` or something else, e.g. mentioning "total"). This spec assumes singular/plural agreement (`"1 task"`, otherwise `"N tasks"`) and the same `"<Label>, <count> task(s)"` pattern for all three buttons, including `All`. Confirm this is the intended wording before implementation, or supply exact copy.
