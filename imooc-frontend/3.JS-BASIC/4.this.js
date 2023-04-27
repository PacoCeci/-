// 作为普通函数
function fn() {
  console.log(this);
}

fn(); // window

// 使用 call apply bind
fn.call({ from: 'call' }); // { from: 'call' }
fn.bind({ from: 'bind' })(); // { from: 'bind' }

// 作为对象方法被调用
const info = {
  name: 'Paco',
  sayHi: function () {
    console.log('sayHi: ', this); // info
  },
  wait() {
    setTimeout(function () {
      console.log('wait: ', this); // window
    });
  },
  waitAgain() {
    setTimeout(() => {
      console.log('waitAgain: ', this); // info
    });
  },
};

info.sayHi();
info.wait();
info.waitAgain();

// 在 class 方法中调用
class People {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log('class', this);
  }
}

const p = new People('Paco');
p.sayHi(); // People { name: 'Paco' }

// 箭头函数 -> 见作为对象方法被调用
