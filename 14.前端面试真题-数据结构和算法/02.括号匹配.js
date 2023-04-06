// ## 题目
// 一个字符串内部可能包含 `{ }` `( )` `[ ]` 三种括号
// 判断该字符串是否是括号匹配的。
// 如 `(a{b}c)` 就是匹配的， `{a(b` 和 `{a(b}c)` 就是不匹配的。

// ## 实现思路
// 栈 Stack
// - 遇到左括号 `{ ( [` 则压栈
// - 遇到右括号 `} ) ]` 则判断栈顶，相同的则出栈
// - 最后判断栈 length 是否为 0

// ## 代码
export function match(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
      stack.push(str[i]);
    } else if (str[i] === ')' || str[i] === ']' || str[i] === '}') {
      if (stack.length === 0) return false;
      const m = stack.pop();
      if (
        (str[i] === ')' && m !== '(') ||
        (str[i] === ']' && m !== '[') ||
        (str[i] === '}' && m !== '{')
      ) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
console.log(match('[a]{()s}(f)'));
console.log(match('{{}(a)'));
