import { createDomElement, createOptionsMenu } from './helper';
import All from '../images/all.png';
import Today from '../images/today.png';
import Week from '../images/7day.png';
import Star from '../images/star.png';

const imgs = [All, Today, Week, Star];

export const createNav = (homeLinks, projectLinks, tabID) => {
  let fragment = document.createDocumentFragment();

  fragment.appendChild(homeSection(homeLinks, tabID));
  fragment.appendChild(projectSection(projectLinks, tabID));

  return fragment;
};

const homeSection = (homeLinks, tabID) => {
  const home = createDomElement('', 'home-section', 'div');
  const title = createDomElement('Home', 'home-title', 'h2');

  home.appendChild(title);
  home.appendChild(createHomeLinks(homeLinks, tabID));
  return home;
};

const createHomeLinks = (homeLinks, tabID) => {
  const links = createDomElement('', 'home-links', 'div');

  for (let i = 0; i < homeLinks.length; i++) {
    links.appendChild(createHomeLink(homeLinks[i], imgs[i], tabID));
  }

  return links;
};

const createHomeLink = (homeLink, src, tabID) => {
  const link = createDomElement('', 'home-link', 'div');
  const linkText = createDomElement(homeLink, 'home-link-text', 'div');
  link.id = homeLink.toLowerCase().replace(/\s/g, '-');

  if (homeLink.toLowerCase().replace(/\s/g, '-') === tabID) {
    link.classList.add('active-tab');
  }

  link.appendChild(createImage(src));
  link.appendChild(linkText);

  return link;
};

const projectSection = (projectLinks, tabID) => {
  const project = createDomElement('', 'project-section', 'div');
  const title = createDomElement('Projects', 'project-title', 'h2');

  project.appendChild(title);
  project.appendChild(createProjectLinks(projectLinks, tabID));

  return project;
};

const createProjectLinks = (projectLinks, tabID) => {
  const links = createDomElement('', 'project-links', 'div');
  const addProject = createDomElement('', 'add-project', 'div');

  for (let i = 0; i < projectLinks.length; i++) {
    links.appendChild(createProjectLink(projectLinks[i], tabID));
  }

  addProject.appendChild(
    createDomElement('add', 'material-icons-round add', 'span')
  );
  addProject.appendChild(
    createDomElement('Add Project', 'add-btn-text', 'div')
  );
  links.appendChild(projectForm('Add', ''));
  links.appendChild(addProject);

  return links;
};

const createProjectLink = (projectLink, tabID) => {
  const link = createDomElement('', 'project-link', 'div');
  const linkText = createDomElement(
    projectLink.title,
    'project-link-text',
    'div'
  );
  link.id = projectLink.id;

  if (projectLink.id === tabID) {
    link.classList.add('active-tab');
  }

  link.appendChild(
    createDomElement('menu', 'material-icons-round nav-icon', 'span')
  );
  link.appendChild(linkText);
  link.appendChild(
    createDomElement('more_vert', 'material-icons-round more-icon', 'span')
  );
  link.appendChild(createOptionsMenu('Rename', 'project'));

  return link;
};

const createImage = (src) => {
  const image = new Image();
  image.className = 'home-link-img';
  image.src = src;

  return image;
};

export const projectForm = (type, value) => {
  const form = createDomElement(
    '',
    `${type.toLowerCase()}-project-form`,
    'form'
  );
  const inputs = createDomElement('', 'form-inputs', 'div');
  const projectName = createDomElement('', 'project-name-input', 'input');
  const formBtns = createDomElement('', 'form-btns-input', 'div');
  const addRenameBtn = createDomElement(type, 'form-btn', 'button');
  const cancelBtn = createDomElement('Cancel', 'form-btn', 'button');

  if (type === 'Add') {
    form.classList.add('hidden');
    projectName.placeholder = 'Enter Project Name';
  }

  if (value.length > 0) {
    projectName.value = value;
  }

  projectName.type = 'text';
  projectName.maxLength = '25';
  projectName.required = true;

  addRenameBtn.id = `${type.toLowerCase()}-project-btn`;
  addRenameBtn.type = 'submit';

  cancelBtn.id = 'cancel-project-btn';
  cancelBtn.type = 'button';

  formBtns.appendChild(addRenameBtn);
  formBtns.appendChild(cancelBtn);

  inputs.appendChild(projectName);
  inputs.appendChild(formBtns);

  form.appendChild(
    createDomElement('menu', 'material-icons-round nav-icon', 'span')
  );

  form.appendChild(inputs);

  return form;
};
