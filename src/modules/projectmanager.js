import Task from './task';
import Project from './project';
import {
  renderPage,
  hiddenElement,
  hideActiveDropDown,
  getCurrentTab,
} from './displaycontroller';
import { addDays, isToday, isWithinInterval } from 'date-fns';
import { createAddRenameForm } from './nav';

const projects = [];
const homeLinks = ['All Tasks', 'Today', 'Next 7 Days', 'Important'];

const content = document.getElementById('content');

content.addEventListener('click', (e) => {
  const target = e.target;
  console.log(e);
  console.log(target);

  if (target.classList.contains('more-icon')) {
    if (target.nextSibling.classList.contains('hidden')) {
      hideActiveDropDown();
    }
    hiddenElement(target.nextSibling);
  }

  if (!target.matches('.more-icon')) {
    hideActiveDropDown();
  }

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

  if (
    target.classList.contains('add-project') ||
    target.parentElement.classList.contains('add-project')
  ) {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
    let form = e.path[6].querySelector('.add-project-form');

    if (form.classList.contains('hidden')) {
      hiddenElement(form);
    }
  }

  if (target.id === 'cancel-project-btn') {
    if (e.path[3].classList.contains('add-project-form')) {
      hiddenElement(target.form);
      target.form[0].value = '';
    } else if (e.path[3].classList.contains('rename-project-form')) {
      let currentTab = getCurrentTab();
      let text;

      if (currentTab.classList.contains('rename-project-form')) {
        text = currentTab.children[1].firstChild.value;
      } else {
        text = currentTab.children[1].textContent;
      }

      renderHomeLink(text, currentTab.id);
    }
  }

  if (target.id === 'project-rename') {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);

    let id = e.path[2].id;
    let text = e.path[2].children[1].textContent;
    let project = e.path[6].querySelector(`[id='${id}']`);

    const form = createAddRenameForm('Rename', text);

    if (project.classList.contains('active-tab')) {
      form.classList.add('active-tab');
    }
    form.id = id;
    project.replaceWith(form);
  }

  if (target.id === 'project-delete') {
    console.log('time to delete');
    let projectID = e.path[2].id;
    const index = projects.findIndex((project) => project.id === projectID);
    console.log(index);
    let removed = projects.splice(index, 1);
    console.log(removed);
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (
    target.className === 'item-check-true' ||
    target.className === 'item-check-false'
  ) {
    let taskID = e.path[1].id;
    const indexs = indexOfTask(taskID);

    console.log(indexs);

    if (projects[indexs[0]].tasks[indexs[1]].complete === true) {
      projects[indexs[0]].tasks[indexs[1]].complete = false;
    } else {
      projects[indexs[0]].tasks[indexs[1]].complete = true;
    }

    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }
});

content.addEventListener('submit', (e) => {
  e.preventDefault();
  const target = e.target;
  console.log(e);
  if (target.classList.contains('add-project-form')) {
    createProject(target[0].value);
    target[0].value = '';
    hiddenElement(e.path[0]);
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.classList.contains('rename-project-form')) {
    const index = projects.findIndex((project) => project.id === target.id);

    projects[index].setTitle(target[0].value);
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }
});

const indexOfTask = (id) => {
  const projectIndex = projects.findIndex((project) =>
    project.tasks.find((task) => task.id === id)
  );

  const taskIndex = projects[projectIndex].tasks.findIndex(
    (task) => task.id === id
  );

  return [projectIndex, taskIndex];
};

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

const createProject = (title) => {
  const newProject = Project(title);
  projects.push(newProject);
};

const createDefaultProject = () => {
  const defaultProject1 = Project('Video Games');
  const defaultProject2 = Project('Movies');

  const task1 = Task('Elden Ring', 'PC', '2022-03-13', true, true);
  const task2 = Task('Soul Hackers 2', 'PS5', '2022-03-18', false, false);
  const task3 = Task('Starfield', 'Xbox Series X', '2022-03-19', false, true);

  const task4 = Task('The Batman', 'Hbo', '2022-03-14', false, false);
  const task5 = Task('The Flash', 'Vudu', '2022-05-11', false, false);
  const task6 = Task('Alien', 'Netflix', '2022-03-20', false, false);

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
    const project = projects[i].tasks;
    for (let j = 0; j < project.length; j++) {
      allTasks.push(project[j]);
    }
  }

  return allTasks;
};

const todayTasks = (projects) => {
  const todayTasks = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i].tasks;
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
    const project = projects[i].tasks;
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
    const project = projects[i].tasks;
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
    if (projects[i].id === id) {
      const project = projects[i].tasks;
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
};

export default init;
