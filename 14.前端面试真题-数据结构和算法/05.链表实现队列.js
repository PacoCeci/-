export class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

export class Queue {
  constructor(value, next) {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    // head
    if (!this.head) this.head = node;

    // tail
    if (this.tail) this.tail.next = node;
    this.tail = node;

    // length
    this.length += 1;
  }

  dequeue() {
    if (this.length <= 0) {
      return null;
    }

    // head
    const node = this.head;
    this.head = this.head.next;
    node.next = null;

    // length
    this.length -= 1;

    return node.value;
  }

  print() {
    let node = this.head;
    while (node) {
      console.log(node.value);
      node = node.next;
    }
  }
}

const q = new Queue();
q.enqueue(1);
console.log('length: ', q.length);

q.enqueue(2);
console.log('length: ', q.length);

q.enqueue(3);
console.log('length: ', q.length);

q.dequeue();
console.log('length: ', q.length);

q.enqueue(4);
console.log('length: ', q.length);

q.print();
console.log(q.head);
