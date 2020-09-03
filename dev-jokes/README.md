# DevJokes

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

### S3 configuration
We are using S3 for storing images and a lambda function to get the signed URL. The snippets for S3 configuration is checked in [here](https://github.com/dgraph-io/DevJokes/tree/master/s3_snippets). The steps to configuring S3/Lambda are mentioned in the blog post. [here](AddLink). Then set up the API gateway to trigger the lambda.
After configuring S3 Console, update the API Endpoint in `src/config.js`.

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
