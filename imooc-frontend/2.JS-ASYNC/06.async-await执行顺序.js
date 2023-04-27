async function async1() {
  console.log('async1 starts'); // 2
  await async2();
  // await后面的内容相当于callback里面的内容，即异步
  // 需要等所有同步代码执行完之后触发event loop才执行
  console.log('async1 ends'); // 5
  await async3();
  console.log('async1 ends 2'); // 7
}

async function async2() {
  console.log('async2'); // 3
}

async function async3() {
  console.log('async3'); // 6
}

console.log('script starts'); // 1
async1();
console.log('script ends'); // 4
