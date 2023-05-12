// 父类初始化实例属性和原型属性
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

function inheritPrototype(parent, child) {
  // child.prototype = Object.create(parent.prototype, {
  //   constructor: child,
  // });
  child.prototype = new Parent();
}

// 将子类原型指向父类
inheritPrototype(Parent, Child);

// 新增子类原型属性
Child.prototype.sayAge = function () {
  console.log(this.age);
};

var c = new Child('cc', 100);
console.log(c.sayName());

// var p = new Parent('pp');
// console.log(p.sayAge());
