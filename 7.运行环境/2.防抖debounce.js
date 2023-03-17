function dedounce(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

const inputElem = document.getElementById('input');

const debounedfn = dedounce(() => {
  console.log(inputElem.value);
}, 1000);

inputElem.addEventListener('keyup', debounedfn);
