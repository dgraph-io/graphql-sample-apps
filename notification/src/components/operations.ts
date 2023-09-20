import { graphql } from "../gql";

export const SchoolFragment = graphql(`
  fragment MessageItem on Message {
    id
    title
    issued
    expire
  }
`)


export const AllMessages = graphql(`
  query allMessages {
    queryMessage (first: 10) {
        ...MessageItem
    }
  }
`)

