# DevJoke

A simple fun applications to post and view all your developer jokes. Code respository is [here](https://github.com/dgraph/DevJokes).


**Front-end**: [React](https://reactjs.org/), [Material UI](https://material-ui.com/)

**Back-end**: [Slash GraphQL (Database)](https://dgraph.io/slash-graphql), [Auth0](https://auth0.com/) is used for creating JWT and create user hook, [AWS-S3](https://aws.amazon.com/s3/) for storing images

## Features
- Support two kind of jokes: Text Joke and Meme
- Moderated content to feed you the best jokes and add enable better searching.
- Logged in users can like and share the jokes.
- Community moderation enabled through flagging.

## Demo
*Todo: Add GIFs*
### Creating a Joke

### Moderator Access

### Searching and interacting with Jokes

## Code structure and usage

### Slash Configuration

To configure Dev-Jokes with Slash GraphQL, launch the backend in slash and post the schema.
Then set `REACT_APP_GRAPHQL_ENDPOINT` to the endpoint of your Slash cluster in `src/config.js`.

### Auth0 configuration
We use Auth0 for authorisation. The snippets for auth0 rules are checked in the code [here](https://github.com/dgraph-io/DevJokes/tree/master/auth0_snippets). The steps of configuring Auth0 dashboard are mentioned in the blog post [here](AddLink). 
After configuring Auth0 dashboard, update the Auth0 config used in the code present in `src/config.js`.

You can set up Auth0 for DevJokes following these steps:

1. [Create a Single Page Application in Auth0 Dashboard](https://dgraph.io/docs/graphql/todo-app-tutorial/todo-ui/#auth0-integration) 
2. [Create “rule” in Auth0 dashboard to add claim to token with field as USER and ROLE](https://dgraph.io/docs/graphql/todo-app-tutorial/todo-auth0-jwt/) (see [this](https://github.com/dgraph-io/graphql-sample-apps/blob/master/dev-jokes/auth0_snippets/addUserRule.js))
3. Create “Add User” rule to Auth0 which creates a database entry for a user. (see [this](https://github.com/dgraph-io/graphql-sample-apps/blob/master/dev-jokes/auth0_snippets/addUserRule.js)).

### S3 configuration
We are using S3 for storing images and a lambda function to get the signed URL. The snippets for S3 configuration is checked in [here](https://github.com/dgraph-io/DevJokes/tree/master/s3_snippets). The steps to configuring S3/Lambda are mentioned in the blog post. [here](AddLink). Then set up the API gateway to trigger the lambda.
After configuring S3 Console, update the API Endpoint in `src/config.js`.

#### Setting up S3 Bucket
1. Create a bucket from AWS S3 storage service from AWS Management console. 
2. Now, enable CORS by updating the CORS config as show in snippet [here](https://github.com/dgraph-io/dev-jokes/blob/master/s3_snippets/cors.xml). Also, make the objects to be publicly accessible by following [these steps](https://stackoverflow.com/a/23102551). 

#### Setting up Lambda and API gateway
Next step is to create a lambda function to give us the signed URL to put the object in bucket.

1. Create a lambda function and replace the function code to the snippet provided here. Access key and secret can be generated following the docs on [Understanding and getting your AWS credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html). 
2. Now, you create an API gateway to access your lambda function. Go to API Gateway service and create a new API. 
3. Choose API type as REST API and build it.
4. Create a POST method by clicking on Actions > Create Method > POST and link it to the lambda function. Next, enable the CORS by selecting it from “Actions” dropdown.
5. Now, deploy the API which gives you the invoke URL to replace with `AWS_ENDPOINT` in `config.js`

Don't forget to update the credentials in the related file. Having set up the Auth0 and AWS, we are ready to launch the application locally and post the jokes.

### Running locally

```zsh
npm install && npm start
```

## Contribution guidelines
This is an open source project, and we welcome contributions. Please open an issue if you have a feature request or better still if you have a PR for us to review. 

### Issues
We use GitHub issues to track bugs and requests. Please ensure your bug description is clear and has sufficient instructions to be able to reproduce the issue. For feature requests, we would try to prioritize based on popularity. 

### Pull Requests

All active development of this project happens on GitHub. We actively welcome your [pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

[Apache License 2.0](LICENSE)
