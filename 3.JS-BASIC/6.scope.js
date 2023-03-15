let i, aElem;
for (i = 0; i < 10; i++) {
  aElem = document.createElement('a');
  aElem.innerHTML = i + '<br>';
  aElem.addEventListener('click', () => {
    alert(i);
  });
  document.body.appendChild(aElem);
}
