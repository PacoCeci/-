# 1. webpack

## 1. 基本配置

- 拆分配置和 merge
- 启动本地服务
- 处理 ES6
  - `babel-loader`：使用 babel 将 ES6 转换为 ES5 代码
  - `@babel/preset-env`：babel 的预设环境，根据目标浏览器转换 ES6 代码
  - `@babel/plugin-transform-runtime`：在转换 ES6 代码时，避免重复引入 babel polyfill 和 helper 函数，减少代码体积
  - `@babel/polyfill`：提供 ES6 代码的运行环境，包括 Promise，Symbol 等
- 处理样式
  - `css-loader`：解析 css，并处理其中的依赖关系，如 import
  - `style-loader`：将解析后的 css 通过 style 标签插入到 html 页面
  - `postcss-loader`：使用 PostCSS 转换 CSS 代码提高兼容性
  - `sass-loader`：解析 sass/scss 文件
  - `less-loader`：解析 less 文件
  - `stylus-loader`：解析 stylus 文件
  - `resolve-url-loader`：处理 css 中的相对路径问题
- 处理图片
  - `file-loader`：将文件输出到输出目录，并返回文件的相对路径或 url
  - `url-loader`：类似于 file-loader，但可以将小图片转换为 data URL，减少 http 请求数量
  - `image-webpack-loader`：用于压缩和优化图片，可以自动将图片转换成适当的格式和大小
  - `svg-url-loader`：用于处理 SVG 图片，将其转换为 data URL 或文件 URL
  - `svg-sprite-loader`：用于将多个 SVG 图标打包成一个 SVG sprite，减少 http 请求
- 模块化

## 2. 高级配置

1. 多入口：设置多个

   - entry
   - output
   - `HtmlWebpackPlugin()`

2. 抽离 CSS 文件

   - 样式直接嵌入到 html，不方便处理，例如压缩
   - 抽离样式
     - 安装 `mini-css-extract-plugin`
     - 把 `MiniCssExtractPlugin` 加到 plugins
       ```js
       new MiniCssExtractPlugin({
         filename: 'css/[name].[contenthash:8].css',
       });
       ```
     - `MiniCssExtractPlugin.loader` 代替 `style-loader`
   - 压缩样式
     - 安装
       - `terser-webpack-plugin`
       - `optimize-css-assets-webpack-plugin`
     - 在 optimization 里加入 `minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]`

3. 抽离公共代码和第三方代码

   - 好处

     - 减少代码冗余，避免重复打包
     - 提高缓存利用率，抽离使公共代码和第三方代码更容易被缓存
     - 提高构建速度，大多数情况公共代码和第三方代码只需要被构建一次

   - 代码

     - 在 plugins 加入

       ```js
       new HtmlWebpackPlugin({
           template: path.join(srcPath, 'index.html'),
           filename: 'index.html',
           // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
           chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
       }),
       ```

     - 在 optimization 加入

       ```js
           // 分割代码块
           splitChunks: {
                /**
                 * initial 入口chunk，对于异步导入的文件不处理
                   async 异步chunk，只对异步导入的文件处理
                   all 全部chunk
                */
               chunks: 'all',
               // 缓存分组
               cacheGroups: {
                   // 第三方模块
                   vendor: {
                       name: 'vendor', // chunk 名称
                       priority: 1, // 权限更高，优先抽离，重要！！！
                       test: /node_modules/,
                       minSize: 0,  // 大小限制
                       minChunks: 1  // 最少复用过几次
                   },

                   // 公共的模块
                   common: {
                       name: 'common', // chunk 名称
                       priority: 0, // 优先级
                       minSize: 0,  // 公共模块的大小限制
                       minChunks: 2  // 公共模块最少复用过几次
                   }
               }
           }
       ```

4. 懒加载

   - 使用`import()`函数动态加载模块，该函数返回 promise
   - 代码

   ```js
   // module.js
   export default {
     message: 'this is dynamic data',
   };

   // app.js
   const lazyLoadedModule = () => import('./module.js');
   lazyLoadedModule().then((res) => {
     console.log(res.default.message);
   });
   ```

## 3. module，chunk 和 bundle 的区别

1. module 模块：单独的一个代码块，可以是一个 JS 文件，CSS 文件，图片等等
2. chunk 代码块：webpack 在处理模块时根据配置文件生成的代码块，例如 `entry`，`import` 和 `splitChunk`
3. bundle 打包文件：webpack 打包生成的最终的输出文件，它根据入口文件生成一个或者多个 bundle

## 4. webpack 性能优化

### 1. 优化打包构建速度 - 提高开发的体验和效率

1.  缩小打包范围：通过配置 include 和 exclude 来减少需要打包的文件数量，减少打包的体积
2.  开启缓存：避免重新编译未改变的代码
3.  IgnorePlugin：避免引入无用模块

    - 以常用的 moment 为例。安装 `npm i moment -d` 并且 `import moment from 'moment'` 之后，monent 默认将所有语言的 js 都加载进来，使得打包文件过大。可以通过 ignorePlugin 插件忽略 locale 下的语言文件，不打包进来。
    - 代码

    ```js
    plugins: [
      // 忽略 moment 下的 /locale 目录
      new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    ];
    ```

    ```js
    import moment from 'moment';
    import 'moment/locale/zh-cn'; // 手动引入中文语言包
    moment.locale('zh-cn');
    ```

4.  noParse：引入但不解析，如某些第三方的庞大又没有采用模块化标准的库，让 webpack 去解析这些文件耗时又没有意义库

    ```js
    module.exports = {
      module: {
        // 不解析 jquery 和 lodash
        noParse: [/jquery|lodash$/],
      },
    };
    ```

    两者对比一下：

    - `IgnorePlugin` 不引入，代码中不存在
    - `noParse` 引入，但不解析编译，属于 module 级别的配置

5.  HappyPack：

        - 将任务分解成多个子任务，从而使 webpack 可以并行处理多个任务，多进程打包加快速度
        - webpack 是基于 nodejs 运行，nodejs 是**单线程**的，happyPack 可以开启多个**进程**来进行构建，发挥多核 CPU 的优势。
        - 一般用在大型项目，构建速度明显变慢时，作用才能明显。否则，反而会有副作用
        - 代码

        ```js
        const path = require('path');
        const HappyPack = require('happypack');

        module.exports = {
          module: {
            rules: [
              {
                test: /\.js$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                exclude: path.resolve(__dirname, 'node_modules'),
              },
            ],
          },
          plugins: [
            new HappyPack({
              // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
              id: 'babel',
              // 如何处理 .js 文件，用法和 Loader 配置中一样
              loaders: ['babel-loader?cacheDirectory'],
              // ... 其它配置项
            }),
          ],
        };
        ```

6.  ParallelUglifyPlugin

    - webpack 默认用内置的 uglifyJS 压缩 js 代码
    - 大型项目压缩 js 代码时，也可能会慢。可以开启多进程压缩，和 happyPack 同理

      ```js
      const path = require('path');
      const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

      module.exports = {
        plugins: [
          // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
          new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
              output: {
                beautify: false, // 最紧凑的输出
                comments: false, // 删除所有的注释
              },
              compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
              },
            },
          }),
        ],
      };
      ```

7.  自动刷新

    - webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启，其它情况默认关闭
    - 代码

    ```js
    module.export = {
      watch: true, // 开启监听，默认为 false
      // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器！！！

      // 监听配置
      watchOptions: {
        ignored: /node_modules/, // 忽略哪些
        // 监听到变化发生后会等 300ms 再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
        // 默认每隔 1000 毫秒询问一次
        poll: 1000,
      },
    };
    ```

8.  热更新

    - 上文的自动刷新，会刷新整个网页。问题：
      - 速度慢
      - 网页当前的状态会丢失，如 input 输入的文字，图片要重新加载，vuex 和 redux 中的数据
    - css 的热替换马上生效，js 的热替换需要手动监听
    - 代码

    ```js
    const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

    module.exports = {
      entry: {
        // 为每个入口都注入代理客户端
        index: [
          'webpack-dev-server/client?http://localhost:8080/',
          'webpack/hot/dev-server',
          path.join(srcPath, 'index.js'),
        ],
        // other 先不改了
      },
      plugins: [
        // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
        new HotModuleReplacementPlugin(),
      ],
      devServer: {
        // 告诉 DevServer 要开启模块热替换模式
        hot: true,
      },
    };

    // 增加监听，开启热更新之后的代码逻辑，
    // 任何在 math.js 的更新会触发回调函数，然后热更新
    if (module.hot) {
      module.hot.accept(['./math'], () => {
        const sumRes = sum(10, 20);
        console.log('sumRes in hot', sumRes);
      });
    }
    ```

9.  DllPlugin
    - 将常用的库和框架提前打包，以便在构建时可以重复使用
    - 适用于体积大，不常升级的库和框架
    - webpack 内置了对动态链接库的支持，需要通过 2 个内置的插件接入，它们分别是：
      - DllPlugin 插件：打包出 dll 文件
        - 添加和配置文件：webpack.dll.js
        - 修改 package.json scripts `"dll": "webpack --config build/webpack.dll.js"`
        - `npm run dll` 并查看输出结果
      - DllReferencePlugin 插件：使用 dll 文件
        - 引入 `DllReferencePlugin`
        - babel-loader 中排除 `node_modules`
        - 配置 `new DllReferencePlugin({...})`
        - index.html 中引入 `react.dll.js`
        - 运行 dev

### 2. 哪些可用于线上，哪些用于线下

- 优化 babel-loader（可用于线上）
- IgnorePlugin 避免引入哪些模块（可用于线上）
- noParse 避免重复打包（可用于线上）
- happyPack 多进程打包（可用于线上）
- ParallelUglifyPlugin 多进程压缩 js（可用于线上）
- 自动刷新（仅开发环境）
- 热更新（仅开发环境）
- DllPlugin（仅开发环境）

### 3. 优化产出的代码 - 产品性能

1. 目的

- 体积小
- 合理分包，不重复加载
- 速度快，内存使用少

2. 方法

- 小图片 base64 编码
- bundle 加 hash
- 懒加载
- 提取公共代码（避免重复打包，减少体积）
- 使用 CDN，需要配置 publicPath
- IgnorePlugin：避免引入无用模块
- 使用 production

  - 自动开启代码压缩
  - 自动删除调试代码
  - 自动开启 tree shaking 删除没有使用的代码

    - 必须是 ES6 Module 语法才行，因为它是静态引入，编译时引入
    - Commonjs 不行，因为它是动态引入，执行时引入

    ```js
    // commonjs
    let apiList = require('../config/api.js');
    if (isDev) {
      // 可以动态引入，执行时引入
      apiList = require('../config/api_dev.js');
    }
    ```

    ```js
    import apiList from '../config/api.js';
    if (isDev) {
      // 编译时报错，只能静态引入
      import apiList from '../config/api_dev.js';
    }
    ```

- Scope Hosting

  - 将模块中的多个导出，合并成一个函数中的局部变量。它通过分析代码中的依赖关系把模块转换成局部变量，从而消除冗余的变量声明和引用
  - 减少代码体积和运行时的压力，提高网页的加载速度

  ```js
  const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

  module.exports = {
    resolve: {
      // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
      mainFields: ['jsnext:main', 'browser', 'main'],
    },
    plugins: [
      // 开启 Scope Hoisting
      new ModuleConcatenationPlugin(),
    ],
  };
  ```

# 2. babel

## 常用的 npm 包

1. `@babel/preset-env`：插件的集合，根据当前环境（例如不同的浏览器和 NodeJS 版本支持的语法和 API），自动确定要使用哪些插件来完成对新语法（如箭头函数，async）的转换，以确保 JS 代码能够在目标环境中顺利运行。它不转换新的 API，如 Promise，Set 等等
2. `@babel/polyfill`

   - 什么是 `polyfill` ？即一个补丁，引入以兼容新 API（注意**不是新语法**，如箭头函数），如搜索“Object.keys polyfill” 和 “Promise polyfill”
   - `core-js` 集合了所有新 API (除了 generator)的 polyfill 。https://github.com/zloirock/core-js
   - `regenerator` 是 generator 的 polyfill 。 https://github.com/facebook/regenerator
   - `babel-polyfill`：
     - 即 `core-js` 和 `regenerator` 的集合，它只做了一层封装而已。
     - 是一个很大的库，体积很大。Babel 7.4 之后被弃用，建议直接使用 `core-js` 和 `regenerator`
   - 按需加载
     - 新增 `{ "useBuiltIns": "usage", "corejs": 3 }`，3 为 corejs 的版本
     - 删掉入口的 `import '@babel/polyfill'`
     - 问题：污染全局变量，解决方法 - 使用 runtime

3. `@babel/plugin-transform-runtime` 和 `@babel/runtime`：兼容新 API 的同时，解决了污染全局变量的问题

   ```js
   [
     '@babel/plugin-transform-runtime',
     {
       absoluteRuntime: false,
       corejs: 3, // v3 支持 API 如数组 includes ，v2.x 不支持
       helpers: true,
       regenerator: true,
       useESModules: false,
     },
   ];
   ```

# 3. 面试题

## 1. 前端为什么要进行打包和构建？

### 1. 代码层面

1. 体积更小，加载更快
   - Tree-shaking
   - 压缩
   - 合并
2. 编译高级语言和语法
   - TS
   - ES61
   - SACSS
   - 模块化
3. 兼容性和错误检查
   - Polyfill
   - PostCSS
   - eslint

### 2. 开发层面

1. 统一高效的开发环境：热更新，自动编译
2. 统一的构建流程和产出标准：产出什么样的代码，支持什么浏览器
3. 集成公司构建规范

## 2. Loader 和 Plugin 的区别

1. Loader：将不同类型的文件转换为 Webpack 能够处理的 JS 模块。它本质上是一个函数，通过读取和处理输入的资源文件（如 CSS，图片），生成 JS 模块，然后将其输出给 Webpack 进行打包和处理
2. Plugin：用于扩展 Webpack 的功能，在 Webpack 打包过程中通过 Webpack 提供的钩子函数来实现插入各种自定义的任务，能够在 Webpack 编译过程的不同阶段触发。如压缩代码，生成 HTML 文件

## 3. 常用的 Loader 和 Plugin

### 1. Loader

1. `babel-loader`：使用 babel 将 ES6 转换为 ES5 代码
2. `css-loader`：解析 css，并处理其中的依赖关系，如 import
3. `style-loader`：将解析后的 css 通过 style 标签插入到 html 页面
4. `file-loader`：将文件输出到输出目录，并返回文件的相对路径或 url
5. `url-loader`：类似于 file-loader，但可以将小图片转换为 data URL，减少 http 请求数量
6. `sass-loader`：解析 sass/scss 文件
7. `postcss-loader`：使用 PostCSS 转换 CSS 代码提高兼容性

### 2. Plugin

1. `html-webpack-plugin`：生成 HTML 文件，并引入打包后的 JS 和 CSS
2. `clean-webpack-plugin`：每次打包前清空 dist 文件夹
3. `mini-css-extract-plugin`：将打包好的 CSS 提取到单独的文件中
4. `bundle-analyzer-plugin`：分析打包后的文件，生成依赖关系图以及文件大小分析报告
5. `HotModuleReplacementPlugin`：热更新
6. `terser-webpack-plugin`：使用 terser 来压缩 JS 代码
7. `webpack-parallel-uglify-plugin`：使用 uglifyJS 多进程压缩 JS 代码
8. `optimize-css-assets-webpack-plugin`：优化/压缩 CSS 资源
9. `DllPlugin`：打包出 dll 文件
10. `IgnorePlugin`：避免引入无用模块

## 4. webpack 构建流程

### 1. 几个核心概念

- Entry：入口文件，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

### 2. webpack 的构建流程可以分为以下三大阶段：

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
- 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
- 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。
