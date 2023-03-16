const containerElem = document.getElementById('container');

containerElem.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName === 'A') {
    console.log(target.textContent);
  }
});
