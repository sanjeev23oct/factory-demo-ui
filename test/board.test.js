import assert from 'node:assert/strict';
import test from 'node:test';
import { matchesSearch, sortTasks, summary, visibleTasks } from '../src/board.js';

const tasks = [
  { id: 1, title: 'a', done: true },
  { id: 2, title: 'b', done: false },
  { id: 3, title: 'c', done: false },
];

const searchTasks = [
  { id: 1, title: 'Buy milk', done: true },
  { id: 2, title: 'Buy milk', done: false },
  { id: 3, title: 'Walk dog', done: false },
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

test('matchesSearch is a case-insensitive substring check', () => {
  assert.equal(matchesSearch({ title: 'Buy milk' }, 'MILK'), true);
  assert.equal(matchesSearch({ title: 'Buy MILK' }, 'milk'), true);
  assert.equal(matchesSearch({ title: 'Buy milk' }, 'ilk'), true);
  assert.equal(matchesSearch({ title: 'Buy milk' }, 'bread'), false);
  assert.equal(matchesSearch({ title: 'Buy milk' }, ''), true);
  assert.equal(matchesSearch({ title: 'Walk dog' }, ''), true);
});

test('visibleTasks combines search with the status filter', () => {
  assert.deepEqual(visibleTasks(searchTasks, 'open', 'milk').map((t) => t.id), [2]);
  assert.deepEqual(visibleTasks(searchTasks, 'done', 'milk').map((t) => t.id), [1]);
  assert.deepEqual(visibleTasks(searchTasks, 'all', 'milk').map((t) => t.id), [1, 2]);
});

test('visibleTasks with an empty search matches visibleTasks without one', () => {
  for (const filter of ['all', 'open', 'done']) {
    assert.deepEqual(visibleTasks(tasks, filter, ''), visibleTasks(tasks, filter));
  }
});

test('visibleTasks returns an empty array when the search matches nothing under the active filter', () => {
  assert.deepEqual(visibleTasks(searchTasks, 'open', 'nonexistent'), []);
  assert.deepEqual(visibleTasks(searchTasks, 'done', 'dog'), []);
  assert.deepEqual(visibleTasks(searchTasks, 'all', 'nonexistent'), []);
});
