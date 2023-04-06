// ## 题目
// 输入一个递增的数字数组，和一个数字 `n` 。求和等于 `n` 的两个数字。<br>
// 例如输入 `[1, 2, 4, 7, 11, 15]` 和 `15` ，返回两个数 `[4, 11]`

// ## 实现思路
// 思路1：嵌套循
// - 找个一个数，
// - 再遍历剩余的数，
// - 求和，判断。
// - 时间复杂度 `O(n^2)`
// 思路2：双指针（指针就是索引，如数组的 index）
// - i 指向头，j 指向尾， 求 i + j 的和
// - 和如果大于 n ，则说明需要减少，则 j 向前移动（递增特性）
// - 和如果小于 n ，则说明需要增加，则 i 向后移动（递增特性）

// ## 代码
// 思路2：双指针
export function get2SumSorted(arr, num) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    if (arr[left] + arr[right] === num) {
      return [left, right];
    }

    if (arr[left] + arr[right] < num) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return [-1, -1];
}
