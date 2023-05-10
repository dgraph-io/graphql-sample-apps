<div style="padding-top: 5px; padding-bottom: 10px;">
  <h1 align="center">Surveyo</h1>
  <h2 align="center">
    A One-Click Deployable App with<br />
    <a href="https://dgraph.io/slash-graphql" target="_blank">
      <img src="https://dgraph.io/assets/images/slashgraphql-logo.svg" alt="Slash GraphQL" />
    </a><br />
    A fully-managed GraphQL backend service
  </h2>
</div>

<h3 align="center"><a href="https://slash.dgraph.io/_/one-click?app=surveyo" target="_blank">Deploy Now</a> for free!</h3>

Surveyo is a sample app that provides users with a survey tool that they can use to quickly create and respond to surveys. Advanced users can use Surveyo’s GraphQL endpoint to run complex queries on survey results. This app demonstrates how to use React hooks with Apollo client to create surveys, collect responses, visualize responses with charts, export responses into CSV, and delete surveys. Deploying this app on Slash GraphQL deploys both the back-end database service and a front-end React app in a single click, no credit card required. To learn about this sample app, see: [Building a Survey Forms App with GraphQL](https://dgraph.io/blog/post/surveyo-into/).

### Features

- Supports Short Answer, Multiple-Choice Question, Date Query and Rating type of questions
- Visualize responses collected as Pie Chart, Word Cloud and Bar chart
- Provides inline GraphiQL IDE to make GraphQL queries to chart data directly
- Export survey responses into CSV.

### Front-end

- [React](https://reactjs.org/) (3.4.1)—a JavaScript library for building user interfaces.
- [Apollo Client](https://www.npmjs.com/package/apollo-client) (3.1.1)—a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- [Auth0 React](https://github.com/auth0/auth0-react)—Auth0 SDK for React Single Page Applications (SPA).
- [AntDesign](https://ant.design/)—a design system for enterprise-level products.
- [Chart.js](https://www.chartjs.org/)—a simple yet flexible JavaScript charting for designers & developers
- [TypeScript](https://www.typescriptlang.org/)—extends JavaScript by adding types.
- [GraphiQL](https://github.com/graphql/graphiql)—a graphical interactive in-browser GraphQL IDE

### Back-end

- [Slash GraphQL](https://dgraph.io/slash-graphql)—a fully managed GraphQL backend service.
- [Using Auth0](https://dgraph.io/docs/learn/developer/todo-app-tutorial/todo-auth0-jwt/)-how to use auth0. 
- [Auth0](https://auth0.com/)—Secure access for everyone.

## Getting started

### No-Auth Version

+ Inside the root folder, locate the schema_noauth.graphql file, copy all the content and run it in your graphql client or via terminal using the command `curl -X POST localhost:8080/admin/schema --data-binary <@YOUR-SCHEMA-NAME>`.
+ Inside the src folder locate the Apollo Config.js file and the createApolloClient function change the valor of the constant GRAPHQL ENDPOINT > To `http://localhost:8080/graphql`.
+ In the root folder of the application, open a terminal and run the following commands: `npm install` and then `npm start`.

### Links

- [Deploy Now](https://slash.dgraph.io/_/one-click?app=surveyo)
- [Blog: Building a Survey Forms App with GraphQL](https://dgraph.io/blog/post/surveyo-into/)
- [Demo](https://surveyo.one-click.cloud.dgraph.io/)
- [Community Support](https://discuss.dgraph.io/)

### Screenshots

#### Creating a form

<img src="public/Create-Form.gif" />

#### Visualizations of responses

<img src="public/Charts.gif" />

## Forking and running locally

### Environment variables

- To configure Surveyo with Slash GraphQL, create a `.env` file and add `REACT_APP_GRAPHQL_ENDPOINT` to the endpoint of your Slash cluster.

- In Slash GraphQl, Load the schema from schema.graphql present in this repo

- Start the frontend

### Auth0 Configuration

We use Auth0 for authorisation. The snippets for auth0 configuration are checked in the code [here](https://github.com/rahulgurnani/surveyo/tree/master/auth0_snippets). The steps of configuring Auth0 dashboard are mentioned in the blog post [here](https://dgraph.io/blog/post/surveyo-into/).
After configuring Auth0 dashboard, update the Auth0 config used in the code present in src/AuthConfig.json.
