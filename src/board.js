// Pure functions over a list of tasks. Nothing here touches the page.

export function summary(tasks) {
  const done = tasks.filter((task) => task.done).length;
  return { total: tasks.length, done, open: tasks.length - done };
}

export function matchesSearch(task, search) {
  if (!search) return true;
  const title = task.title.toLowerCase();
  const term = search.toLowerCase();
  return title.includes(term);
}

export function visibleTasks(tasks, filter, search = '') {
  let result = tasks;
  if (filter === 'open') result = tasks.filter((task) => !task.done);
  else if (filter === 'done') result = tasks.filter((task) => task.done);
  return result.filter((task) => matchesSearch(task, search));
}

export function sortTasks(tasks) {
  // Open tasks first, then by id so the order is stable.
  return [...tasks].sort((a, b) => Number(a.done) - Number(b.done) || a.id - b.id);
}
