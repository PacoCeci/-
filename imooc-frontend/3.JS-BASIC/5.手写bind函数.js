Function.prototype.myBind = function () {
  // 将参数拆分为数组
  const args = Array.prototype.slice.call(arguments);
  // 获取this
  const that = args.slice(0, 1);

  const fn = this;

  return function () {
    return fn.apply(that, args.slice(1));
  };
};

function fn(a, b) {
  console.log('this --- ', this);
  console.log('a, b --- ', a, b);
  return 'this is fn';
}

const fn2 = fn.myBind({ number: 100 }, 10, 20);

fn2();
