import { createHeader } from './header';
import { createNav } from './nav';
import { createTodoList } from './todolist';

// const content = document.getElementById('content');
const header = document.querySelector('.header-section');
const nav = document.querySelector('.nav-section');
const todoList = document.querySelector('.todo-list-container');
// console.log(header);
// console.log(nav);
// console.log(todoList);

export const hiddenElement = (element) => {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

export const hideActiveDropDown = () => {
  let dropDowns = document.getElementsByClassName('dropdown-menu');
  for (let i = 0; i < dropDowns.length; i++) {
    if (!dropDowns[i].classList.contains('hidden')) {
      hiddenElement(dropDowns[i]);
    }
  }
};

export const getCurrentTab = () => {
  return document.querySelector('.active-tab');
};

export const renderPage = (
  project,
  tabName,
  tabID,
  homeLinks,
  projectLinks
) => {
  header.replaceChildren(createHeader());
  nav.replaceChildren(createNav(homeLinks, projectLinks, tabID));
  todoList.id = tabID;
  todoList.replaceChildren(createTodoList(project, tabName, homeLinks));
};
