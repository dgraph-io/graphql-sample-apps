<template>
  <div class="view">
    <li
      :class="{ completed: todo.completed, editing: todo == editedTodo }"
    >
      <div class="view">
        <input class="toggle" type="checkbox" @click="toggleTodo(todo)" v-model="todo.completed" />
        <label @dblclick="editTodo(todo)">{{todo.title}}</label>
        <button class="destroy" @click="deleteTodo(todo)"></button>
      </div>
      <input
        class="edit"
        type="text"
        v-model="todo.title"
        v-todo-focus="todo == editedTodo"
        @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)"
        @keyup.esc="cancelEdit(todo)"
      />
    </li>
  </div>
</template>
<script>
export default {
  name: 'TodoItem',
  props: [
    'editedTodo',
    'todo',
    'toggleTodo',
    'editTodo',
    'doneEdit',
    'cancelEdit',
    'deleteTodo'
  ],
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
}
</script>