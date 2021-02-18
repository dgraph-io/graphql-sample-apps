Discuss clone in Dgraph GraphQL

This app is intended to show off Dgraph quick start, and integration with Auth0.  

# Running 

To run, you just need to get the Dgraph GraphQL backend running with

```sh
./deploy/dev-setup/run.sh up
```

That brings up Dgraph in a docker container and adds the seed data.

Then

```
yarn install
yarn start
```

Brings up the React app.

# How it was built

There's a blog about building this app (FIXME: insert link)

Basic setup:

```
npx create-react-app discuss-clone --template typescript

yarn add graphql @apollo/client react-router-dom

yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/add @graphql-codegen/near-operation-file-preset

yarn add -D @types/react-router-dom
```
