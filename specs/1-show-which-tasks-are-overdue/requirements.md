# Requirements: Show which tasks are overdue

## Overview

Tasks today only carry `id`, `title` and `done` (`data/tasks.json`); `board.js` has no concept of a due date, and `render.js` renders only a checkmark and a title (`src/render.js:7-12`). The filter bar has exactly three buttons — All, Open, Done — wired through `visibleTasks(tasks, filter)` (`src/board.js:8-12`, `index.html:14-16`), and the summary line is a fixed `"{open} open · {done} done · {total} total"` string (`src/render.js:19-21`). This feature adds an optional due date to a task, shows it next to the title, marks a task overdue (not done, due date passed) with text (not colour alone), adds an "Overdue" count to the summary and an "Overdue" filter, and leaves tasks without a due date rendered exactly as before.

## User stories

### Story 1: See a task's due date

As someone scanning the board,
I want to see a task's due date next to its title,
So that I know when it's due without opening anything else.

- AC 1.1: A task with `"due": "2026-11-01"` renders an element with `data-testid="due-<id>"` whose text is exactly `2026-11-01`, next to the task's title.
- AC 1.2: A task with no `due` field (or `"due": null`) renders no `data-testid="due-<id>"` element at all.
- AC 1.3: For a task with no `due` field, the rendered `<li>` markup is otherwise identical, character for character, to what today's `renderTask` produces (same classes, same children, nothing added or removed).

### Story 2: See which tasks are overdue

As someone scanning the board,
I want a task that's late to be clearly marked, in words, not just colour,
So that I don't miss it, and so it's still clear if I can't distinguish colour.

- AC 2.1: A task where `done` is `false` and `due` is a date strictly before "today" is rendered with an added class `overdue` on its `<li class="task ...">` and an added element `data-testid="overdue-<id>"` whose text is exactly `Overdue`.
- AC 2.2: A task where `done` is `false` and `due` equals "today" is not marked overdue (no `overdue` class, no `overdue-<id>` element) — it isn't late yet.
- AC 2.3: A task where `done` is `false` and `due` is after "today" is not marked overdue.
- AC 2.4: A task where `done` is `true` is never marked overdue, regardless of its `due` date (including a `due` date before "today").
- AC 2.5: A task with no `due` field is never marked overdue.

### Story 3: See how many tasks are overdue

As someone scanning the board,
I want the summary line to tell me how many tasks are overdue,
So that I know if anything needs attention without counting myself.

- AC 3.1: The summary element (`data-testid="summary"`) text is exactly `{open} open · {done} done · {total} total · {overdue} overdue`, where `{overdue}` is the count of tasks meeting the overdue definition in AC 2.1 (not done, due date strictly before "today").
- AC 3.2: When no task is overdue, the summary still includes `· 0 overdue` (the segment is never omitted).
- AC 3.3: The summary's overdue count reflects all tasks regardless of the active filter (it does not change when the Overdue, Open or Done filter is selected).

### Story 4: Filter to only overdue tasks

As someone scanning the board,
I want an "Overdue" filter next to All, Open and Done,
So that I can see just the tasks that need attention.

- AC 4.1: A fourth filter button exists with `data-testid="filter-overdue"`, labelled `Overdue`, placed after the `Done` button.
- AC 4.2: Clicking the Overdue filter shows only tasks meeting the overdue definition in AC 2.1, and sets that button's `aria-pressed` to `"true"` while the other three filter buttons' `aria-pressed` is `"false"` (same pattern as the existing All/Open/Done buttons).
- AC 4.3: With the Overdue filter active, a task that is done, or not done but not yet due, or has no due date, does not appear in the list.
- AC 4.4: With no overdue tasks, selecting the Overdue filter shows the existing empty state (`data-testid="empty"`, text "Nothing here.").

### Story 5: Sample data shows every case

As a developer or reviewer opening the board,
I want the sample data to include an overdue task, a task due in the future, and a task with no due date,
So that every state described above is visible without editing data.

- AC 5.1: `data/tasks.json` contains at least one task with `done: false` and a `due` date in the past relative to when this board is viewed, so it renders as overdue (Story 2) today and for the foreseeable life of this sample data (e.g. years in the past, not days).
- AC 5.2: `data/tasks.json` contains at least one task with a `due` date far enough in the future that it will not become overdue for the foreseeable life of this sample data.
- AC 5.3: `data/tasks.json` contains at least one task with no `due` field at all.

## Correctness properties

- Overdue is exactly: `done === false` AND `due` is set AND `due` is strictly before "today" (AC 2.1–2.5). No other factor marks or unmarks a task overdue.
- Any function that decides whether a task is overdue takes "today" as an explicit argument rather than reading the clock itself, consistent with the existing convention for date-dependent logic (`AGENTS.md`), so overdue status is deterministic and fixable in tests.
- A task with no `due` field never triggers overdue styling, never counts toward the overdue summary number, and never appears under the Overdue filter.
- The overdue state is always conveyed through visible text (`Overdue`), never through colour or class alone.
- The total, open and done counts in the summary, and the behavior of the existing All, Open and Done filters, are unchanged by this feature.
- Text taken from task data (e.g. `due`) continues to go through `escapeHtml` before being placed in markup, per existing convention (`AGENTS.md`).

## Out of scope

- Adding, editing or clearing a task's due date from the UI — the board only reads `data/tasks.json`; there is no create/edit UI today and this feature does not add one.
- A due time of day — only a calendar date.
- Sorting tasks by due date or overdue status — `sortTasks` keeps its existing order (open before done, then by id).
- Reminders or notifications about an approaching or passed due date.

## Needs clarification

- Which clock/timezone defines "today" for the overdue comparison, since this runs in the visitor's browser (e.g. the browser's local date vs. UTC). The issue just says "has passed."
- Exact display format for the due date next to the title: this spec assumes the raw stored string (e.g. `2026-11-01`) is shown as-is, since there's no date-formatting library in this project; confirm if a friendlier format (e.g. "Nov 1, 2026") is wanted instead.
