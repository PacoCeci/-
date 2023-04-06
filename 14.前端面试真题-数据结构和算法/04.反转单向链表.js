// ## 题目
// 定义一个函数，输入一个单向链表的头节点，反转该链表，并输出反转之后的头节点

// ## 实现思路
// 如何让next不丢失？遍历过程中，至少要存储 3 个指针
// tempNode：临时存储next node
// curNode：存储现在node
// prevNode：存储previous node

// ## 代码
export class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }

  print() {
    let node = this;
    while (node) {
      console.log(node.value);
      node = node.next;
    }
  }
}

export function reverseLinkList(head) {
  let temp,
    prev,
    cur = head;
  while (cur) {
    temp = cur.next;
    cur.next = prev;

    prev = cur;
    cur = temp;
  }
  return prev;
}

const n5 = new Node(5);
const n4 = new Node(4, n5);
const n3 = new Node(3, n4);
const n2 = new Node(2, n3);
const n1 = new Node(1, n2);

console.log(reverseLinkList(n1).print());
