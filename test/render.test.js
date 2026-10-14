import assert from 'node:assert/strict';
import test from 'node:test';
import { dueText } from '../src/board.js';
import { escapeHtml, renderList, renderSummary, renderTask } from '../src/render.js';

test('renderTask escapes the title', () => {
  const html = renderTask({ id: 1, title: '<b>x</b>', done: false }, '2026-01-01');
  assert.ok(html.includes('&lt;b&gt;x&lt;/b&gt;'));
  assert.ok(html.includes('data-testid="task-1"'));
});

test('renderTask marks done tasks', () => {
  assert.ok(renderTask({ id: 2, title: 'a', done: true }, '2026-01-01').includes('class="task done"'));
});

test('renderList shows an empty state', () => {
  assert.ok(renderList([], '2026-01-01').includes('data-testid="empty"'));
});

test('renderTask renders a due element for a future due date', () => {
  const html = renderTask({ id: 1, title: 'a', done: false, due: '2026-11-03' }, '2026-01-01');
  assert.ok(html.includes('<span class="due" data-testid="due-1">due 3 Nov</span>'));
});

test('renderTask renders "due today" when due equals today', () => {
  const html = renderTask({ id: 1, title: 'a', done: false, due: '2026-11-03' }, '2026-11-03');
  assert.ok(html.includes('<span class="due" data-testid="due-1">due today</span>'));
});

test('renderTask renders no due element when the task has no due date', () => {
  const withoutDue = renderTask({ id: 1, title: 'a', done: false }, '2026-01-01');
  const withNullDue = renderTask({ id: 1, title: 'a', done: false, due: null }, '2026-01-01');
  assert.ok(!withoutDue.includes('data-testid="due-1"'));
  assert.equal(withoutDue, '<li class="task open" data-testid="task-1"><span class="mark" aria-hidden="true"></span><span class="title">a</span></li>');
  assert.equal(withoutDue, withNullDue);
});

test('renderTask routes due text through escapeHtml, same as the title', () => {
  const task = { id: 1, title: '<i>t</i>', done: false, due: '2026-11-03' };
  const html = renderTask(task, '2026-01-01');
  assert.ok(html.includes(`<span class="title">${escapeHtml(task.title)}</span>`));
  assert.ok(html.includes(`data-testid="due-1">${escapeHtml(dueText(task, '2026-01-01'))}</span>`));
});

test('renderList threads today through to every task', () => {
  const tasks = [
    { id: 1, title: 'a', done: false, due: '2026-11-03' },
    { id: 2, title: 'b', done: false, due: '2026-11-03' },
  ];
  const html = renderList(tasks, '2026-11-03');
  assert.equal(html.match(/due today/g).length, 2);
});

test('renderSummary shows the counts', () => {
  assert.equal(renderSummary({ total: 3, done: 1, open: 2 }), '<span data-testid="summary">2 open · 1 done · 3 total</span>');
});
