import assert from 'node:assert/strict';
import test from 'node:test';
import { progress, sortTasks, summary, visibleTasks } from '../src/board.js';

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

test('progress on an empty list is 0 percent with "No tasks yet"', () => {
  assert.deepEqual(progress([]), { percent: 0, label: 'No tasks yet' });
});

test('progress when every task is done is 100 percent with "All done"', () => {
  const allDone = [
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: true },
  ];
  assert.deepEqual(progress(allDone), { percent: 100, label: 'All done' });
});

test('progress when no task is done is 0 percent with the real counts', () => {
  const noneDone = [
    { id: 1, title: 'a', done: false },
    { id: 2, title: 'b', done: false },
    { id: 3, title: 'c', done: false },
  ];
  assert.deepEqual(progress(noneDone), { percent: 0, label: '0 of 3 done' });
});

test('progress rounds a mixed count to a whole-number percent', () => {
  assert.deepEqual(progress(tasks), { percent: 33, label: '1 of 3 done' });
});
