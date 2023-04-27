# 1. 函数组件的特点

1. 简洁，没有组件实例
2. 没有生命周期
3. 没有 state，只能接收 props

# 2. class 组件的问题

1. 难理解：语法和生命周期复杂，有学习成本
2. 难优化需要维护实例化的状态以及父子之间的交互
3. 复用逻辑复杂：需要继承`React.Component`
4. 难测试
5. 相同业务逻辑，分散到各个生命周期方法中

# 3. State Hook

1. 让函数实现 state 和 setState
2. 代码

```js
function ClickCounter() {
  const [count, setCount] = useState(0);

  function clickHandler() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={clickHandler}>点击</button>
    </div>
  );
}
```

# 4. Effect Hook

1. 让函数组件模拟主要的生命周期
   - `componentDidMount()` 通过定义空的 dependency 实现
   - `componentDidUpdate()` 通过定义 dependency 实现，或者通过没有依赖实现
   - `componentWillUnmount()` 通过返回一个函数实现
     - 如果依赖是[]，组件销毁时执行该函数，这种情况等于`componentWillUnmount`
     - 如果没有依赖，或者依赖是[a, b]，它并不完全等同于 `componentWillUnmount`。这种情况返回的函数不只在组件销毁的时候执行，它在下一次 effect 执行之前，也会被执行
2. 代码

   ```js
   function UseEffectChangeState() {
     const [count, setCount] = useState(0);

     // 模拟 componentDidMount，只执行一次
     useEffect(() => {
       console.log('加载完');
     }, []); // 依赖为 []，即不依赖于任何 state

     // 模拟 componentDidUpdate，每次count更新都会执行
     useEffect(() => {
       console.log('count 更新完');
     }, [count]); // 依赖为 [count]

     // 模拟 componentDidMount和componentDidUpdate
     useEffect(() => {
       console.log('加载和更新');
     }); // 没有依赖

     // 模拟 componentWillUnmount
     useEffect(() => {
       // 定时任务
       const timer = setInterval(() => {
         console.log('setInterval...');
       }, 1000);

       // 清除定时任务
       return () => clearTimeout(timer);
     }, []);

     // 依赖为 [] 时： re-render 不会重新执行 effect 函数
     // 没有依赖：re-render 会重新执行 effect 函数

     return <div>count: {count}</div>;
   }
   ```

# 5. 其他 Hooks

1.  `useRef`：可用于获取 DOM 元素

    ```js
    function UseRef() {
      const btnRef = useRef(null); // 初始值

      // const numRef = useRef(0)
      // numRef.current

      useEffect(() => {
        console.log(btnRef.current); // DOM 节点
      }, []);

      return (
        <div>
          <button ref={btnRef}>click</button>
        </div>
      );
    }
    ```

2.  `useContext`：获取 context 的值
3.  `useReducer`

    ```js
    function App() {
      // 很像 const [count, setCount] = useState(0)
      const [state, dispatch] = useReducer(reducer, initialState);

      return (
        <div>
          count: {state.count}
          <button onClick={() => dispatch({ type: 'increment' })}>
            increment
          </button>
          <button onClick={() => dispatch({ type: 'decrement' })}>
            decrement
          </button>
        </div>
      );
    }
    ```

    - `useReducer` 只是 useState 的代替方案，用于更复杂的 state 变化逻辑
    - `useReducer` 还是单组件的状态管理，多组件通讯还是需要 props 传递数据
    - redux 是全局的状态管理，多组件可共享数据

4.  `useMemo`：

    - React 默认更新所有子组件
    - Class 组件使用 SCU 或者 PureComponent 进行优化
    - Hooks 里使用 useMemo（但道理是一样的）

5.  `useCallback`：
    - useMemo 封装数据
    - useCallback 封装函数

# 6. 自定义 Hook

- 本质是一个函数
- 文件名称以 use 开头，重要！
- 内部正常使用 `useState` `useEffect` 等等
- 返回想要的结果即可，一般是数组

```js
// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // 利用 axios 发送网络请求
    setLoading(true);
    axios
      .get(url) // 发送一个 get 请求
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return [loading, data, error];
}
```

# 7. Hooks 使用规范

1. 只能用于 React 函数组件和自定义 Hook 中，不能在 class 组件里使用
2. 只能用于顶层代码，不能在循环，判断中使用。因为 Hooks 调用顺序必须保持一致
   - `State` Hook
     - render：初始化 state 的信息
     - rerender：读取 state 的信息
   - `Effect` Hook
     - render：添加 effect 函数
     - rerender：替换 effect 函数（内部的函数也会重新定义）

# 8. Hooks 做组件逻辑复用的好处

1. 完全符合 Hooks 原有规则，没有其他额外要求
2. 变量作用域明确
3. 没有组件嵌套

# 9. Hooks 注意事项

1. useState 初始化值，只有第一次有效，re-render 不会重新初始化为默认值
2. useEffect 内部修改 state

   - 如果依赖是[]，state 不会更新
   - 如果没有依赖或者依赖不是空数组，state 正常更新

   ```js
   const [count, setCount] = useState(0);

   // 模拟 DidMount
   useEffect(() => {
     console.log('useEffect...', count);

     // 定时任务
     const timer = setInterval(() => {
       console.log('setInterval...', count);
       setCount(count + 1);
     }, 1000);

     // 清除定时任务
     return () => clearTimeout(timer);
   }, []); // 依赖为 []，不会更新
   ```

   ```js
   const [count, setCount] = useState(0);

   // 解决方法，用另外一个hook - useRef
   const countRef = useRef(0);
   useEffect(() => {
     console.log('useEffect...', count);

     // 定时任务
     const timer = setInterval(() => {
       console.log('setInterval...', countRef.current);
       setCount(++countRef.current);
     }, 1000);

     // 清除定时任务
     return () => clearTimeout(timer);
   }, []); // 依赖为 []，更新
   ```

3. useEffect 可能出现死循环，特别是当依赖是引用类型（数组或者对象）
4. useEffect 清理副作用

# 面试题

1. 为什么会有 Hooks，它解决了什么问题
   - 完善函数组件
   - 代码简洁，易于理解
   - 使组件更模块化，更好地复用
2. Hooks 如何模拟组件生命周期
   - `componentDidMount`：`useEffect` 依赖[]
   - `componentDidUpdate`：`useEffect` 没有依赖，或者依赖不是空数组
   - `componentWillUnMount`：`useEffect` 中返回一个函数
     - 依赖是[]时，组件销毁执行返回函数，此情况等同于 `componentWillUnMount`
     - 没有依赖，或者依赖不是空数组时，无论更新或者销毁都会执行返回个函数
     -
3. 如何自定义 Hook
4. Hooks 的性能优化
   - `useMemo` 缓存数据
   - `useCallback` 缓存函数
5. 使用 Hooks 遇到哪些坑
   - 必须在函数顶层使用 hook 保证执行顺序
   - useEffect 的依赖，避免死循环
   - 自定义 hook 的命名规范
6. Hooks 相比 HOC 和 Render Prop 有哪些优点
   - 代码简介：没有生命周期
   - 避免层层嵌套
   - 更好复用：hooks 中更容易实现组件逻辑服用。HOC 需要在每个组件中使用，没有办法实现逻辑的统一复用
   - 更好性能：HOC 中每次都会生成新的组件实例
