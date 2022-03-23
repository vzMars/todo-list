import { v4 as uuidv4 } from 'uuid';

const Project = (title) => {
  const tasks = [];
  const id = uuidv4();

  const addTask = (newTask) => tasks.push(newTask);

  return { id, title, tasks, addTask };
};

export default Project;
