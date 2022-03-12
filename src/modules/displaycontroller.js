import { createHeader } from './header';
import { createNav } from './nav';
import { createTodoList } from './todolist';

const content = document.getElementById('content');

export const hiddenElement = (element) => {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

export const renderPage = (
  project,
  tabName,
  tabID,
  homeLinks,
  projectLinks
) => {
  content.replaceChildren();
  //   console.log(project);
  //   console.log(tabName);
  //   console.log(tabID);
  //   console.log(homeLinks);
  //   console.log(projectLinks);
  //   console.log('--------------');
  content.appendChild(createHeader());
  content.appendChild(createNav(homeLinks, projectLinks, tabID));
  content.appendChild(createTodoList(project, tabName));
};
