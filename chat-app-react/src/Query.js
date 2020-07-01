import gql from "graphql-tag";

const SUBSCRIPTION_QUERY = gql`
  subscription {
    queryMessage(order: { desc: time }) {
      name
      message
      time
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($name: String!, $message: String!, $time: DateTime!) {
    addMessage(input: [{ name: $name, message: $message, time: $time }]) {
      message {
        name
        message
        time
      }
    }
  }
`;

export { SUBSCRIPTION_QUERY, SEND_MESSAGE };