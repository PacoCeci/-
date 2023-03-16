# 1. DOM - Document Object Model

## 1. DOM 节点操作

### 1. 获取 DOM 节点

1. 获取单个元素

   - `getElementById()`
   - css 选择器 `querySelector()`

2. 获取集合

   - `getElementsByTagName()`
   - `getElementsByClassName()`
   - css 选择器 `querySelectorAll()`

3. DOM 节点的 property （推荐）

   - 修改对象属性，不体现在 html 结构中
   - 有可能引起 DOM 重新渲染
   - 例子
     - `style`
     - `className`
     - `nodeName`
     - `nodeType`

4. DOM 节点的 attribute

   - 修改 html 属性，会改变 html 结构
   - 有可能引起 DOM 重新渲染
   - 例子
     - `getAttribut()`
     - `setAttribute()`

### 2. 新建/插入 DOM 节点

1. 新建节点：`createElement()`
2. 插入/移动节点：`appendChild()`

### 3. 获取父/子元素

1. 父元素：`parentNode`
2. 子元素：
   - `childNodes` 返回:
     - element nodes
     - text nodes
     - comment nodes
   - `children` 只返回 element nodes

### 4. 删除元素 `removeChild()`

## 2. DOM 性能

1. DOM 操作非常昂贵，避免频繁 DOM 操作
2. 对 DOM 查询做缓存

```
// 避免
for(let i = 0; i < document.getElementsByTagName('p').length; i++) { ... }
// 缓存(推荐)
const pList = document.getElementsByTagName('p');
const length = pList.length;
for(let i = 0; i < length; i++) { ... }
```

3. 将频繁操作改为一次性操作 `createDocumentFragment()`

# 2. BOM - Browser Object Model

## 1. navigator

1. `userAgent`
2. `geolocation`

## 2.screen

1. `width`
2. `height`

## 3. location

1. `href`
2. `protocol`
3. `pathname`
4. `search`
5. `hash`

## 4. history

1. `back()`
2. `forward()`

# 3. 事件绑定

## 1. 事件冒泡

### 1. DOM 事件流（event flow ）的三个阶段

1. 事件捕获阶段
2. 处于目标阶段
3. 事件冒泡阶段（默认）：当一个元素接收到事件的时候，会把它接收到的事件传给自己的父级，一直到 window

### 2. 阻止冒泡： `stopPropagation()`

### 3. 事件代理：

1. 在父节点上设置事件监听器，利用冒泡原理使事件作用到它的子节点
2. 优点：
   - 减少内存消耗，提高性能 (1 vs n)
   - 代码简洁，简化了 dom 节点更新时，对其所绑定的事件的更新

# 4. AJAX

## 1. `XMLHttpRequest()`

1. `onreadystatechange()`
2. `readyState`
   - **0** UNSET 尚未调用 open 方法
   - **1** OPENED open 方法已被调用
   - **2** HEADERS_RECEIVED send 方法已被调用，header 已被接受
   - **3** LOADING 下载中，responseText 已有部分内容
   - **4** DONE 下载完成
3. `status`
   - **2xx** 表示成功处理，如 **200**
   - **3xx** 表示重定向，浏览器直接跳转
     - **301** 永久重定向
     - **302** 临时重定向，每次都跳
     - **304** 资源没有改变，浏览器使用自己的缓存
   - **4xx** 客户端请求错误
     - **404** 请求资源不存在
     - **403** 客户端没有权限
   - **5xx** 服务端错误

## 2. 跨域

### 1. 同源策略

1. AJAX 请求时，浏览器要求当前网页和 server 必须同源
2. 同源指：**协议**，**域名**，**端口**。三者必须一致
3. 加载**图片**，**CSS**，**JS**可以无视同源策略
   - img 可用于统计打点
   - link, script 可以使用 CDN
   - script 可以实现 JSONP

### 2. 跨域

1. 所有跨域，都必须经过服务端允许和配合
2. 未经过服务端允许就实现跨域，说明浏览器有漏洞

### 3. 跨域方法 - JSONP

1. 通过 script 绕过跨域限制
2. 需要服务器愿意返回数据
3. 原理
   - 前后端协商一个 callback 方法，或者通过 parameter 把 callback 的名字发给服务端
   - 在前端定义这个全局的 callback 方法，处理返回的数据
   - 在服务端返回和调用这个 callback，参数就是要返回的数据

### 4. 跨域方法 - CORS （服务端设置 http header）

1. 设置跨域的域名 `response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081')`
2. 设置请求头允许的字段 `response.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')`
3. 设置跨域的方法 `response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')`
4. 设置是否接收和发送跨域的 cookie `response.setHeader('Access-Control-Allow-Credentials', 'true')`

## 3. 插件

1. `$.ajax()`
2. `fetch()`
3. `axios`
   - 支持浏览器和 nodejs 两个环境
   - support intercept request and response
   - support cancel requests

# 5. 储存

## 1. cookie

### 1. 什么是 cookie

1. 用于浏览器和 server 之间的通讯
2. 存储在本地
3. 通过 document.cookie 来获取和修改 `document.cookie = 'a=100'`

### 2. cookie 的缺点

1. 存储大小限制，最大 4KB
2. http 请求时需要发送到服务端，增加了请求数据量
3. API 易用性，只能用 document.cookie 来修改

## 2. localStorage 和 sessionStorage

1. HTML 5 专门为存储而设计，最大可以存 5M
2. API 简单易用 `setItem` 和 `getItem`
3. 不会随着 http 请求被发送出去
4. 两者区别
   - `localStorage` 数据会永久存储，除非用代码或者手动删除
   - `sessionStorage` 数据只存在当前对话，浏览器关闭则清空
   - 一般用 localStorage 会多一些
