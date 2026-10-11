import assert from 'node:assert/strict';
import test from 'node:test';
import { renderList, renderSummary, renderTask } from '../src/render.js';

test('renderTask escapes the title', () => {
  const html = renderTask({ id: 1, title: '<b>x</b>', done: false });
  assert.ok(html.includes('&lt;b&gt;x&lt;/b&gt;'));
  assert.ok(html.includes('data-testid="task-1"'));
});

test('renderTask marks done tasks', () => {
  assert.ok(renderTask({ id: 2, title: 'a', done: true }).includes('class="task done"'));
});

test('renderList shows an empty state', () => {
  assert.ok(renderList([]).includes('data-testid="empty"'));
});

test('renderSummary shows the counts', () => {
  assert.equal(renderSummary({ total: 3, done: 1, open: 2, overdue: 0 }), '<span data-testid="summary">2 open · 1 done · 3 total · 0 overdue</span>');
});

test('renderTask with no due date matches today\'s baseline markup exactly', () => {
  const html = renderTask({ id: 10, title: 'Renew the domain', done: false }, '2024-06-15');
  assert.equal(
    html,
    '<li class="task open" data-testid="task-10"><span class="mark" aria-hidden="true"></span><span class="title">Renew the domain</span></li>'
  );
});

test('renderTask with a due date that is not overdue shows the due span but no overdue flag', () => {
  const html = renderTask({ id: 11, title: 'Future task', done: false, due: '2024-07-01' }, '2024-06-15');
  assert.ok(html.includes('class="task open"'));
  assert.ok(html.includes('<span class="due" data-testid="due-11">2024-07-01</span>'));
  assert.ok(!html.includes('overdue-flag'));
  assert.ok(!html.includes(' overdue"'));
});

test('renderTask marks an overdue task with the due span, overdue flag and overdue class', () => {
  const html = renderTask({ id: 12, title: 'Late task', done: false, due: '2024-06-01' }, '2024-06-15');
  assert.ok(html.includes('class="task open overdue"'));
  assert.ok(html.includes('<span class="due" data-testid="due-12">2024-06-01</span>'));
  assert.ok(html.includes('<span class="overdue-flag" data-testid="overdue-12">Overdue</span>'));
});

test('renderTask never marks a done task overdue even with a past due date', () => {
  const html = renderTask({ id: 13, title: 'Finished late task', done: true, due: '2020-01-01' }, '2024-06-15');
  assert.ok(html.includes('class="task done"'));
  assert.ok(html.includes('<span class="due" data-testid="due-13">2020-01-01</span>'));
  assert.ok(!html.includes('overdue'));
});
