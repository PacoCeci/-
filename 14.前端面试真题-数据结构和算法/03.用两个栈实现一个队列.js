// ## 题目
// 请用两个栈，来实现队列的功能
// 实现功能 `add` `delete` `length`

// ## 实现思路
// - 队列 add
//     - 往 stack1 push 元素
// - 队列 delete
//     - 将 stack1 所有元素 pop 出来，push 到 stack2
//     - 将 stack2 执行一次 pop
//     - 再将 stack2 所有元素 pop 出来，push 进 stack1

// ## 代码
export class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  add(item) {
    this.inStack.push(item);
  }

  delete() {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
    }

    const res = this.outStack.pop();
    while (this.outStack.length) {
      this.inStack.push(this.outStack.pop());
    }

    return res;
  }

  get length() {
    return this.inStack.length;
  }

  print() {
    console.log(this.inStack);
  }
}

const q = new MyQueue();
q.add(1);
q.add(2);
q.add(3);
q.delete();
q.add(4);
q.delete();
q.add(5);
q.print();
