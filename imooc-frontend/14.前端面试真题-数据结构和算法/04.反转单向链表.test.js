import { reverseLinkList, Node } from './04.反转单向链表';

// ## 测试
describe('反转单向链表', () => {
  it('单个', () => {
    const n = new Node(100);
    const res = reverseLinkList(n);
    expect(res).toEqual({ value: 100, next: undefined });
  });

  it('多个', () => {
    const n5 = new Node(5);
    const n4 = new Node(4, n5);
    const n3 = new Node(3, n4);
    const n2 = new Node(2, n3);
    const n1 = new Node(1, n2);

    const res = reverseLinkList(n1);
    expect(res).toEqual({ value: 5, next: n4 });
  });
});
