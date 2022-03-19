export const createDomElement = (text, className, tag) => {
  return Object.assign(document.createElement(tag), {
    className: className,
    textContent: text,
  });
};

export const createOptionsMenu = (text, type) => {
  const dropDown = createDomElement('', 'dropdown-menu', 'div');
  dropDown.classList.add('hidden');

  const itemRenameEdit = createDomElement(text, 'dropdown-options', 'button');
  itemRenameEdit.id = `${type}-${text.toLowerCase()}`;

  const itemDelete = createDomElement('Delete', 'dropdown-options', 'button');
  itemDelete.id = `${type}-delete`;

  dropDown.appendChild(itemRenameEdit);
  dropDown.appendChild(itemDelete);

  return dropDown;
};
