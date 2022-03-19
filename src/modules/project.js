import { v4 as uuidv4 } from 'uuid';

const Project = (title) => {
  const tasks = [];
  const id = uuidv4();

  const getID = () => id;
  const getTitle = () => title;
  const setTitle = (newTitle) => (title = newTitle);
  const addTask = (newTask) => tasks.push(newTask);
  const getTasks = () => tasks;

  return { getID, getTitle, setTitle, addTask, getTasks };
};

export default Project;
