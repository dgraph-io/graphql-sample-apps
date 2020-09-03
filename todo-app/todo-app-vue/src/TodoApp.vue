<template>
  <div id="app">
    <section class="todoapp" v-cloak>
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all">Mark all as completed</label>
        <ul class="todo-list">
          <TodoItem
            v-for="todo in newTodos"
            v-bind:todo="todo"
            v-bind:deleteTodo="deleteTodo"
            v-bind:toggleTodo="toggleTodo"
            v-bind:editTodo="editTodo"
            v-bind:doneEdit="doneEdit"
            v-bind:cancelEdit="cancelEdit"
            v-bind:editedTodo="editedTodo"
            :key="todo.id"
          />
        </ul>
      </section>
      <TodoFooter
        v-bind:pluralize="pluralize"
        v-bind:removeCompleted="removeCompleted"
        v-bind:remaining="remaining"
        v-bind:todoLength="todos.length"
        v-bind:visibility="visibility"
      />
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="https://dgraph.io/graphql" target="_blank">Dgraph Labs</a></p>
     </footer>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { CLEAR_COMPLETED_TASKS, TOGGLE_ALL_TASKS, TASK_EDIT, TASK_DELETE, TASK_MUTATION, TASK_QUERY, TASK_TOGGLE } from "./GraphQLData";

var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
}

export default {
  name: 'TodoApp',
  data () {
    return {
      todos: [],
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },
  components: {
    TodoItem,
    TodoFooter,
  },
  apollo: {
    todos: {
      query: TASK_QUERY,
      update: data => data.queryTask,
      pollInterval: 300, // in ms
    },
  },
  created: function () {
    window.addEventListener("hashchange", this.onHashChange);
    this.onHashChange();
  },
  computed: {
    // list todos based on the visibility
    newTodos: function() {
      return filters[this.visibility](this.todos)
    },
    // number of tasks yet to complete
    remaining: function () {
      return filters.active(this.todos).length
    },
    // clear all completed tasks
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.todos.forEach(function(todo) {
          todo.completed = value;
        });
        this.$apollo
        .mutate({
          mutation: TOGGLE_ALL_TASKS,
          variables: {
            completed: value,
          },
        })
        .then((data) => {
          console.log(data)
        }).catch((error) => {
          console.error(error)
        })
      }
    },
  },
  methods: {
    // handle routing
    onHashChange: function () {
      var visibility = window.location.hash.replace(/#\/?/, "");
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    },
    // for selecting the suffix - task/tasks
    pluralize: function (word, count) {
      return count === 1 ? word : word + 's';
    },
    // adding todo
    addTodo: function() {
      const addTodo = this.newTodo.trim();
      // when the trimed todo is empty:
      //  - not adding to db and
      //  - clearing the input box
      if (addTodo === '') {
        this.newTodo = '';
        return;
      }
      const task = [
        {
          title: addTodo,
          completed: false,
        },
      ];
      this.$apollo
        .mutate({
          mutation: TASK_MUTATION,
          variables: {
            task: task,
          },
        })
        .then((data) => {
          console.log(data);
          this.newTodo = ''
        }).catch((error) => {
          console.error(error);
          this.newTodo = addTodo
        })
    },
    // deleting todo
    deleteTodo: function(todo) {
      this.$apollo
        .mutate({
          mutation: TASK_DELETE,
          variables: {
            taskID: [todo.id],
          },
        })
        .then((data) => {
          console.log(data)
        }).catch((error) => {
          console.error(error)
        })
    },
    // toggling todo
    toggleTodo: function (todo) {
      this.$apollo
        .mutate({
          mutation: TASK_TOGGLE,
          variables: {
            taskID: todo.id,
            completed: !todo.completed
          },
        })
        .then((data) => {
          console.log(data)
        }).catch((error) => {
          console.error(error)
        })
    },
    // editting todo - setting beforeEditCache and editedTodo identifier
    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    // done editting when enter button is pressed or text field is out of focus
    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.deleteTodo(todo)
      } else {
        this.$apollo
        .mutate({
          mutation: TASK_EDIT,
          variables: {
            id: todo.id,
            title: todo.title,
          },
        })
        .then((data) => {
          console.log(data)
        }).catch((error) => {
          console.error(error)
        })
      }
    },
    // cancelling edit todo - reset the task back to previous text
    cancelEdit: function(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    // removing completed tasks
    removeCompleted: function() {
      this.$apollo
        .mutate({
          mutation: CLEAR_COMPLETED_TASKS,
          variables: {
            completed: true,
          },
        })
        .then((data) => {
          console.log(data)
        }).catch((error) => {
          console.error(error)
        })
    },
  }
}
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>