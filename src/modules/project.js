const Project = (id, title) => {
  const tasks = [];
  const addTask = (newTask) => tasks.push(newTask);

  return { id, title, tasks, addTask };
};

export default Project;
