import { createDomElement } from './helper';
import Logo from '../images/logo.png';

export const createHeader = () => {
  let fragment = document.createDocumentFragment();

  fragment.appendChild(
    createDomElement('menu', 'material-icons-round menu-icon', 'span')
  );

  fragment.appendChild(createLogoSection());

  return fragment;
};

const createLogoSection = () => {
  const logoSection = createDomElement('', 'logo-section', 'div');
  const title = createDomElement('Todo', 'header-title', 'div');

  title.appendChild(createDomElement('List', 'header-title-text', 'span'));
  logoSection.appendChild(createLogo());
  logoSection.appendChild(title);

  return logoSection;
};

const createLogo = () => {
  const logo = new Image();
  logo.id = 'header-logo';
  logo.src = Logo;

  return logo;
};
