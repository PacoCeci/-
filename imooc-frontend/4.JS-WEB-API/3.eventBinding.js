// event binding that supports event delegation
function bindEvent(elem, eventType, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(eventType, (event) => {
    event.preventDefault();
    const target = event.target;
    if (selector == null) {
      fn.call(target, event);
    } else {
      if (target.nodeName === selector.toUpperCase()) {
        fn.call(target, event);
      }
    }
  });
}

// regular event binding
const pElem = document.getElementById('p');
// 注意箭头函数和普通函数对于this的影响
bindEvent(pElem, 'click', function () {
  console.log(this.textContent);
});

// delegation event binding
const containerElem = document.getElementById('container');

bindEvent(containerElem, 'click', 'A', (event) => {
  console.log(event.target.textContent);
});
