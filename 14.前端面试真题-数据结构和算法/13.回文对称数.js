// ## 题目
// 打印 1-10000 之间的对称数

// ## 实现思路
// 使用字符串头尾比较
// - 数字转换为字符串
// - 字符串头尾比较

// ## 性能分析
// 时间复杂度 `O(n)`

// ## 代码

export function palindome(num) {
  const res = [];
  for (let i = 0; i <= num; i++) {
    let s = i.toString();
    let isPalindome = true;
    for (let j = 0, k = s.length - 1; j < k; j++, k--) {
      if (s[j] !== s[k]) {
        isPalindome = false;
        break;
      }
    }

    if (isPalindome) res.push(i);
  }

  return res;
}
