function throttle(fn, delay = 100) {
  let timer = null;

  return function () {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

const divElem = document.getElementById('div');

const throttleFn = throttle((event) => {
  console.log(event.offsetX, event.offsetY);
}, 500);

divElem.addEventListener('drag', throttleFn);
