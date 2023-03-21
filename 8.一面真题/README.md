## 1. var, let 和 const 的区别

1. var 是 ES5 及之前的语法，let const 是 ES6 语法
2. var 和 let 是变量，可修改；const 是常量，不可修改
3. var 有变量提升，let const 没有

```js
// var 变量提升
console.log('a', a); // undefined
var a = 100;

// let 没有变量提升
console.log('b', b); // ReferenceError: b is not defined
let b = 200;
```

4. var 没有块级作用域，let const 有 （ES6 语法有块级作用域）

```js
// var 没有块级作用域
for (var i = 0; i < 10; i++) {
  var j = 1 + i;
}
console.log(i, j); // 10 10

// let 有块级作用域
for (let x = 0; x < 10; x++) {
  let y = 1 + x;
}
console.log(x, y); // ReferenceError: x is not defined
```

## 2. typeof 返回哪些类型

1. `undefined`, `string`, `number`, `boolean`, `symbol`
2. `object` (注意：`typeof null === 'object'`)
3. `function`

```js
// 判断所有值类型
let a;
console.log(a); // 'undefined'
const str = 'abc';
typeof str; // 'string'
const n = 100;
typeof n; // 'number'
const b = true;
typeof b; // 'boolean'
const s = Symbol('s');
typeof s; // 'symbol'
```

## 3. 列举强制类型转换和隐式类型转换

- 强制 `parseInt` `parseFloat` `toString`
- 隐式 `if` ，`==` ， `+` 拼接字符串

## 4. 手写深度比较，如 lodash isEqual

## 5. `split()` 和 `join()` 的区别

```js
'1-2-3'.split('-'); // ['1', '2', '3']
[1, 2, 3].join('-'); // '1-2-3'
```

## 6. 数组的 `pop()` `push()` `unshift()` `shift()` 分别做什么

1. 功能是什么？
2. 返回值是什么？
3. 是否改变原数组？

## 7. 数组的纯函数的 API

1. 什么是纯函数？
   - 不改变原数组
   - 返回一个数组
2. 有哪些纯函数的 API？
   - `concat()`
   - `map()`
   - `filter()`
   - `slice()`

## 8. `slice()`和`splice()`的区别

1. `slice(startIndex?, endIndex?)`
   - 切片
   - 纯函数
2. `splice(startIndex, deleteCount?, item1?, item2?, itemN?)`
   - 剪接
   - 非纯函数

## 9. [10, 20, 30].map(parseInt)

1. 思考：
   - map 的参数和返回值
   - parseInt 参数和返回值
2. 拆解：

```js
[10, 20, 30].map((item, index) => {
  return parseInt(item, index);
});
```

3. 答案：**[10, NaN, NaN]**
   - 第一个 NaN 是因为 parseInt 的 index 范围是 2 到 36
   - 第二个 NaN 是因为 2 进制不能有 3

## 10. GET 和 POST 的区别

1. GET 一般用于查询，POST 一般用于用户提交操作
2. GET 参数拼接在 url 上，POST 放在请求体内（数据体积更大）
3. 安全性：POST 易于防止 CSRF 攻击

## 11. call 和 apply 的区别

1. 都是用来调用函数，改变函数体内的 `this` 关键字
2. 区别在于传参不同
   - `call` 接受参数列表：函数上下文对象，和参数列表 `fn.call(this, p1, p2, p3)`
   - `apply` 只接受两个参数：函数上下文对象，和数组 `fn.apply(this, [p1, p2, p3])`

## 12. 如何阻止事件冒泡和默认行为

1. 阻止事件冒泡：`event.stopPropagation()`
2. 阻止事件默认行为：`event.preventDefault()`

## 13. 解释 jsonp 的原理，为什么不是真正的 ajax

1. 浏览器的同源策略和跨域
2. 哪些 html 标签能绕过跨域 - `script`，`img`，`link`

## 14. new Object() 和 Object.create()区别

1. {} 等同于 new Object()，原型是 Object.prototype
   - `const obj = new Object(obj1);`，那么 `obj === obj1` 为 true
2. `Object.create({...});` 可指定原型，它创建一个空对象，然后把空对象的原型指向参数
   - `const obj = Object.create(obj1);` 原型指向 obj1，`obj.__proto__ === obj1;` 为 true
   - `Object.create(null);` 没有原型

## 15. 常用的正则表达式

- 字母开头，后面接字母数字下划线，总长度 6-30：`/^[a-zA-Z]\w{5, 29}$/`
- 邮政编码 6 位数字：`/\d{6}/`
- 日期 yyyy-mm-dd：`/^\d{4}-\d{1, 2}-\d{1, 2}$/`
- 手写 trim：
  ```js
  String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
  ```

## 16. JavaScript 继承

1. class 继承
2. prototype 继承
   - **原型链继承**
     - 核心代码是`Child.prototype = new Parent();`
     - 缺点：
       - 多个实例对引用类型的操作会被篡改
       - 在创建子类的实例时，不能向父类的构造函数中传递参数
   - **借用构造函数继承**
     - 原理：使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
     - 核心代码是`Parent.call(this)`，创建子类实例时调用 Parent 构造函数，于是 Child 的每个实例都会将 Parent 中的属性复制一份。
     - 缺点：
       - 只能继承父类的实例属性和方法，不能继承原型属性/方法
       - 无法实现复用，每个子类都有父类实例函数的副本，影响性能
   - **组合继承**
     - 原理：用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。
     - 核心代码是：
       - 两次调用 Parent()
       - `Child_c.prototype.constructor = Child_c;` 重写 Child_c.prototype 的 constructor 属性，指向自己的构造函数 Child_c
     - 缺点：
       - 第一次调用 Parent()：给 Child.prototype 写入两个属性 name，color。
       - 第二次调用 Parent()：给 instance 写入两个属性 name，color。
       - 实例对象 instance 上的两个属性就屏蔽了其原型对象 Child.prototype 的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。
   - **寄生组合式继承** - 原理：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。就是使用寄生式继承来继承父类的原型，然后再将结果指定给子类的原型。

![image](%E7%BB%A7%E6%89%BF.png)

## 17. 如何捕获 JS 异常

1. 手动：`try { ... } vatch (error){ ... }`
2. 自动：`window.onerror = function(message, source, lineNum, colNum, error){ ... }`
   - 对于跨域的 js，如 cdn，不会有详细的报错信息
   - 对于压缩的 js，还要配合 sourceMap 反查到未压缩代码的行和列

## 18. 介绍 requestAnimationFrame

1. 通过浏览器的优化机制，在重绘之前更新动画，减少不必要的计算和减少功耗
2. 想要动画流畅，更新频率要 60 帧/s，即 16.67 秒就要更新一次

## 19. Map 和 Object 的区别

1. Map 的 key 可以是任意类型， Object 的 key 只能是 string
2. Map 有序, Object 无序
3. Map 操作同样很快

## 20. Set 和数组的区别

1. Set 无序，数组有序

## 21 WeakMap 和 WeakSet

1. 弱引用，防止内存泄漏
2. WeakMap 只能用对象作为 key，WeakSet 只能用对象做 value
3. 没有 forEach 和 size，只有 set，add，delete，has
4. WeakMap 使用场景：关联两个 objects 但是不建立直接的联系
