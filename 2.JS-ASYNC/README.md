## 1. event loop 事件循环

### 1. 什么是 event loop

1. JS 是单线程运行的
2. 异步（setTimeout，AJAX）和 DOM 事件，都要基于回调来实现
3. event loop 就是异步回调的实现原理

### 2. JS 如何执行

1. 从前到后，一行一行执行
2. 如果某一行执行报错，则停止下面代码的执行
3. 先把同步代码执行完，再执行异步

### 3. event loop 过程

1. 同步代码一行一行放到 call stack 执行
2. 遇到异步（定时，网络请求等等），会先记录下来，等待时机
3. 时机到了，就移动到 callback queue
4. 如果 call stack 为空，即同步代码执行完，event loop 开始工作
5. 轮询查找 callback queue，如果有任务就把它转移到 call stack 执行
6. 然后继续轮询查找（永动机一样）

## 2. Promise

### 1. 三种状态

1. pending 状态：不会触发 then 和 catch
2. resolved 状态：触发后续的 then 回调函数
3. rejected 状态：触发后续的 catch 回调函数

### 2. then 和 catch 改变状态

1. then 正常返回 resolved，里面有报错则返回 rejected
2. catch 正常返回 resolved，里面有报错则返回 rejected
3. 所有状态变化不可逆

## 3. async / await

### 1. 背景

1. 异步回调：会产生 callback Hell
2. Promise：采用 then/catch 链式调用，但是也是基于回调函数
3. async/await：同步语法，彻底消灭回调函数

### 2. 和 Promise 的关系

1. 执行 async 函数，返回的是 Promise 对象
2. await 相当于 Promise 的 then
3. try...catch 可捕获异常，代替 Promise 的 catch

### 3. async / await 的本质

1. async/await 是消灭异步回调的终极武器
2. JS 还是单线程，还得是有异步，还得是基于 event loop
3. async/await 只是一个语法糖

## 4. 宏任务 macroTask 和微任务 microTask

### 1. 什么是宏任务和微任务

1. 宏任务：setTimeout，setInterval，Ajax，DOM 事件
2. 微任务：Promise，async/await
3. 微任务执行时机要比宏任务要早

### 2. event loop 和 DOM 渲染

1. 每次 call stack 清空，即同步任务执行完毕
2. 都是 DOM 重新渲染的机会，如果 DOM 结构有改变，就会在这个时候重新渲染
3. 渲染完后才触发 event loop

### 3. 微任务和宏任务的区别

1. 宏任务：DOM 渲染之后才触发
2. 微任务：DOM 渲染之前就触发

### 4. 微任务为什么比宏任务要早执行

1. 宏任务：由浏览器规定，属于 Web APIs，宏任务存放在 callback queue
2. 微任务：是由 ES6 语法规定，微任务存放在 micro task queue
