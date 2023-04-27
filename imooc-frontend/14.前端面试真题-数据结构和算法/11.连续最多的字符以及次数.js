// ## 题目
// 给一个字符串，找出连续最多的字符，以及次数。<br>
// 例如字符串 `'aabbcccddeeee11223'` 连续最多的是 `e` ，4 次。

// ## 实现思路 (双指针)
// 性能分析
// - 时间复杂度 `O(n)`
// - 空间复杂度 `O(1)`

// ## 代码
// 嵌套循环
export function findContinuousRepeat1(str) {
  if (str.length === 0) return null;
  let max = 0;
  let char = '';
  let curMax = 0;
  for (var i = 0; i < str.length; i++) {
    curMax = 0;
    for (var j = i; j < str.length; j++) {
      if (str[i] === str[j]) {
        curMax += 1;
      }

      // 不相等，或者已经到了最后一个元素。要去判断最大值
      if (str[i] !== str[j] || j === str.length - 1) {
        if (max < curMax) {
          char = str[i];
          max = curMax;
        }
        // 避免死循环
        if (i !== str.length - 1) {
          i = j - 1; // 跳步
        }
        break;
      }
    }
  }

  return [char, max];
}
// 双指针
export function findContinuousRepeat2(str) {
  if (str.length === 0) return null;
  let i = 0,
    j = 0;
  let max = 0;
  let char = '';
  while (j <= str.length) {
    if (str[i] !== str[j]) {
      const curMax = j - i;
      if (max < curMax) {
        max = curMax;
        char = str[i];
      }
      i = j; // 跳步
    }
    j += 1;
  }

  return [char, max];
}
