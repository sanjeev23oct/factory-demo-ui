# Visual spec: Show which tasks are overdue

Source: no mockups or screenshots were attached to the issue. This spec is based on the app's existing single screen (`index.html`, `styles.css`) and its existing component library (filter button group, task list item, summary line).

There is one screen: the task board (`index.html`). This feature changes that screen only; it adds no new screen.

## Task board

### Layout, top to bottom

1. `<h1>` "Task board" — unchanged.
2. Summary line, `<p id="summary">` — unchanged element, new text content (see **Summary line** below).
3. Filter bar, `.filters[role="group"]` — unchanged existing three buttons, one new button appended (see **Filter bar** below).
4. Task list, `<ul id="tasks">` — unchanged element; each `<li class="task">` gains an optional due-date span and an optional overdue marker (see **Task row** below).

No new top-level regions are added. Reuse `.task`, `.mark`, `.title`, `.filters button`, `.empty` exactly as styled today in `styles.css`.

### Task row

Extends the existing `renderTask` markup. Current markup for a task with no due date must stay byte-for-byte identical (AC 1.3):

```html
<li class="task open" data-testid="task-1">
  <span class="mark" aria-hidden="true"></span>
  <span class="title">Renew the domain</span>
</li>
```

New markup, for a task that has a `due` field, adds a due-date span after the title, inside the same `<li>`:

```html
<li class="task open" data-testid="task-1">
  <span class="mark" aria-hidden="true"></span>
  <span class="title">Renew the domain</span>
  <span class="due" data-testid="due-1">2026-11-01</span>
</li>
```

- The due text is the raw stored string, shown as-is (e.g. `2026-11-01`), escaped through `escapeHtml` like every other field taken from task data.
- No `due` field (or `due: null`) → no `.due` span, no `due-<id>` element at all (AC 1.2).

When a task is overdue (not done, `due` strictly before "today"), the `<li>` gains an `overdue` class and an overdue marker span, placed after the due-date span:

```html
<li class="task open overdue" data-testid="task-2">
  <span class="mark" aria-hidden="true"></span>
  <span class="title">Renew the domain</span>
  <span class="due" data-testid="due-2">2020-01-01</span>
  <span class="overdue-flag" data-testid="overdue-2">Overdue</span>
</li>
```

- The overdue state is conveyed by the visible text `Overdue`, never by the `overdue` class or colour alone (AGENTS.md: state is never shown by colour alone).
- A done task is never marked overdue, no matter its `due` date (AC 2.4). A task due exactly "today" or in the future is never marked overdue (AC 2.2, 2.3). A task with no `due` is never marked overdue (AC 2.5).

Reuse the existing `.task`, `.mark`, `.title` classes unchanged. Add two new classes, styled per **Styling** below:

- `.due` — the due-date text.
- `.overdue-flag` — the "Overdue" label.

### Summary line

`<p id="summary">`, filled by `renderSummary`, unchanged element and `data-testid="summary"`.

Exact text, always in this form, all four segments always present (AC 3.1, 3.2):

```
2 open · 1 done · 3 total · 1 overdue
```

The `{overdue}` count is the number of tasks meeting the overdue definition (not done, due date strictly before "today"), across **all** tasks regardless of the active filter (AC 3.3) — same convention as `{open}`, `{done}`, `{total}` today.

### Filter bar

`.filters[role="group" aria-label="Filter tasks"]`, same container, same button styling. Current three buttons unchanged. A fourth button is appended after Done:

```html
<div class="filters" role="group" aria-label="Filter tasks">
  <button type="button" data-filter="all" data-testid="filter-all">All</button>
  <button type="button" data-filter="open" data-testid="filter-open">Open</button>
  <button type="button" data-filter="done" data-testid="filter-done">Done</button>
  <button type="button" data-filter="overdue" data-testid="filter-overdue">Overdue</button>
</div>
```

- Label: exactly `Overdue`.
- `data-testid="filter-overdue"`, `data-filter="overdue"`.
- Same `aria-pressed` wiring as the other three buttons: clicking a filter button sets its own `aria-pressed="true"` and every other filter button's `aria-pressed="false"` (AC 4.2). No change to how All/Open/Done set `aria-pressed`.
- No new CSS rule needed for the button itself — it picks up the existing `.filters button` and `.filters button[aria-pressed="true"]` rules.

### States

**Loading** (before `fetch('data/tasks.json')` resolves): unchanged from today — `#summary` and `#tasks` are empty (`main.js` only calls `draw()` after the fetch resolves). No loading indicator exists today; this feature does not add one.

**Populated, All filter** (default on load): all tasks listed via `renderList`, in existing sort order (open before done, then by id — unchanged, due date never affects sort order per Out of scope). Summary shows all four counts. `filter-all` has `aria-pressed="true"`.

**Populated, Overdue filter active**: only tasks that are not done and whose due date is strictly before today are listed (AC 4.1–4.3). `filter-overdue` has `aria-pressed="true"`; the other three buttons have `aria-pressed="false"`. The summary line is unchanged by the filter (still reflects all tasks, AC 3.3).

**Empty, Overdue filter with no overdue tasks**: reuse the existing empty state exactly — `<li class="empty" data-testid="empty">Nothing here.</li>` (AC 4.4). Same markup `renderList` already produces for an empty filtered list; no new empty-state copy.

**Task with no due date**: row renders exactly as it does today — `.mark`, `.title` only, no `.due` span (AC 1.2, 1.3).

**Task with a future or today due date, not done**: row renders `.mark`, `.title`, `.due` — no `overdue` class, no `.overdue-flag` span (AC 2.2, 2.3).

**Task overdue**: row renders `.mark`, `.title`, `.due`, `.overdue-flag`, and the `<li>` carries the added `overdue` class (AC 2.1).

**Done task with a past due date**: row renders `.mark` (checked), `.title` (struck through, per existing `.task.done .title` rule), `.due` — no `overdue` class, no `.overdue-flag` span (AC 2.4).

### `data-testid` reference

| Element | `data-testid` | Notes |
|---|---|---|
| Filter button: Overdue | `filter-overdue` | new, after `filter-done` |
| Filter button: All/Open/Done | `filter-all` / `filter-open` / `filter-done` | unchanged |
| Due date on task `<id>` | `due-<id>` | present only when task has a `due` field |
| Overdue flag on task `<id>` | `overdue-<id>` | present only when task is overdue |
| Task row | `task-<id>` | unchanged |
| Summary | `summary` | unchanged element, new text format |
| Empty list | `empty` | unchanged |

### Keyboard and focus behavior

Unchanged from today: the four filter buttons are plain `<button type="button">` elements in document order inside a `role="group"`, so Tab moves through All → Open → Done → Overdue in order, Enter/Space activates the focused button (native button behavior — no custom key handling exists today or is added). No focus management is needed for the due-date or overdue spans; they are inert text, not interactive elements.

### Styling

Add to `styles.css`, consistent with the existing variable-based colour scheme (`--muted`, `--accent`, `--line`, etc.) and the existing rule that state is never shown by colour alone:

- `.task .due` — small, muted text (e.g. `color: var(--muted); font-size: 14px;`), sitting next to `.title` the way `.mark` already sits next to it (the existing `.task { display: flex; gap: 12px; align-items: center; }` row already lays out children left to right, so `.due` and `.overdue-flag` fall into place with no layout change).
- `.task .overdue-flag` — visibly distinct text label (e.g. bold, or a small pill using an existing or new `--danger`-style variable), but the distinguishing signal is the word "Overdue" itself, not the colour — colour is a reinforcement, never the sole signal (AGENTS.md).
- No change to `.task.done .title`, `.mark`, `.filters button`, or `.empty` rules.

## Needs clarification

Carried over from `requirements.md`, since no mockup resolves either:

- **Due date display format**: this spec shows the raw stored string as-is (e.g. `2026-11-01`), matching the assumption in `requirements.md`, since the project has no date-formatting utility. Confirm if a friendlier format is wanted instead.
- **"Today" definition**: this spec does not pick a timezone; that is a `board.js` logic decision (which function signature takes "today" as an argument), not a visual one, and is left to `requirements.md`'s existing note.
- **Overdue visual treatment** (colour/weight of `.overdue-flag`): no mockup specifies a colour or pill style; this spec picks "muted due-date text + bold/plain overdue text" as the closest fit to the existing minimal, colour-light board style. A product owner could prefer a stronger treatment (e.g. a coloured pill) — either is compatible with the AC as long as colour is not the only signal.
