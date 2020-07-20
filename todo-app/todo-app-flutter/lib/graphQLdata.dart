String addTask() {
  return ("""mutation AddTask(\$task: [AddTaskInput!]!) {
      addTask(input: \$task) {
        task {
          id
          title
        }
      }
    }""");
}

String fetchAll() {
  return ("""query QueryTask{
      queryTask {
        id
        title
        completed
      }
     }""");
}

String toggleTask() {
  return """mutation ToggleTask(\$taskID: ID!, \$completed: Boolean!) {
      updateTask(input: {
        filter: { id: [\$taskID] },
        set: {
            completed: \$completed
        }
      }) {
        task {
          id
          title
          completed
        }
      }
    }""";
}

String toggleAllTask() {
  return """mutation ToggleAllTask(\$completed: Boolean!) {
      updateTask(input: {
        filter: {},
        set: {
          completed: \$completed
        }
      }) {
        task {
          id
          title
          completed
        }
      }
    }""";
}

String deleteTask() {
  return """mutation DeleteTask(\$taskID: [ID!]) {
      deleteTask(filter: { id: \$taskID }) {
        msg
      }
    }""";
}

String updateTask() {
  return """mutation UpdateTask(\$taskID: ID!, \$task: TaskPatch!) {
      updateTask(input: {
        filter: { id: [\$taskID] },
        set: \$task
      }) {
        task {
          id
          title
          completed
        }
      }
    }""";
}

String clearCompletedTask() {
  return """mutation ClearCompletedTask(\$completed: Boolean) {
      deleteTask(filter: { completed: \$completed }) {
        msg
      }
    }""";
}
