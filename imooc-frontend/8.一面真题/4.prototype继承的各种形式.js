// ################ 1. 原型链继承 ####################
// ################ 1. 原型链继承 ####################
// ################ 1. 原型链继承 ####################

function Parent_a() {
  this.colors = ['red', 'blue', 'green'];
}

function Child_a() {}

//继承了 Parent_a
Child_a.prototype = new Parent_a();

const instance = new Child_a();
instance.colors.push('black');
console.log(instance.colors); // "red, blue, green, black"

const instance1 = new Child_a();
console.log(instance1.colors); // "red, blue, green, black"

// ################ 2.借用构造函数继承 ################
// ################ 2.借用构造函数继承 ################
// ################ 2.借用构造函数继承 ################

function Parent_b() {
  this.name = 'I am parent_b';
  this.color = ['red', 'green', 'blue'];
}
Parent_b.prototype.getSuperName = function () {
  return this.name;
};

function Child_b() {
  // 继承自 Parent_b
  Parent_b.call(this);
}

const instance2 = new Child_b();
instance2.color.push('black');
console.log(instance2.color); // "red, green, blue, black"
// console.log(instance2.getSuperName()); // TypeError: instance2.getSuperName is not a function

// ################ 3. 组合继承 ####################
// ################ 3. 组合继承 ####################
// ################ 3. 组合继承 ####################
function Parent_c(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent_c.prototype.sayName = function () {
  console.log(this.name);
};

function Child_c(name, age) {
  // 继承属性
  // 第二次调用Parent_c()
  Parent_c.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用Parent_c()
Child_c.prototype = new Parent_c();
// 重写Child_c.prototype的constructor属性，指向自己的构造函数Child_c
// Child_c.prototype.constructor = Child_c;
// console.log('Child_c.prototype.constructor ', Child_c.prototype.constructor);
Child_c.prototype.sayAge = function () {
  console.log(this.age);
};

const instance3 = new Child_c('Nicholas', 29);
instance3.colors.push('black');
console.log(instance3.colors); // "red, blue, green, black"
instance3.sayName(); // "Nicholas"
instance3.sayAge(); // 29

const instance4 = new Child_c('Greg', 27);
console.log(instance4.colors); // "red, blue, green"
instance4.sayName(); // "Greg"
instance4.sayAge(); // 27

// const p = new Parent_c('ttttt');

// 存在两份相同的属性/方法，一份在实例，一份在__proto__
console.log('instance4', instance4);
console.log('instance4.__proto__', instance4.__proto__);

// ################ 4. 寄生组合式继承 ####################
// ################ 4. 寄生组合式继承 ####################
// ################ 4. 寄生组合式继承 ####################
//原型式继承，相当于 Object.create()
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

//寄生式继承
function inheritPrototype(child_d, parent_d) {
  const prototype = object(parent_d.prototype); //创建对象
  prototype.constructor = child_d; //增强对象
  child_d.prototype = prototype; //指定对象
}

//寄生组合式继承
function Parent_d(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent_d.prototype.sayName = function () {
  console.log(this.name);
};
function Child_d(name, age) {
  Parent_d.call(this, name);
  this.age = age;
}
inheritPrototype(Child_d, Parent_d);
Child_d.prototype.sayAge = function () {
  console.log(this.age);
};

const instance5 = new Child_d('PP', 37);
console.log(instance5.colors); // "red, blue, green"
instance5.sayName(); // "PP"
instance5.sayAge(); // 37
