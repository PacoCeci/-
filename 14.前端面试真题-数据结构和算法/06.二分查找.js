// ## 两种实现思路
// - 递归 - 代码逻辑更加简洁
// - 循环 - 性能更好（就调用一次函数，而递归需要调用很多次函数，创建函数作用域会消耗时间）

// ## 代码
// 1. 循环
export function bs1(arr, target) {
  let left = 0,
    right = arr.length - 1,
    mid;

  while (left + 1 < right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  if (arr[left] === target) return left;
  if (arr[right] === target) return right;

  return -1;
}

// 2. 递归
export function bs2(arr, target) {
  return recursion(0, arr.length - 1, arr, target);
}

function recursion(left, right, arr, target) {
  if (left + 1 >= right) {
    if (arr[left] === target) return left;
    if (arr[right] === target) return right;
    return -1;
  }
  let mid = Math.floor((left + right) / 2);
  if (arr[mid] < target) {
    return recursion(mid + 1, right, arr, target);
  } else if (arr[mid] > target) {
    return recursion(left, mid - 1, arr, target);
  } else {
    return mid;
  }
}
