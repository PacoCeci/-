class _LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [
      () => {
        console.log(`this is ${name}! `);
        this.next();
      },
    ];

    setTimeout(() => {
      this.next();
    });
  }

  next() {
    if (this.tasks.length > 0) {
      const task = this.tasks.shift();
      task();
    }
  }

  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }

  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log('wake up after ' + time * 1000);
        this.next();
      }, time * 1000);
    };
    this.tasks.push(task);
    return this;
  }

  sleepFirst(time) {
    const task = () => {
      setTimeout(() => {
        console.log('wake up after ' + time * 1000);
        this.next();
      }, time * 1000);
    };
    this.tasks.unshift(task);
    return this;
  }
}

const LazyMan = function (name) {
  return new _LazyMan(name);
};

LazyMan('pp')
  .eat('apple')
  .sleepFirst(2)
  .eat('banana')
  .sleep(3)
  .eat('grape')
  .sleep(1);
