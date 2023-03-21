// ############# _new version 1 ####################
// ############# _new version 1 ####################
// ############# _new version 1 ####################
function _new(func) {
  return function () {
    const obj = {
      __proto__: func.prototype,
    };

    func.apply(obj, arguments);
    return obj;
  };
}

// #################################
function Person(name) {
  this.name = name;
}

const p = _new(Person)('ppppp');
console.log(p.name);

// ############# _new version 2 ####################
// ############# _new version 2 ####################
// ############# _new version 2 ####################
function _new2(func, ...args) {
  const obj = {
    __proto__: func.prototype,
  };

  func.apply(obj, args);
  return obj;
}

// #################################
function Animal(name) {
  this.name = name;
}

const a = _new2(Animal, 'aaaaa');
console.log(a.name);
