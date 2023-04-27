async function async1() {
  console.log('async1 starts'); // 2
  await async2();
  // 微任务1
  console.log('async1 ends'); // 6
}

async function async2() {
  console.log('async2'); // 3
}

console.log('script starts'); // 1

setTimeout(() => {
  // 宏任务 setTimeout
  console.log('setTimeout'); // 8
});

async1();

// 初始化 Promise 时，传入的函数会立刻执行
new Promise((resolve) => {
  console.log('promise 1'); // 4
  resolve();
}).then(() => {
  // 微任务2
  console.log('promise 2'); // 7
});

console.log('script ends'); // 5
