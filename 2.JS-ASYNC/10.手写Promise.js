class MyPromise {
  state = 'pending'; // 状态：pending， fulfilled， rejected
  value = undefined; // 成功后的值
  reason = undefined; // 失败后的原因
  resolvedCallbacks = []; // pending状态下，存储成功的回调
  rejectedCallbacks = []; // pending状态下，存储失败的回调

  constructor(fn) {
    const resolveHandler = (value) => {
      // 状态不可逆，所以要判断
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.resolvedCallbacks.forEach((fn) => {
          fn(this.value);
        });
      }
    };
    const rejectHandler = (reason) => {
      // 状态不可逆，所以要判断
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectedCallbacks.forEach((fn) => {
          fn(this.reason);
        });
      }
    };
    try {
      fn(resolveHandler, rejectHandler);
    } catch (error) {
      rejectHandler(error);
    }
  }

  then(fn1, fn2) {
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;

    // 当状态是 fulfilled 的时候，执行fn1
    if (this.state === 'fulfilled') {
      return new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value);
          resolve(newValue);
        } catch (error) {
          reject(error);
        }
      });
    }

    // 当状态是 rejected 的时候，执行fn2
    if (this.state === 'rejected') {
      return new MyPromise((_, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (error) {
          reject(error);
        }
      });
    }

    // 当状态是 pending 的时候，需要把 fn1，fn2 存起来
    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          try {
            const newValue = fn1(this.value);
            resolve(newValue);
          } catch (error) {
            reject(error);
          }
        });

        this.rejectedCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            reject(newReason);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  }

  catch(fn) {
    return this.then(null, fn);
  }
}

MyPromise.resolve = function (value) {
  // 避免重复包装MyPromise
  if (value instanceof MyPromise) return value;
  return new MyPromise((resolve) => resolve(value));
};

MyPromise.reject = function (reason) {
  return new MyPromise((_, reject) => reject(reason));
};

MyPromise.all = function (promiseList = []) {
  return new MyPromise((resolve, reject) => {
    const length = promiseList.length;
    const result = new Array(length);
    let resolvedCount = 0;

    promiseList.forEach((promise, index) => {
      // 如果传进来的不是MyPromise，试图转化成MyPromise
      MyPromise.resolve(promise)
        .then((data) => {
          // 用index保证顺序
          result[index] = data;
          resolvedCount += 1;
          if (resolvedCount === length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

MyPromise.race = function (promiseList = []) {
  let resolved = false;
  return new MyPromise((resolve, reject) => {
    promiseList.forEach((promise) => {
      // 如果传进来的不是MyPromise，试图转化成MyPromise
      MyPromise.resolve(promise)
        .then((data) => {
          if (resolved === false) {
            resolved = true;
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// ########## 同步resolve ###########
const p1 = new MyPromise((resolve, reject) => {
  resolve(100);
});

const p1_1 = p1.then((data) => {
  console.log(data);
  return data + 1;
});

const p1_2 = p1_1.then((data) => {
  console.log(data);
  return data + 2;
});

// ######### 同步reject ############
const p2 = new MyPromise((resolve, reject) => {
  reject(200);
});

p2.catch((error) => {
  console.error(error);
});

// ######### 异步resolve ############
const p3 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(300);
  }, 1000);
});

p3.then((data) => {
  console.log(data);
});

// ######### MyPromise.resolve ############
const p4 = MyPromise.resolve(400);

p4.then((data) => {
  console.log(data);
});

// ######### MyPromise.all (resolve) ############
const p5 = MyPromise.all([
  MyPromise.resolve(500),
  600,
  new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(700);
    }, 100);
  }),
]);

p5.then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});

// ######### MyPromise.all (reject) ############
const p6 = MyPromise.all([
  MyPromise.resolve(800),
  MyPromise.reject('error from p6'),
]);

p6.then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});

// ######### MyPromise.race ############
const p7 = MyPromise.race([
  new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(900);
    }, 100);
  }),
  MyPromise.resolve(1000),
]);

p7.then((data) => {
  console.log(data);
});
