// Turns tasks into HTML strings. Text from a task is always escaped.

import { dueText } from './board.js';

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function renderTask(task, today) {
  const state = task.done ? 'done' : 'open';
  const due = dueText(task, today);
  const dueSpan = due == null ? '' : `<span class="due" data-testid="due-${task.id}">${escapeHtml(due)}</span>`;
  return `<li class="task ${state}" data-testid="task-${task.id}">` +
    `<span class="mark" aria-hidden="true">${task.done ? '✓' : ''}</span>` +
    `<span class="title">${escapeHtml(task.title)}</span>${dueSpan}</li>`;
}

export function renderList(tasks, today) {
  if (tasks.length === 0) return '<li class="empty" data-testid="empty">Nothing here.</li>';
  return tasks.map((task) => renderTask(task, today)).join('');
}

export function renderSummary({ total, done, open }) {
  return `<span data-testid="summary">${open} open · ${done} done · ${total} total</span>`;
}
