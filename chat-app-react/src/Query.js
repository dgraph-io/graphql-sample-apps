import { gql } from "@apollo/client";

const SUBSCRIPTION_QUERY = gql`
  subscription {
    queryMessage(order: { desc: time }) {
      name
      text
      time
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($name: String!, $text: String!, $time: DateTime!) {
    addMessage(input: [{ name: $name, text: $text, time: $time }]) {
      message {
        name
        text
        time
      }
    }
  }
`;

export { SUBSCRIPTION_QUERY, SEND_MESSAGE };