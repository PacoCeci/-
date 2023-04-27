import { Queue } from './05.链表实现队列';

describe('链表实现队列', () => {
  it('enqueue', () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    expect(q.length).toBe(2);
  });

  it('dequeue', () => {
    const q = new Queue();
    expect(q.dequeue()).toBeNull();
    q.enqueue(1);
    q.enqueue(2);
    expect(q.dequeue()).toBe(1);
    expect(q.length).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBeNull();
  });
});
