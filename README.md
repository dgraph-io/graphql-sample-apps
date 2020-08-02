# sudo-laugh
Slash powered DevJokes application

## Available Scripts

In the project directory, you can run:

### `npm install && npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Pointing to a Slash Endpoint

By default, this points to the tweet app Slash GraphQL endpoint. You can change this by starting the app with the following environment variable

```
REACT_APP_GRAPHQL_ENDPOINT=https://beneficial-baseball-9463.us-west-2.aws.cloud.dgraph.io/graphql npm start
```

### Adding a new page

The quickest way to add a new page would be to
1) Clone the src/components/home.js, and save it to your new type. Change the default exported constant from Home to whatever your page is
2) Add the page to the routes in src/App.js
