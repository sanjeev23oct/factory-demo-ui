# Show when each task is due

## Overview

The board does not currently show when a task is due. `data/tasks.json` has no date field
(`src/board.js:1`, `src/render.js:7`, `data/tasks.json:1`), and `renderTask` only outputs the
mark and the title. The issue asks for an optional due date on each task, rendered next to the
title, with a special "due today" case and a date format that reads the same regardless of the
viewer's timezone or locale. This spec adds an optional `due` field to task data and a due-date
display in `renderTask`, without changing `summary`, `visibleTasks`, `sortTasks`, filters, or the
summary line.

## User stories

### Story 1: See a task's due date next to its title

As a board viewer, I want to see a task's due date next to its title, so that I know when it
needs to be done.

- AC 1.1: A task may have a `due` property: a string in `"YYYY-MM-DD"` format (e.g.
  `"2026-11-03"`), interpreted as a calendar date with no time-of-day or timezone component.
- AC 1.2: Given a task with `due: "2026-11-03"`, `renderTask` outputs the text `due 3 Nov` next
  to the title: day of month as a number with no leading zero, a space, then a three-letter
  month abbreviation (`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`,
  `Dec`). No year is shown, regardless of how far away the date is.
- AC 1.3: The due text is wrapped in its own element carrying `data-testid="due-<id>"`, where
  `<id>` is the task's id (e.g. `data-testid="due-1"`).
- AC 1.4: Given a task with no `due` property (or `due` set to `null`/`undefined`), `renderTask`
  outputs no due text and no element with a `due-<id>` test id. The rest of the markup
  (`data-testid="task-<id>"`, the mark, the title) is byte-for-byte identical to the current
  output for that task.
- AC 1.5: The due text appears inside the same `<li class="task ...">` as the title, so it is
  "next to the title" rather than in a separate list item.

### Story 2: See "due today" instead of a formatted date

As a board viewer, I want a task due today to say "due today" instead of a formatted date, so
that I notice it immediately.

- AC 2.1: Given a task whose `due` value equals the current calendar date, `renderTask` outputs
  the exact text `due today` in place of the `due <day> <month>` text.
- AC 2.2: "Current calendar date" is computed once, consistently, for all tasks rendered in the
  same call (no task is shown as "due today" while another, same-dated task in the same render
  is shown as a formatted date).

### Story 3: Dates read the same for everyone

As a board viewer, I want due dates to read the same no matter what timezone or locale my
computer is set to, so that I see the same date my teammates see.

- AC 3.1: Given `due: "2026-11-03"`, the rendered text is `due 3 Nov` regardless of the viewer's
  local timezone offset. The day-of-month and month used for display are taken from the
  `YYYY-MM-DD` string's own year/month/day components, not from a timezone-shifted conversion
  (e.g. not from `Date#toLocaleDateString`/`Date#getDate` on a value built from `new
  Date("2026-11-03")`, which shifts by timezone offset).
- AC 3.2: The "current calendar date" used for the Story 2 comparison is computed the same way
  for every viewer regardless of local timezone (e.g. derived from UTC date components, not from
  local-timezone date components), so two viewers in different timezones looking at the board on
  the same UTC calendar day see the same task(s) marked "due today".

### Story 4: Sample data demonstrates all three cases

As a developer exercising the board, I want the sample data to show a task with a future due
date, a task due today, and a task with no due date, so that all three display states are
visible without hand-editing data.

- AC 4.1: `data/tasks.json` contains at least one task with a `due` value in the future (relative
  to when the file is read), at least one task with no `due` property, and at least one task
  whose `due` value is intended to render as "due today" on the day this spec is implemented.
- AC 4.2: Existing tasks' `id`, `title`, and `done` fields are unchanged; only `due` fields are
  added.

## Correctness properties

- Tasks with no `due` field render identically, byte-for-byte, to their current output; adding
  the due-date feature changes nothing for undated tasks.
- `summary`, `visibleTasks`, and `sortTasks` in `src/board.js` are not modified and their existing
  tests continue to pass unchanged; the `due` field does not affect counts, filtering, or
  ordering.
- Due-date text formatting never depends on the viewer's local timezone or locale: the same
  `due` string produces the same displayed text for every viewer, and the "due today" check
  compares against the same calendar date for every viewer at a given moment.
- Any text placed into the rendered HTML continues to go through `escapeHtml` (per
  `src/render.js:1`), including any text derived from the `due` field.
- The due-date element's `data-testid` is unique per task and only present when that task has a
  `due` value.

## Out of scope

- Validating or rejecting malformed `due` values (e.g. not matching `YYYY-MM-DD`). Behavior for
  malformed input is undefined by this spec.
- An "overdue" indicator or any styling/behavior difference for a `due` date that has already
  passed (not today); such a task is shown with the plain `due <day> <month>` format like any
  other future-or-past dated task.
- Showing the year, even for dates far in the future or past.
- Editing or setting a task's due date through the UI; `due` is read-only sample/source data.
- Time-of-day due times; `due` is a calendar date only.

## Needs clarification

- `data/tasks.json` is static and fetched as-is (`src/main.js:18`); the "due today" comparison in
  AC 2.1 is evaluated against the real current date at render time. The sample task intended to
  demonstrate "due today" (AC 4.1) will only actually render as "due today" on the specific date
  it is implemented; after that date passes, it will render as a plain `due <day> <month>` task
  instead. This spec treats that as acceptable for demo data, but flags it since the issue's
  phrasing ("one due today") could be read as expecting that state to persist indefinitely, which
  static JSON data cannot do.
