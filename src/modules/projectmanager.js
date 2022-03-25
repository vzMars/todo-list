import Task from './task';
import Project from './project';
import {
  renderPage,
  hiddenElement,
  hideActiveDropDown,
  getCurrentTab,
} from './displaycontroller';
import { projectForm } from './nav';
import { taskForm } from './todolist';
import { addDays, isToday, isWithinInterval, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const projects = [];
const homeLinks = ['All Tasks', 'Today', 'Next 7 Days', 'Important'];

const content = document.querySelector('.content');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const todoList = document.querySelector('.todo-list-container');

header.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('menu-icon')) {
    hiddenElement(target.parentElement.nextElementSibling);
    content.classList.toggle('hidden-nav');
  }
});

nav.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('home-link')) {
    renderHomeLink(target.textContent, target.id);
  }

  if (target.classList.contains('project-link')) {
    renderHomeLink(target.children[1].textContent, target.id);
  }

  if (target.classList.contains('add-project')) {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
    let form = e.path[3].querySelector('.add-project-form');

    if (form.classList.contains('hidden')) {
      hiddenElement(form);
    }
  }

  if (target.id === 'project-rename') {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);

    let id = e.path[2].id;
    let text = e.path[2].children[1].textContent;
    let project = e.path[5].querySelector(`[id='${id}']`);

    const form = projectForm('Rename', text);

    if (project.classList.contains('active-tab')) {
      form.classList.add('active-tab');
    }
    form.id = id;
    project.replaceWith(form);
  }

  if (target.id === 'project-delete') {
    let projectID = e.path[2].id;
    const index = projects.findIndex((project) => project.id === projectID);
    projects.splice(index, 1);

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    if (currentTab.id === projectID) {
      renderHomeLink(
        homeLinks[0],
        homeLinks[0].toLowerCase().replace(/\s/g, '-')
      );
    } else {
      renderHomeLink(currentTab.children[1].textContent, currentTab.id);
    }
  }

  if (target.id === 'cancel-project-btn') {
    hiddenElement(target.form);
    if (e.path[3].classList.contains('rename-project-form')) {
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
});

todoList.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('item-check')) {
    let taskID = e.path[1].id;
    const indices = indexOfTask(taskID);
    let completeStatus = projects[indices[0]].tasks[indices[1]].complete;

    projects[indices[0]].tasks[indices[1]].complete = !completeStatus;

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.classList.contains('star')) {
    let taskID = e.path[1].id;
    const indices = indexOfTask(taskID);
    let importantStatus = projects[indices[0]].tasks[indices[1]].important;

    projects[indices[0]].tasks[indices[1]].important = !importantStatus;

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.id === 'task-edit') {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);

    const formValues = [];
    let id = e.path[2].id;
    let title = e.path[2].children[1].children[0].textContent;
    let description = e.path[2].children[1].children[1].textContent;
    let dueDate = e.path[2].children[2].textContent;
    let task = e.path[6].querySelector(`[id='${id}']`);

    formValues.push(title);
    formValues.push(description);
    formValues.push(dueDate);
    const form = taskForm('Edit', formValues);

    form.id = id;
    task.replaceWith(form);
  }

  if (target.classList.contains('add-task')) {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);

    let form = e.path[2].querySelector('.add-task-form');

    if (form.classList.contains('hidden')) {
      hiddenElement(form);
    }
  }

  if (target.id === 'task-delete') {
    let taskID = e.path[2].id;
    const indices = indexOfTask(taskID);

    projects[indices[0]].tasks.splice(indices[1], 1);

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.id === 'cancel-task-btn') {
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }
});

content.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('more-icon')) {
    if (target.nextSibling.classList.contains('hidden')) {
      hideActiveDropDown();
    }
    hiddenElement(target.nextSibling);
  }

  if (!target.matches('.more-icon')) {
    hideActiveDropDown();
  }
});

content.addEventListener('submit', (e) => {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains('add-project-form')) {
    createProject(target[0].value);

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.classList.contains('rename-project-form')) {
    const index = projects.findIndex((project) => project.id === target.id);

    projects[index].title = target[0].value;

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.classList.contains('add-task-form')) {
    let projectID = e.path[1].id;
    const taskInfo = [
      target[0].value,
      target[1].value,
      target[2].value,
      false,
      false,
    ];
    createTask(taskInfo, projectID);

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }

  if (target.classList.contains('edit-task-form')) {
    let taskID = target.id;
    const indices = indexOfTask(taskID);

    projects[indices[0]].tasks[indices[1]].title = target[0].value;
    projects[indices[0]].tasks[indices[1]].description = target[1].value;
    projects[indices[0]].tasks[indices[1]].dueDate = parseISO(target[2].value);

    addProjectsToStorage();
    let currentTab = getCurrentTab();
    renderHomeLink(currentTab.children[1].textContent, currentTab.id);
  }
});

const checkStorage = () => {
  if (!localStorage.getItem('myProjects')) {
    createDefaultProject();
    addProjectsToStorage();
  } else {
    getProjectsFromStorage();
  }
};

const addProjectsToStorage = () => {
  localStorage['myProjects'] = JSON.stringify(projects);
  clearProjects();
  getProjectsFromStorage();
};

const getProjectsFromStorage = () => {
  let tempProjects = JSON.parse(localStorage['myProjects']);
  for (let i = 0; i < tempProjects.length; i++) {
    const tasks = tempProjects[i].tasks;
    createProject(tempProjects[i].title, tempProjects[i].id);
    for (let j = 0; j < tasks.length; j++) {
      createTask(
        [
          tasks[j].title,
          tasks[j].description,
          tasks[j].dueDate,
          tasks[j].complete,
          tasks[j].important,
        ],
        tempProjects[i].id,
        tasks[j].id
      );
    }
  }
};

const clearProjects = () => {
  projects.length = 0;
};

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

const createProject = (title, projectID) => {
  const id = createID(projectID);
  const newProject = Project(id, title);
  projects.push(newProject);
};

const createTask = (taskInfo, projectID, taskID) => {
  const id = createID(taskID);
  const newTask = Task(
    id,
    taskInfo[0],
    taskInfo[1],
    taskInfo[2],
    taskInfo[3],
    taskInfo[4]
  );
  const projectIndex = projects.findIndex(
    (project) => project.id === projectID
  );
  projects[projectIndex].addTask(newTask);
};

const createID = (itemID) => {
  let id;
  if (itemID !== undefined) {
    id = itemID;
  } else {
    id = uuidv4();
  }
  return id;
};

const createDefaultProject = () => {
  createProject('Video Games');
  createProject('Movies');

  createTask(['Elden Ring', 'PC', '2022-02-25', false, false], projects[0].id);
  createTask(
    ['Soul Hackers 2', 'PS5', '2022-08-25', false, false],
    projects[0].id
  );
  createTask(
    ['Starfield', 'Xbox Series X', '2022-11-11', false, false],
    projects[0].id
  );
  createTask(
    ['The Batman', 'HBO Max', '2022-03-04', false, false],
    projects[1].id
  );
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
  checkStorage();
  renderPage(
    allTasks(projects),
    homeLinks[0],
    homeLinks[0].toLowerCase().replace(/\s/g, '-'),
    homeLinks,
    projects
  );
};

export default init;
