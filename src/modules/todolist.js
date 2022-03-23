import { format, formatISO, parse, parseISO } from 'date-fns';
import { createDomElement, createOptionsMenu } from './helper';

export const createTodoList = (project, tabName, homeLinks) => {
  // const todoList = createDomElement('', 'todo-list-container', 'div');
  let fragment = document.createDocumentFragment();
  // todoList.id = tabID;
  fragment.appendChild(createTodoHeader(tabName));
  fragment.appendChild(createTodoListItems(project));
  if (!homeLinks.includes(tabName)) {
    const addTask = createDomElement('', 'add-task', 'div');
    addTask.appendChild(
      createDomElement('add', 'material-icons-round add', 'span')
    );
    addTask.appendChild(createDomElement('Add Task', 'add-btn-text', 'div'));
    fragment.appendChild(taskForm('Add', ''));
    fragment.appendChild(addTask);
  }

  return fragment;
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
  const checkMark = createDomElement('', 'item-check', 'div');
  const star = createDomElement('star', 'material-icons-round star', 'span');

  if (projectItem.complete === true) {
    column.classList.add('text-true');
    checkMark.classList.add('check-true');
  }

  if (projectItem.important === true) {
    star.classList.add('star-true');
  } else {
    star.textContent += '_border';
  }

  column.appendChild(createDomElement(projectItem.title, 'item-title', 'div'));
  column.appendChild(
    createDomElement(projectItem.description, 'item-description', 'div')
  );

  item.appendChild(checkMark);
  item.appendChild(column);
  item.appendChild(createDomElement(formattedDate, 'item-date', 'div'));
  item.appendChild(star);

  item.appendChild(
    createDomElement('more_vert', 'material-icons-round more-icon', 'span')
  );
  item.appendChild(createOptionsMenu('Edit', 'task'));

  return item;
};

export const taskForm = (type, values) => {
  const form = createDomElement('', `${type.toLowerCase()}-task-form`, 'form');
  const inputs = createDomElement('', 'form-inputs', 'div');
  const taskTitle = createDomElement('', 'task-input', 'input');
  const taskDescription = createDomElement('', 'task-input', 'textarea');
  const taskDueDate = createDomElement('', 'task-input', 'input');
  const formBtns = createDomElement('', 'form-btns-input', 'div');
  const addEditBtn = createDomElement(type, 'form-btn', 'button');
  const cancelBtn = createDomElement('Cancel', 'form-btn', 'button');

  if (type === 'Add') {
    form.classList.add('hidden');
    taskTitle.placeholder = 'Enter Task Title';
    taskDescription.placeholder = 'Enter Task Description';
  }

  if (values.length > 0) {
    console.log(values);
    taskTitle.value = values[0];
    taskDescription.value = values[1];
    taskDueDate.value = formatISO(parse(values[2], 'MM/dd/yyyy', new Date()), {
      representation: 'date',
    });
  }

  taskTitle.id = 'task-title-input';
  taskTitle.type = 'text';
  // taskTitle.maxLength = '25';
  taskTitle.required = true;

  taskDescription.id = 'task-description-input';
  taskDescription.required = true;

  taskDueDate.id = 'task-duedate-input';
  taskDueDate.type = 'date';
  taskDueDate.required = true;
  // taskDueDate.value = formatISO(new Date(), { representation: 'date' });

  addEditBtn.id = `${type.toLowerCase()}-task-btn`;
  addEditBtn.type = 'submit';

  cancelBtn.id = 'cancel-task-btn';
  cancelBtn.type = 'button';

  formBtns.appendChild(addEditBtn);
  formBtns.appendChild(cancelBtn);
  inputs.appendChild(createDomElement('Title:', 'input-label', 'label'));
  inputs.appendChild(taskTitle);
  inputs.appendChild(createDomElement('Description:', 'input-label', 'label'));
  inputs.appendChild(taskDescription);
  inputs.appendChild(createDomElement('Due Date:', 'input-label', 'label'));
  inputs.appendChild(taskDueDate);
  inputs.appendChild(formBtns);

  form.appendChild(inputs);

  return form;
};
