# Real-Time Chat Application with React and Slash GraphQL

This code is in reference to the blog <add blog link after release>.

## Setup the backend with Slash DgraphQL and use the schema below

```graphql
type Message @withSubscription {
  id: ID!
  name: String!
  text: String!
  time: DateTime!
}
```

## Setup the frontend by installing Node.js and cloning this repository

Installing dependencies

```bash
npm install @apollo/client @apollo/link-ws subscriptions-transport-ws graphql
```

Steps to run

```bash
npm install
npm start
```
