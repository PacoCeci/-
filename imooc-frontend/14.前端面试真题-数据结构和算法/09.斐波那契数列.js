// ## 题目
// 斐波那契数列
// - `f(0) = 0`
// - `f(1) = 1`
// - `f(n) = f(n - 1) + f(n - 2)` 前两个值的和

// ## 实现思路
// 思路1：递归计算
// - 时间复杂度是 `O(2^n)`
// 思路2：动态规划

// ## 代码
export function fib1(n) {
  if (n <= 1) return n;

  return fib1(n - 1) + fib1(n - 2);
}

export function fib2(n) {
  if (n <= 1) return n;

  let prev = 0,
    now = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = prev;
    prev = now;
    now = temp + prev;
  }

  return now;
}
