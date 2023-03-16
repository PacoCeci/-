const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const pElem = document.createElement('p');
  pElem.textContent = 'List item ' + i;
  fragment.appendChild(pElem);
}

document.body.appendChild(fragment);
