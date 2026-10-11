import assert from 'node:assert/strict';
import test from 'node:test';
import { isOverdue, sortTasks, summary, visibleTasks } from '../src/board.js';

const tasks = [
  { id: 1, title: 'a', done: true },
  { id: 2, title: 'b', done: false },
  { id: 3, title: 'c', done: false },
];

test('summary counts open and done', () => {
  assert.deepEqual(summary(tasks, '2024-01-01'), { total: 3, done: 1, open: 2, overdue: 0 });
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

const today = '2024-06-15';

test('isOverdue is true only for a not-done task with a due date strictly before today', () => {
  assert.equal(isOverdue({ id: 1, title: 'a', done: false, due: '2024-06-14' }, today), true);
});

test('isOverdue is false for a not-done task due today', () => {
  assert.equal(isOverdue({ id: 2, title: 'b', done: false, due: '2024-06-15' }, today), false);
});

test('isOverdue is false for a not-done task due in the future', () => {
  assert.equal(isOverdue({ id: 3, title: 'c', done: false, due: '2024-06-16' }, today), false);
});

test('isOverdue is false for a done task even with a due date in the past', () => {
  assert.equal(isOverdue({ id: 4, title: 'd', done: true, due: '2024-06-14' }, today), false);
});

test('isOverdue is false for a task with no due field', () => {
  assert.equal(isOverdue({ id: 5, title: 'e', done: false }, today), false);
});

test('summary overdue count reflects overdue tasks regardless of total, done and open', () => {
  const mixed = [
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: false, due: '2024-06-14' }, // overdue
    { id: 3, title: 'c', done: false, due: '2024-06-16' }, // not yet due
    { id: 4, title: 'd', done: true, due: '2024-06-14' }, // done, not overdue
    { id: 5, title: 'e', done: false }, // no due, not overdue
    { id: 6, title: 'f', done: false, due: '2024-01-01' }, // overdue
  ];
  assert.deepEqual(summary(mixed, today), { total: 6, done: 2, open: 4, overdue: 2 });
});

test("visibleTasks(tasks, 'overdue', today) returns only overdue tasks", () => {
  const mixed = [
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: false, due: '2024-06-14' }, // overdue
    { id: 3, title: 'c', done: false, due: '2024-06-16' }, // not yet due
    { id: 4, title: 'd', done: true, due: '2024-06-14' }, // done, not overdue
    { id: 5, title: 'e', done: false }, // no due, not overdue
    { id: 6, title: 'f', done: false, due: '2024-01-01' }, // overdue
  ];
  assert.deepEqual(visibleTasks(mixed, 'overdue', today).map((t) => t.id), [2, 6]);
});
