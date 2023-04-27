function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) return obj1 === obj2;
  if (obj1 === obj2) return true;
  // 比较keys的个数
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) return false;
  // 以 obj1 为基准，和 obj2 递归比较
  for (let key in obj1) {
    // 如果任意一个不相等，返回false
    if (!isEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// ########################################
// ########################################
// ########################################
const obj1 = { a: 10, b: { x: true, y: undefined, z: { m: 'abc' } } };
const obj2 = { a: 10, b: { x: true, y: undefined, z: { m: 'abc' } } };

console.log(isEqual(obj1, obj2) === true);
