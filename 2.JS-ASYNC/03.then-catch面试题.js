// ########1###############
// ########1###############
// ########1###############
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });

// 输出为：1, 3

// ########2###############
// ########2###############
// ########2###############
Promise.resolve()
  .then(() => {
    console.log(4);
    throw new Error('error 4');
  })
  .catch(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 输出为：4, 5, 6

// ########3###############
// ########3###############
// ########3###############
Promise.resolve()
  .then(() => {
    console.log(7);
    throw new error('error 7');
  })
  .catch(() => {
    console.log(8);
  })
  .catch(() => {
    console.log(9);
  });

// 输出为：7, 8
