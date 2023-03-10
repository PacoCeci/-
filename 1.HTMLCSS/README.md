# HTML

### 1. 如何理解 HTML 语义化

1. 让人更容易读懂，增加代码可读性
2. 让搜索引擎更容易读懂，SEO

### 2. 什么是块状元素

1. 独占一行，display 为 block/table
2. 元素有：div h1 table ul ol p

### 3. 什么是行内元素

1. 不会独占一行，display 为 inline/inline-block
2. 元素有 span img input button

# CSS

## 1. 盒模型宽度计算

### div1 的 offsetWidth 是多大？

```
<style>
    #div1 {
        width: 100px;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 10px;
    }
</style>

<div id="div1">HTMLCSS</div>
```

1. offsetWidth = (内容宽度 + 内边距 + 边框)， 不包括外边距
2. 答案是：100 + 10 \* 2 + 1 \* 2 = 122px
3. 补充：如果让 offsetWidth 等于 100px，该如何做？

```
<style>
    #div1 {
        ...
        box-sizing: border-box; /* width = content + padding + border */
    }
</style>
```

## 2. margin 纵向重叠问题

### AAA 和 BBB 之间的距离是多少？

```
<style>
    p {
        font-size: 16px;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 15px;
    }
</style>

<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```

1. 相邻元素的 margin-top 和 margin-bottom 会发生重叠
2. 空白内容的 p 也会发生重叠
3. 答案是：15px

## 3. margin 负值问题

1. margin-top 和 margin-left 负值，元素向上，向左移动
2. margin-right 负值，右侧元素左移，自身不受影响
3. margin-botton 负值，下方元素上移，自身不受影响

## 4. BFC 理解与应用

1. Block Format Content 块级格式化上下文
2. 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素
3. 形成 BFC 的常见条件
   - float 不是 none
   - position 是 absolute 或者 fixed
   - overflow 不是 visible
   - display 是 flex 或者 inline-block 等
4. BFC 的常见应用 - 清除浮动

## 5. float 布局

1. 圣杯布局和双飞翼布局的目的
   - 三栏布局，中间一兰最先加载和渲染（内容最重要）
   - 两侧内容固定，中间内容随着宽度自适应
   - 一般用于 PC 网页
2. 圣杯布局和双飞翼布局的技术总结
   - 使用 float 布局
   - 两侧使用 margin 负值，以便和中间内容横向重叠
   - 放置中间内容被两侧覆盖，一个用 padding 一个用 margin
3. 手写 clear fix

```
.clearfix:after {
    content: "";
    display: table;
    clear: both;
}
.clear {
    *zoom: 1; /* 兼容IE低版本 */
}
```

## 6. flex 布局

### flex 实现一个三点的骰子

1. 常用语法回顾
   - flex-direction： 主轴方向
   - justify-content：主轴对齐方式
   - align-items：交叉轴对齐方式
   - flex-wrap：换行
   - align-self：子元素在交叉轴的对齐方式

## 7. CSS 定位

### 1. absolute 和 relative 分别一句什么定位

1. relative 依据自身定位
2. absolute 依据最近一层是定位元素定位
3. 定位元素
   - absolute relative fixed
   - 如果没有找到父元素是定位元素，那么 body 为定位元素

### 2. 居中对齐有哪些实现方式

1. 水平居中
   1. inline 元素：`text-align: center`
   2. block 元素：`margin: auto`
   3. absolute 元素：`left: 50% + margin-left 负值`
2. 垂直居中
   1. inline 元素：`inline-height的值等于height的值`
   2. absolute 元素：`top :50% + margin-top 负值`
   3. absolute 元素：`transform(-50%, -50%)`
   4. absolute 元素：`top, left, bottom, right = 0 + margin: auto`

## 8. line-height 如何继承

### 下面例子的 p 标签的行高是多少？

1. 具体数值，如 30px，则继承该值
2. 比例，如 1.5，则继承该比例
3. 写百分比，如 200%，则继承计算出来的值，不直接继承该百分比
4. 答案是：20 \* 200% = 40px

```
<style>
    body {
        font-size: 20px;
        line-height: 200%;
    }
    p {
        font-size: 16px;
    }
</style>
<body>
    <p>AAA</p>
</body>
```

## 9.响应式

### 1. 长度单位种类

1. px，绝对长度单位，最常用
2. em，相对长度单位，相对于父元素，不常用
3. rem，相对长度单位，相对于根元素(html)，常用于响应式布局

### 2. 响应式布局的常用方案

1. media-query，根据不同的屏幕宽度设置根元素 font-size
2. rem，基于根元素设置宽度

### 3. vw 和 vh

1. rem 的弊端：阶梯性
2. 网页视口尺寸
   - 屏幕（显示器/手机屏幕）高度：window.screen.height
   - 浏览器网页视口高度：window.innerHeight
   - body 高度：document.body.clientHeight
3. vh 网页视口高度的 1/100, window.innerHeight === 100vh
4. vw 网页视口宽度的 1/100, window.innerWidth === 100vw
5. vmax 取 vh/vw 两者最大值，vmin 取 vh/vw 两者最小值
