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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dueText(task, today) {
  if (task.due == null) return null;
  if (task.due === today) return 'due today';
  const [, month, day] = task.due.split('-').map(Number);
  return `due ${day} ${MONTHS[month - 1]}`;
}
