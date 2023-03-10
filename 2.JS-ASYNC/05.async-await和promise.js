// ###############1###############
// ###############1###############
// ###############1###############
(async function () {
  const p1 = await Promise.resolve(100); // await 相当于 Promise then
  console.log('p1', p1);
})();

// ###############2###############
// ###############2###############
// ###############2###############
(async function () {
  const p2 = await 200; // 封装200，相当于 await Promise.resolve(200);
  console.log('p2', p2);
})();

// ###############3###############
// ###############3###############
// ###############3###############
async function fn() {
  return Promise.resolve(300);
}

(async function () {
  const p3 = await fn();
  console.log('p3', p3);
})();

// ###############4###############
// ###############4###############
// ###############4###############

(async function () {
  try {
    await Promise.reject('error from p4');
  } catch (error) {
    console.log('p4', error); // try...catch 相当于 Promise catch
  }
})();

// ###############5###############
// ###############5###############
// ###############5###############

(async function () {
  const p5 = await Promise.reject('error from p5'); // 报错
  console.log(p5); // 不会执行
})();
