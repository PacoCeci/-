<!-- <template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo" />
        <MyList
          :todos="todos"
          :checkTodo="checkTodo"
          :deleteTodo="deleteTodo"
        />
        <MyFooter
          :todos="todos"
          :checkAllTodo="checkAllTodo"
          :clearAllTodo="clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue';
import MyFooter from './components/MyFooter.vue';
import MyList from './components/MyList.vue';

export default {
  name: 'App',
  components: { MyHeader, MyList, MyFooter },
  data() {
    return {
      todos: [
        { id: '001', title: 'aaa', done: false },
        { id: '002', title: 'bbb', done: false },
        { id: '003', title: 'ccc', done: false },
      ],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => !todo.done);
    },
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script> -->

<template>
  <VirtualList :listData="data" :estimatedItemSize="100" v-slot="slotProps">
    <ListItem :item="slotProps.item" />
  </VirtualList>
</template>

<script>
import VirtualList from './components/VirtualList/VirtualList.vue';
import ListItem from './components/VirtualList/ListItem.vue';

import faker from 'faker';

let data = [];
for (let id = 0; id < 1000; id++) {
  data.push({
    id,
    value: faker.lorem.sentences(), // 长文本
  });
}

export default {
  name: 'app',
  data() {
    return {
      data,
    };
  },
  components: {
    VirtualList,
    ListItem,
  },
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
