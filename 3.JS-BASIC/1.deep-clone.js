/**
 * deep clone
 * @param {Object} obj 要拷贝的对象
 * 问题：
 * 1. 不能clone：RegExp，Date和Function
 * 2. 同一指向重复clone
 * 3. 循环指向问题
 */

function deepClone(obj = {}) {
  // 如果是值类型或者null，直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  const result = obj instanceof Array ? [] : {};
  for (let key in obj) {
    // 保证 key 不是原型上的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key]);
    }
  }

  // 返回结果
  return result;
}

// #####################################
// #####################################
// #####################################
const obj = {
  age: 10,
  name: 'Paco',
  address: {
    city: 'Dongguan',
    street: '123 street',
  },
  hobby: ['a', 'b', 'c'],
};

const obj2 = deepClone(obj);
obj2.address.city = 'Beijing';

console.log(obj.address.city);
