export const createDomElement = (text, className, tag) => {
  return Object.assign(document.createElement(tag), {
    className: className,
    textContent: text,
  });
};
