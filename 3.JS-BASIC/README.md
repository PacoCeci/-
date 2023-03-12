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
