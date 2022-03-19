import { format } from 'date-fns';
import { createDomElement, createOptionsMenu } from './helper';

export const createTodoList = (project, tabName, tabID, homeLinks) => {
  const todoList = createDomElement('', 'todo-list-container', 'div');
  todoList.id = tabID;
  console.log(homeLinks);
  todoList.appendChild(createTodoHeader(tabName));
  todoList.appendChild(createTodoListItems(project));
  if (!homeLinks.includes(tabName)) {
    const addTask = createDomElement('', 'add-task', 'div');
    addTask.appendChild(
      createDomElement('add', 'material-icons-round add', 'span')
    );
    addTask.appendChild(createDomElement('Add Task', 'add-btn-text', 'div'));
    todoList.appendChild(addTask);
  }

  return todoList;
};

const createTodoHeader = (tabName) => {
  const header = createDomElement(tabName, 'todo-list-title', 'div');

  return header;
};

const createTodoListItems = (project) => {
  const todoListItems = createDomElement('', 'todo-list-items', 'ul');

  for (let i = 0; i < project.length; i++) {
    todoListItems.appendChild(createItem(project[i]));
  }

  return todoListItems;
};

const createItem = (projectItem) => {
  let formattedDate = format(projectItem.dueDate, 'MM/dd/yyyy');
  const item = createDomElement('', 'item', 'li');
  item.id = projectItem.id;
  const column = createDomElement('', 'details-column', 'div');

  if (projectItem.complete === true) {
    column.classList.add('true');
  }

  column.appendChild(createDomElement(projectItem.title, 'item-title', 'div'));
  column.appendChild(
    createDomElement(projectItem.description, 'item-description', 'div')
  );

  item.appendChild(
    createDomElement('', `item-check-${String(projectItem.complete)}`, 'div')
  );
  item.appendChild(column);
  item.appendChild(createDomElement(formattedDate, 'item-date', 'div'));
  if (projectItem.important) {
    item.appendChild(
      createDomElement('star', 'material-icons-round star-true', 'span')
    );
  } else {
    item.appendChild(
      createDomElement('star_border', 'material-icons-round star-false', 'span')
    );
  }
  item.appendChild(
    createDomElement('more_vert', 'material-icons-round more-icon', 'span')
  );
  item.appendChild(createOptionsMenu('Edit', 'task'));

  return item;
};
