let a = 100;
function test() {
  console.log('a: ', a);
  a = 10;
  console.log('a: ', a);
}

test(); // 100, 10
console.log('a: ', a); // 10
