import gql from "graphql-tag";

export const GET_TODOS = gql`
  query {
    queryTodo: queryTask {
      id
      value: title
      completed
    }
  }
`

export const ADD_TODO = gql`
  mutation addTask($task: AddTaskInput!) {
    addTask(input: [$task]) {
      task {
        id
        value: title
        completed
      }
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTask($taskID: ID!, $task: TaskPatch!) {
    updateTask(input: {
      filter: { id: [$taskID] },
      set: $task
    }) {
      task {
        id
        value: title
        completed
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(filter: { id: [$id] }) {
      task {
        id
      }
    }
  }
`

export const CLEAR_COMPLETED_TODOS = gql`
  mutation updateTask {
    deleteTask(filter: { completed: true }) {
      task {
        id
      }
    }
  }
`

export const TOGGLE_COMPLETED = gql`
  mutation ToggleCompleted($id: ID!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      completed
    }
  }
`

export const UPDATE = gql`
  mutation updateTask($taskID: ID!, $title: String!) {
    updateTask(input: {
      filter: { id: [$taskID] },
      set: {
        title: $title
      }
    }) {
      task {
        id
        title
        completed
      }
    }
  }
`

export const TOGGLE_TODO = gql`
  mutation updateTask($taskID: ID!, $completed: Boolean!) {
    updateTask(input: {
      filter: { id: [$taskID] },
      set: {
        completed: $completed
      }
    }) {
      task {
        id
        title
        completed
      }
    }
  }
`;
