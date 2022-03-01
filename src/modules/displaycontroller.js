import { createHeader } from './header';
import { createTodoList } from './todolist';

const content = document.getElementById('content');

export const renderPage = (project, tab) => {
  content.appendChild(createHeader());
  content.appendChild(createTodoList(project, tab));
};
