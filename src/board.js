// Pure functions over a list of tasks. Nothing here touches the page.

export function summary(tasks) {
  const done = tasks.filter((task) => task.done).length;
  return { total: tasks.length, done, open: tasks.length - done };
}

export function visibleTasks(tasks, filter) {
  if (filter === 'open') return tasks.filter((task) => !task.done);
  if (filter === 'done') return tasks.filter((task) => task.done);
  return tasks;
}

export function sortTasks(tasks) {
  // Open tasks first, then by id so the order is stable.
  return [...tasks].sort((a, b) => Number(a.done) - Number(b.done) || a.id - b.id);
}

export function progress(tasks) {
  const { total, done } = summary(tasks);
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const label =
    total === 0 ? 'No tasks yet' : done === total ? 'All done' : `${done} of ${total} done`;
  return { percent, label };
}
