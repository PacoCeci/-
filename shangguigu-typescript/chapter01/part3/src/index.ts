import { hi } from './m1';

function sum(a: number, b: number): number {
  return a + b;
}

const obj = { name: '孙悟空', age: 33 };

console.log(obj);
// console.log(Promise);

obj.age = 18;
console.log(obj);

console.log(sum(123, 456));
console.log('哈哈');
console.log(hi);

let fn = (a: number, b: number) => a + b;

fn(123, 456);
fn(77, 22);
