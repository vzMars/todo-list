import Task from './task';
import Project from './project';
import { renderPage, hiddenElement } from './displaycontroller';
import { addDays, isToday, isWithinInterval } from 'date-fns';

const projects = [];
const homeLinks = ['All Tasks', 'Today', 'Next 7 Days', 'Important'];

const content = document.getElementById('content');

content.addEventListener('click', (e) => {
  const target = e.target;
  console.log(e);
  console.log(target);

  if (target.classList.contains('menu-icon')) {
    hiddenElement(target.parentElement.nextSibling);
  }

  if (target.classList.contains('home-link')) {
    renderHomeLink(target.textContent, target.id);
  } else if (target.parentElement.classList.contains('home-link')) {
    renderHomeLink(target.parentElement.textContent, target.parentElement.id);
  }

  if (target.classList.contains('project-link')) {
    renderHomeLink(target.children[1].textContent, target.id);
  } else if (
    target.classList.contains('project-link-text') ||
    target.classList.contains('nav-icon')
  ) {
    renderHomeLink(
      target.parentElement.children[1].textContent,
      target.parentElement.id
    );
  }

  if (target.classList.contains('add-btn')) {
    if (target.previousSibling.classList.contains('hidden')) {
      hiddenElement(target.previousSibling);
    }
  } else if (target.parentElement.classList.contains('add-btn')) {
    if (target.parentElement.previousSibling.classList.contains('hidden')) {
      hiddenElement(target.parentElement.previousSibling);
    }
  }

  if (target.id === 'cancel-project-btn') {
    hiddenElement(target.form);
  }
});

content.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('hi');
});

const renderHomeLink = (text, id) => {
  renderPage(sortTasks(id), text, id, homeLinks, projects);
};

const sortTasks = (id) => {
  if (id === 'all-tasks') {
    return allTasks(projects);
  } else if (id === 'today') {
    return todayTasks(projects);
  } else if (id === 'next-7-days') {
    return nextSevenDayTasks(projects);
  } else if (id === 'important') {
    return importantTasks(projects);
  } else {
    return projectTasks(projects, id);
  }
};

const createDefaultProject = () => {
  const defaultProject1 = Project('Video Games');
  const defaultProject2 = Project('Movies');

  const task1 = Task('Elden Ring', 'PC', '2022-03-13', 'High', true, true);
  const task2 = Task(
    'Soul Hackers 2',
    'PS5',
    '2022-03-18',
    'Medium',
    false,
    false
  );
  const task3 = Task(
    'Starfield',
    'Xbox Series X',
    '2022-03-19',
    'Low',
    false,
    true
  );

  const task4 = Task('The Batman', 'Hbo', '2022-03-14', 'High', false, false);
  const task5 = Task('The Flash', 'Vudu', '2022-05-11', 'Low', false, false);
  const task6 = Task('Alien', 'Netflix', '2022-03-20', 'Medium', false, false);

  defaultProject1.addTask(task1);
  defaultProject1.addTask(task2);
  defaultProject1.addTask(task3);

  defaultProject2.addTask(task4);
  defaultProject2.addTask(task5);
  defaultProject2.addTask(task6);

  projects.push(defaultProject1);
  projects.push(defaultProject2);
};

const allTasks = (projects) => {
  const allTasks = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i].getTasks();
    for (let j = 0; j < project.length; j++) {
      allTasks.push(project[j]);
    }
  }

  return allTasks;
};

const todayTasks = (projects) => {
  const todayTasks = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i].getTasks();
    for (let j = 0; j < project.length; j++) {
      if (isToday(project[j].dueDate)) {
        todayTasks.push(project[j]);
      }
    }
  }

  return todayTasks;
};

const nextSevenDayTasks = (projects) => {
  const today = new Date();
  const sevenDays = addDays(today, 7);
  const nextSevenDayTasks = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i].getTasks();
    for (let j = 0; j < project.length; j++) {
      const sevenDayInterval = isWithinInterval(project[j].dueDate, {
        start: today,
        end: sevenDays,
      });
      if (sevenDayInterval) {
        nextSevenDayTasks.push(project[j]);
      }
    }
  }

  return nextSevenDayTasks;
};

const importantTasks = (projects) => {
  const importantTasks = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i].getTasks();
    for (let j = 0; j < project.length; j++) {
      if (project[j].important) {
        importantTasks.push(project[j]);
      }
    }
  }

  return importantTasks;
};

const projectTasks = (projects, id) => {
  const projectTasks = [];

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].getID() === id) {
      const project = projects[i].getTasks();
      for (let j = 0; j < project.length; j++) {
        projectTasks.push(project[j]);
      }
    }
  }

  return projectTasks;
};

const init = () => {
  createDefaultProject();
  // createHeader();
  // createProjectContainer(createAllTasksArray(projects), 'All Tasks');
  renderPage(
    allTasks(projects),
    homeLinks[0],
    homeLinks[0].toLowerCase().replace(/\s/g, '-'),
    homeLinks,
    projects
  );
  // renderPage(
  //   projects[0].getTasks(),
  //   projects[0].getTitle(),
  //   projects[0].getID(),
  //   homeLinks,
  //   projects
  // );
};

export default init;
