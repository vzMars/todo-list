import { createDomElement } from './helper';

export const createTodoList = (project, tabName) => {
  const todoList = createDomElement('', 'todo-list-container', 'div');

  todoList.appendChild(createTodoHeader(tabName));
  todoList.appendChild(createTodoListItems(project));

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
  const item = createDomElement('', 'item', 'li');
  item.id = projectItem.id;

  item.appendChild(itemDetails(projectItem));

  return item;
};

const itemDetails = (projectItem) => {
  const details = createDomElement('', 'item-details', 'div');
  details.appendChild(
    leftSection(
      projectItem.title,
      projectItem.description,
      projectItem.complete
    )
  );
  details.appendChild(
    rightSection(
      projectItem.dueDate,
      projectItem.priority,
      projectItem.important
    )
  );

  return details;
};

const leftSection = (title, description, complete) => {
  const section = createDomElement('', 'left-section', 'div');
  const column = createDomElement(
    '',
    `details-column-${String(complete)}`,
    'div'
  );

  column.appendChild(createDomElement(title, 'item-title', 'div'));
  column.appendChild(createDomElement(description, 'item-description', 'div'));

  section.appendChild(
    createDomElement('', `item-check-${String(complete)}`, 'div')
  );
  section.appendChild(column);

  return section;
};

const rightSection = (dueDate, priority, important) => {
  const section = createDomElement('', 'right-section', 'div');
  const column = createDomElement('', 'details-column', 'div');

  column.appendChild(createDomElement(dueDate, 'item-date', 'div'));
  column.appendChild(
    createDomElement(priority, `item-priority ${priority.toLowerCase()}`, 'div')
  );

  section.appendChild(column);
  if (important) {
    section.appendChild(
      createDomElement('star', 'material-icons-round star-true', 'span')
    );
  } else {
    section.appendChild(
      createDomElement('star_border', 'material-icons-round star-false', 'span')
    );
  }

  section.appendChild(
    createDomElement('more_vert', 'material-icons-round more-icon', 'span')
  );

  return section;
};
