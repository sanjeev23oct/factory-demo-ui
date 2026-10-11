import { progress, sortTasks, summary, visibleTasks } from './board.js';
import { renderList, renderProgress, renderSummary } from './render.js';

const list = document.querySelector('#tasks');
const counts = document.querySelector('#summary');
const progressBar = document.querySelector('#progress');
const filters = document.querySelectorAll('[data-filter]');
let tasks = [];
let filter = 'all';

function draw() {
  list.innerHTML = renderList(sortTasks(visibleTasks(tasks, filter)));
  counts.innerHTML = renderSummary(summary(tasks));
  progressBar.innerHTML = renderProgress(progress(tasks));
  filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
}

filters.forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; draw(); }));

fetch('data/tasks.json').then((response) => response.json()).then((loaded) => { tasks = loaded; draw(); });
