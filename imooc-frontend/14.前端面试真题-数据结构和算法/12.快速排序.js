// ## 题目
// 用 Javascript 实现快速排序，并说明时间复杂度。

// ## 实现思路 (双指针)
// - 找到中间位置 midValue
// - 遍历数组，小于 midValue 放在 left ，大于 midValue 放在 right
// - 继续递归，concat 拼接

// ## 性能分析
// 快速排序 时间复杂度 `O(n*logn)` —— 有遍历，有二分

// ## 代码
export function quickSort1(arr) {
  if (arr.length <= 1) return arr;
  let left = [],
    right = [],
    pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return quickSort1(left).concat(pivot, quickSort1(right));
}

export function quickSort2(arr) {
  helper(arr, 0, arr.length - 1);
  return arr;
}

function helper(arr, start, end) {
  if (start >= end) return;
  let pivot = arr[end];

  let i = start,
    j = start;
  while (j < end) {
    if (arr[j] < pivot) {
      swap(i, j, arr);
      i += 1;
    }
    j += 1;
  }
  swap(i, end, arr);
  helper(arr, start, i - 1);
  helper(arr, i + 1, end);
}

function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
