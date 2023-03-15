# 1. 变量类型和计算

## 1. 变量类型

### 1. 值类型和引用类型

1. 为什么要分值类型和引用类型？
   - 耗费性能
   - 占用空间
2. 值类型存放在栈，引用类型存放在堆

### 2. 常见值类型

```
let a;                  // 'undefined'
const s = 'abc';        // 'string'
const n = 100;          // 'number'
const b = true;         // 'boolean'
const s = Symbol('s');  // 'symbol'
```

### 3. 常见引用类型

```
const obj = { x: 100 };     // object
const arr = ['a', 'b'];     // array
const n = null;             // 特殊引用类型，指针指向为空地址
function fn() {};           // 特殊引用类型，但不用于存储数据，所以没有“拷贝、复制函数”这一说
```

### 4. 类型判断 typeof

1. 能判断所有值类型

```
// 判断值类型
let a;
typeof a;       // 'undefined'

const str = 'abc';
typeof str;     // 'string'

const n = 100;
typeof n;       // 'number'

const b = true;
typeof b;       // 'boolean'

const s = Symbol('s');
typeof s;       // 'symbol'
```

2. 能判断函数

```
// 判断函数
typeof console.log;     // 'function'
typeof function () {}   // 'function'
```

3. 能识别引用类型，但是不能细分

```
// 能识别引用类型（不能再继续识别）
typeof null;        // 'object'
typeof ['a', 'b'];  // 'object'
typeof { x: 100 };  // 'object'
```

## 2. 变量计算

### 1. 类型转换

1. 字符串拼接

```
const a = 100 + 10;     // 110
const b = 100 + '10';   // '10010'
const c = true + '10';  // 'true10'
```

2. == 会尝试强制类型转换

推荐用 ===，除了判断是 null 或者 undefined 时用 `if (obj.a == null)`

```
100 == '100';       // true
0 == '';            // true
0 == false;         // true
false == '';        // true
null == undefined;  // true
```

3. if 语句和逻辑运算

- falsely 变量
  - 0
  - NaN
  - ''
  - null
  - undefined
  - false
- 逻辑运算
  - &&
  - ||
  - ！

```
console.log(10 && 0);        // 0
console.log('' || 'abc');    // 'abc'
console.log(!window.abc);    // true
```

# 2. 原型和原型链

## 1. class

1. constructor
2. 属性
3. 方法

## 2. 继承 extends

## 3. 类型判断 instanceof

```
class People {}

class Student extends People {}

const s = new Student();

s instanceof Student;   // true
s instanceof People;    // true
s instanceof Object;    // true

[] instanceof Array;    // true
[] instanceof Object;   // true

{} instanceof Object;   // true
```

## 4. 原型

1. class 实际上是函数

```
typeof People;  // 'function'
typeof Student; // 'function'
```

2. 显示原型和隐式原型
   - 每个 class 都有显示原型 prototype
   - 每个实例都有隐式原型\_\_proto\_\_
   - 实例的 \_\_proto\_\_ 指向对应 class 的 prototype

```
console.log( Student.prototype );   // People {constructor: ƒ}
console.log( s.__proto__ );         // People {constructor: ƒ}
console.log( s.__proto__ === Student.prototype );   // true
```

3. 基于原型的执行规则
   - 先在自身属性和方法寻找
   - 如果找不到就去 \_\_proto\_\_ 中查找

## 5. 原型链

```
Student.prototype.__proto__ === People.prototype; // true
```

![image](%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

1. class 是 ES6 语法规范，由 ECMA 发布，ECMA 没有规定如何实现
2. V8 引擎实现

# 3. 作用域和自由变量

## 1. 作用域

1. 全局作用域
2. 函数作用域
3. 块级作用域（ES6）

## 2. 自由变量

1. 一个变量在当前作用域没有定义，但被使用
2. 向上级作用域，一层一层一次寻找，直至找到为止
3. 如果到全局作用域都没找到，则报错 XXX is not defined

## 3. 闭包

1. 作用域应用的特殊情况，有两种表现
   - 函数作为参数被传递
   - 函数作为返回值被返回
2. 闭包中自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方
3. 闭包的应用
   - 隐藏数据（私有变量）
   -

## 4. this

### 1. 使用场景

1. 作为普通函数
2. 使用 call apply bind
3. 作为对象方法被调用
4. 在 class 方法中调用
5. 箭头函数

### 2. this 取什么值是执行的时候确定的，不是定义的时候确定的

# 4. 异步和单线程

## 1. 单线程和异步

1. JS 是单线程语言，只能同时做一件事
2. 浏览器和 nodejs 支持 JS 启动进程，如 Web Worker
3. JS 和 DOM 渲染共用一个线程，因为 JS 可修改 DOM 结构
