import Task from './task';
import Project from './project';
import { renderPage } from './displaycontroller';

const projects = [];

const createDefaultProject = () => {
  const defaultProject1 = Project('Video Games');
  const defaultProject2 = Project('Movies');

  const task1 = Task('Elden Ring', 'PC', '2022-02-28', 'High', true, true);
  const task2 = Task(
    'Soul Hackers 2',
    'PS5',
    '2022-08-26',
    'Medium',
    false,
    false
  );
  const task3 = Task(
    'Starfield',
    'Xbox Series X',
    '2022-11-11',
    'Low',
    false,
    false
  );

  const task4 = Task('The Batman', 'Hbo', '2022-03-04', 'High', false, false);
  const task5 = Task('The Flash', 'Vudu', '2022-05-11', 'Low', false, false);
  const task6 = Task('Alien', 'Netflix', '2022-02-28', 'Medium', false, false);

  defaultProject1.addTask(task1);
  defaultProject1.addTask(task2);
  defaultProject1.addTask(task3);

  defaultProject2.addTask(task4);
  defaultProject2.addTask(task5);
  defaultProject2.addTask(task6);

  projects.push(defaultProject1);
  projects.push(defaultProject2);
};

const createAllTasksArray = (projects) => {
  const allTasks = [];
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i].getTasks();
    for (let j = 0; j < project.length; j++) {
      allTasks.push(project[j]);
    }
  }
  return allTasks;
};

const init = () => {
  createDefaultProject();
  // createHeader();
  // createProjectContainer(createAllTasksArray(projects), 'All Tasks');
  renderPage(createAllTasksArray(projects), 'All Tasks');
};

export default init;
