// ## 题目
// 定义一个函数，实现数组的旋转。
// 输入 [1, 2, 3, 4, 5, 6, 7] 和 key = 3，
// 输出 [5, 6, 7, 1, 2, 3, 4]
// 考虑时间复杂度和性能

// ## 实现思路
// 思路1
// - 将 `k` 后面的元素，挨个 `pop` 然后 `unshift` 到数组前面
// 思路2
// - 将 `k` 后面的所有元素拿出来作为 `part1`
// - 将 `k` 前面的所有元素拿出来作为 `part2`
// - 返回 `part1.concat(part2)`

// ## 性能对比
// 时间复杂度
// - 思路1 - `O(n^2)`
// - 思路2 - `O(n)`
// 空间复杂度
// - 思路1 - `O(1)`
// - 思路2 - `O(n)`

// ## 代码
// 思路 1
export function rotate1(arr, k) {
  k = Math.abs(k % arr.length);
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}
console.log(rotate1([1, 2, 3, 4, 5, 6], 2));
// 思路 2
export function rotate2(arr, k) {
  k = Math.abs(k % arr.length);
  const arr1 = arr.slice(arr.length - k);
  const arr2 = arr.slice(0, arr.length - k);
  return arr1.concat(arr2);
}
console.log(rotate2([1, 2, 3, 4, 5, 6], 2));
