import { format, parseISO } from 'date-fns';

const Task = (title, description, dueDate, priority, complete, important) => {
  dueDate = format(parseISO(dueDate), 'MM/dd/yyyy');
  return { title, description, dueDate, priority, complete, important };
};

export default Task;
