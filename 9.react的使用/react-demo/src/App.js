import React, { useEffect, useState } from 'react';
// import BaseUse from './components/baseUse';
import AdvancedUse from './components/advancedUse';
// import ReduxUse from './components/reduxUse';
// import TodoList from './components/TodoLIst'

function App() {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('hello');
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <input onChange={() => setVal(val + 1)} /> {val}
      {/* <BaseUse /> */}
      {/* <AdvancedUse /> */}
      {/* <ReduxUse/> */}
      {/* <TodoList/> */}
    </div>
  );
}

export default App;
