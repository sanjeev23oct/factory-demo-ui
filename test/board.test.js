import assert from 'node:assert/strict';
import test from 'node:test';
import {
  filterButtonAriaLabel,
  filterButtonText,
  sortTasks,
  summary,
  visibleTasks,
} from '../src/board.js';

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

test('filterButtonText joins the label and count', () => {
  assert.equal(filterButtonText('All', 3), 'All 3');
  assert.equal(filterButtonText('Open', 2), 'Open 2');
  assert.equal(filterButtonText('Done', 1), 'Done 1');
  assert.equal(filterButtonText('Done', 0), 'Done 0');
});

test('filterButtonAriaLabel is singular only when the count is exactly 1', () => {
  assert.equal(filterButtonAriaLabel('Done', 1), 'Done, 1 task');
  assert.equal(filterButtonAriaLabel('Open', 2), 'Open, 2 tasks');
  assert.equal(filterButtonAriaLabel('All', 0), 'All, 0 tasks');
});
