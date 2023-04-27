// 函数作为返回值
function create() {
  let a = 100;
  return function () {
    console.log(a);
  };
}

const fn = create();
const a = 200;
fn();

// 函数作为参数
function print(fn) {
  const b = 400;
  fn();
}

const fn2 = () => console.log(b);

const b = 300;
print(fn2);
