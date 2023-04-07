// 首次执行有delay，节流期间所有 action 无效
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

// 首次执行马上运行，节流期间last one wins
function throttle2(fn, delay = 100) {
  let isBusy = true;
  let lastArgs = null;

  const startCooling = function () {
    setTimeout(() => {
      isBusy = false;
      if (lastArgs) {
        isBusy = true;
        fn.apply(this, lastArgs);
        lastArgs = null;
        startCooling();
      }
    }, delay);
  };
  return function () {
    if (isBusy) {
      lastArgs = arguments;
    } else {
      isBusy = true;
      fn.apply(this, arguments);
      startCooling.apply(this);
    }
  };
}

const divElem = document.getElementById('div');

const throttleFn = throttle((event) => {
  console.log(event.offsetX, event.offsetY);
}, 500);

divElem.addEventListener('drag', throttleFn);
