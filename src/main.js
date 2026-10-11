import { sortTasks, summary, visibleTasks } from './board.js';
import { renderList, renderSummary } from './render.js';

const list = document.querySelector('#tasks');
const counts = document.querySelector('#summary');
const filters = document.querySelectorAll('[data-filter]');
let tasks = [];
let filter = 'all';

function draw() {
  const today = new Date().toLocaleDateString('en-CA');
  list.innerHTML = renderList(sortTasks(visibleTasks(tasks, filter, today)), today);
  counts.innerHTML = renderSummary(summary(tasks, today));
  filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
}

filters.forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; draw(); }));

fetch('data/tasks.json').then((response) => response.json()).then((loaded) => { tasks = loaded; draw(); });
