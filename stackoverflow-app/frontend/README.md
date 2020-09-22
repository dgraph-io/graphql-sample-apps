## Simple app
This is a simple GraphQL web application to demonstrate Dgraph's GraphQL capabilities.
The web app is built using ReactJS and Apollo-React client libraries.
And the GraphQL API's for the web app is powered by Dgraph.

## Setup ngrok
- Go [here](https://ngrok.com/download) and download it. We are using it to create a public HTTPS URL, which will be later on used by the Auth0 hook.  
- Then start ngrok with the port number on which Dgraph GraphQL instance is running. For example
  ```sh
  $ ngrok http 8080
  ```

## Setup Auth0
- Head over to Auth0 and create an account.  Click 'sign up' [here](https://auth0.com/)
- Once signup is done, click "Create Application" in "Integrate Auth0 into your application"
- Give your app a name and select "Single Page Web App" application type
- Select React as the technology
- No need to do the sample app, scroll down to "Configure Auth0" and select "Application Settings"
- Select your app and add the values of `domain` and `clientid` in the file `src/auth_config.json`. Check this [link](https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0) for more information.
- Add `http://localhost:3000` to "Allowed Callback URLs", "Allowed Web Origins" and "Allowed Logout URLs"
- Select "hooks" from the side bar and click "Create New Hook", which triggers `Post User Registration` which is used to fire a mutation to Dgraph to add the user. 
- After creating the hook, click edit on the hook and copy in the contents of `auth0hook.js`.
- Change line 23 to include your ngrok address


## Runnning the app 

First clone the repo
```sh
$ git clone https://github.com/dgraph-io/graphql-asia-workshop
$ cd graphql-asia-workshop
```

Open terminal and start the React app
```sh
$ cd frontend
$ yarn install
$ yarn start
```
---