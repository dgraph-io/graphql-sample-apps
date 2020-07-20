<template>
  <footer class="footer" v-show="todoLength">
    <span class="todo-count">
      <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
    </span>
    <ul class="filters">
      <li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
      <li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
      <li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="todoLength > remaining">
      Clear completed
    </button>
  </footer>
</template>
<script>
export default {
  name: 'TodoFooter',
  props: [
    'pluralize',
    'removeCompleted',
    'remaining',
    'todoLength',
    'visibility'
  ]
}
</script>