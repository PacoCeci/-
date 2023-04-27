import { MyQueue } from './03.用两个栈实现一个队列';

// ## 测试
describe('两个栈实现队列', () => {
  it('add', () => {
    const q = new MyQueue();
    q.add(1);
    q.add(2);
    expect(q.length).toBe(2);
  });

  it('delete', () => {
    const q = new MyQueue();
    q.add(1);
    q.add(2);
    const m = q.delete();
    expect(q.length).toBe(1);
    expect(m).toBe(1);
  });
});
