import { parseISO } from 'date-fns';

const Task = (id, title, description, dueDate, complete, important) => {
  dueDate = parseISO(dueDate);
  return { id, title, description, dueDate, complete, important };
};

export default Task;
