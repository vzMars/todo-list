import { format, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const Task = (title, description, dueDate, priority, complete, important) => {
  const id = uuidv4();

  dueDate = parseISO(dueDate);
  return { id, title, description, dueDate, priority, complete, important };
};

export default Task;
