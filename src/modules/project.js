const Project = (title) => {
  const tasks = [];

  const getTitle = () => title;
  const setTitle = (newTitle) => (title = newTitle);
  const addTask = (newTask) => tasks.push(newTask);
  const getTasks = () => tasks;
  const getTaskCount = () => tasks.length;

  return { getTitle, setTitle, addTask, getTasks, getTaskCount };
};

export default Project;
