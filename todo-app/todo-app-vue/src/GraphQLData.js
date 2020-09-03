import gql from "graphql-tag";

export const TASK_MUTATION = gql`
    mutation addTask($task: [AddTaskInput!]!) {
        addTask(input: $task) {
        task {
            id
            title
            completed
        }
        }
    }
`;

export const TASK_QUERY = gql`
    query {
        queryTask {
        id
        title
        completed
        }
    }
`;

export const TASK_DELETE = gql`
    mutation deleteTask($taskID: [ID!]) {
        deleteTask(filter: { id: $taskID }) {
        msg
        }
    }
`;

export const TASK_TOGGLE = gql`
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

export const TASK_EDIT = gql`
    mutation updateTask($id: ID!, $title: String! ) {
        updateTask(input: {
            filter: { id: [$id] },
            set: {
                title: $title
            }
        }) {
            task {
                id
                title
                completed
            }
            numUids
        }
    }
`;

export const CLEAR_COMPLETED_TASKS = gql`
    mutation clearCompletedTask($completed: Boolean) {
        deleteTask(filter: { completed: $completed }) {
            msg
        }
    }
`;

export const TOGGLE_ALL_TASKS = gql`
    mutation toggleAllTasks($completed: Boolean!) {
        updateTask(input: {
            filter: {},
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