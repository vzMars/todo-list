const Project = (title) => {
  const tasks = [];
  const getTitle = () => title;
  const addTask = (newTask) => tasks.push(newTask);
  const getTasks = () => tasks;
  const getTaskCount = () => tasks.length;
  return { getTitle, getTasks, addTask, getTaskCount };
};

export default Project;
