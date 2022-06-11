function El(tagName, attrs, ...children): HTMLElement {
  if (attrs == null) attrs = {};

  if (typeof tagName !== 'string')
    return tagName(attrs);

  const elem = document.createElement(tagName);

  for (const [key, value] of Object.entries(attrs) as [string, any][])
    if (key === 'class')
      elem.classList.add(...value.split(' '))
    else if (key.startsWith('on'))
      elem.addEventListener(key.substr(2), value)
    else {
      elem[key] = value;
      elem.setAttribute(key, value)
    }

  for (const child of children)
    if (Array.isArray(child)) elem.append(...child)
    else elem.append(child);
  return elem;
};
