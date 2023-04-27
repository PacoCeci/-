// ## 题目
// 定义一个函数，将数组种所有的 `0` 都移动到末尾，
// 输入 `[1, 0, 3, 0, 11, 0]`
// 输出 `[1, 3, 11, 0, 0, 0]`。
// 要求：
// - 只移动 `0` ，其他数字顺序不变
// - 考虑时间复杂度
// - 必须在原数组就行操作

// ## 实现思路 (同向双指针)
// 性能分析
// - 时间复杂度 `O(n)`
// - 空间复杂度 `O(1)`

// ## 代码
export function moveZero(arr) {
  let left = 0;
  let right = 0;
  while (right < arr.length) {
    if (arr[right] !== 0) {
      swap(left, right, arr);
      left += 1;
    }
    right += 1;
  }
  return arr;
}

function swap(left, right, arr) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

// [1, 0, 3, 0, 11, 0]
