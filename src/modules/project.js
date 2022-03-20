import { v4 as uuidv4 } from 'uuid';

const Project = (title) => {
  const tasks = [];
  const id = uuidv4();

  const setTitle = (newTitle) => (title = newTitle);
  const addTask = (newTask) => tasks.push(newTask);

  return { id, title, tasks, setTitle, addTask };
};

export default Project;
