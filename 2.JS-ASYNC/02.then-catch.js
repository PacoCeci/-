// ##############################
// ##############################
// ##############################
const p1 = Promise.resolve().then(() => {
  return 100;
});

p1.then(() => {
  console.log('123');
});

// #############################################
// then 正常返回 resolved，里面有报错则返回 rejected
// #############################################

const p2 = Promise.resolve().then(() => {
  throw new Error('error from p2!');
});

p2.then(() => {
  console.log('456');
}).catch((error) => {
  console.error(error); //  触发
});

// #############################################
// catch 正常返回 resolved，里面有报错则返回 rejected
// #############################################

const p3 = Promise.reject('error from p3').catch((error) => {
  console.log(error);
});

p3.then(() => console.log('p3')); // p3是resolved，触发then

const p4 = Promise.reject('error from p4!').catch((error) => {
  throw new Error(error);
});

p3.then(() => {
  console.log('p4');
}).catch((error) => {
  console.error(error); // p4是rejected，触发catch
});
