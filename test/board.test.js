import assert from 'node:assert/strict';
import test from 'node:test';
import { dueText, sortTasks, summary, visibleTasks } from '../src/board.js';

const tasks = [
  { id: 1, title: 'a', done: true },
  { id: 2, title: 'b', done: false },
  { id: 3, title: 'c', done: false },
];

test('summary counts open and done', () => {
  assert.deepEqual(summary(tasks), { total: 3, done: 1, open: 2 });
});

test('visibleTasks filters by state', () => {
  assert.deepEqual(visibleTasks(tasks, 'open').map((t) => t.id), [2, 3]);
  assert.deepEqual(visibleTasks(tasks, 'done').map((t) => t.id), [1]);
  assert.equal(visibleTasks(tasks, 'all').length, 3);
});

test('sortTasks puts open tasks first and does not change its input', () => {
  assert.deepEqual(sortTasks(tasks).map((t) => t.id), [2, 3, 1]);
  assert.deepEqual(tasks.map((t) => t.id), [1, 2, 3]);
});

test('dueText returns null when the task has no due date', () => {
  assert.equal(dueText({ id: 1, title: 'a', done: false }, '2026-01-01'), null);
  assert.equal(dueText({ id: 1, title: 'a', done: false, due: null }, '2026-01-01'), null);
  assert.equal(dueText({ id: 1, title: 'a', done: false, due: undefined }, '2026-01-01'), null);
});

test('dueText returns "due today" when due equals today', () => {
  assert.equal(dueText({ id: 1, title: 'a', done: false, due: '2026-11-03' }, '2026-11-03'), 'due today');
});

test('dueText formats a due date that is not today', () => {
  assert.equal(dueText({ id: 1, title: 'a', done: false, due: '2026-11-03' }, '2026-01-01'), 'due 3 Nov');
});

test('dueText derives day and month from the due string, not a timezone-shifted Date', () => {
  assert.equal(dueText({ id: 1, title: 'a', done: false, due: '2026-01-09' }, '2026-01-01'), 'due 9 Jan');
});
