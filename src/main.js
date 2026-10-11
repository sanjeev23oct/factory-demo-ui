import { filterButtonAriaLabel, filterButtonText, sortTasks, summary, visibleTasks } from './board.js';
import { renderList, renderSummary } from './render.js';

const list = document.querySelector('#tasks');
const counts = document.querySelector('#summary');
const filters = document.querySelectorAll('[data-filter]');
let tasks = [];
let filter = 'all';

function draw() {
  list.innerHTML = renderList(sortTasks(visibleTasks(tasks, filter)));
  const totals = summary(tasks);
  const countsByFilter = { all: totals.total, open: totals.open, done: totals.done };
  counts.innerHTML = renderSummary(totals);
  filters.forEach((button) => {
    const label = button.dataset.filter.charAt(0).toUpperCase() + button.dataset.filter.slice(1);
    const count = countsByFilter[button.dataset.filter];
    button.textContent = filterButtonText(label, count);
    button.setAttribute('aria-label', filterButtonAriaLabel(label, count));
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  });
}

filters.forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; draw(); }));

fetch('data/tasks.json').then((response) => response.json()).then((loaded) => { tasks = loaded; draw(); });
