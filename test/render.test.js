import assert from 'node:assert/strict';
import test from 'node:test';
import { renderList, renderProgress, renderSummary, renderTask } from '../src/render.js';

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
  assert.equal(renderSummary({ total: 3, done: 1, open: 2 }), '<span data-testid="summary">2 open · 1 done · 3 total</span>');
});

test('renderProgress includes the testids for the bar and the label', () => {
  const html = renderProgress({ percent: 33, label: '1 of 3 done' });
  assert.ok(html.includes('data-testid="progress-bar"'));
  assert.ok(html.includes('data-testid="progress-label"'));
});

test('renderProgress sets the ARIA attributes from percent and label', () => {
  const html = renderProgress({ percent: 33, label: '1 of 3 done' });
  assert.ok(html.includes('role="progressbar"'));
  assert.ok(html.includes('aria-valuemin="0"'));
  assert.ok(html.includes('aria-valuemax="100"'));
  assert.ok(html.includes('aria-valuenow="33"'));
  assert.ok(html.includes('aria-valuetext="1 of 3 done"'));
});

test('renderProgress shows the label text', () => {
  const html = renderProgress({ percent: 33, label: '1 of 3 done' });
  assert.ok(html.includes('>1 of 3 done<'));
});

test('renderProgress still renders the bar and testid at 0 percent', () => {
  const html = renderProgress({ percent: 0, label: 'No tasks yet' });
  assert.ok(html.includes('data-testid="progress-bar"'));
  assert.ok(html.includes('aria-valuenow="0"'));
  assert.ok(html.includes('aria-valuetext="No tasks yet"'));
});
