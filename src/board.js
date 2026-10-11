// Pure functions over a list of tasks. Nothing here touches the page.

export function summary(tasks, today) {
  const done = tasks.filter((task) => task.done).length;
  const overdue = tasks.filter((task) => isOverdue(task, today)).length;
  return { total: tasks.length, done, open: tasks.length - done, overdue };
}

export function visibleTasks(tasks, filter, today) {
  if (filter === 'open') return tasks.filter((task) => !task.done);
  if (filter === 'done') return tasks.filter((task) => task.done);
  if (filter === 'overdue') return tasks.filter((task) => isOverdue(task, today));
  return tasks;
}

export function sortTasks(tasks) {
  // Open tasks first, then by id so the order is stable.
  return [...tasks].sort((a, b) => Number(a.done) - Number(b.done) || a.id - b.id);
}

export function isOverdue(task, today) {
  return task.done === false && task.due != null && task.due < today;
}
