# Surveyo

A simple survey form-creator application that can be used to create forms, collect responses, and visualize the aggregate data. It also gives users a GraphQL interface to perform complex queries on the collected data. Code respositroy is [here](https://github.com/rahulgurnani/surveyo).

Hosted [here](https://surveyo.one-click.cloud.dgraph.io/) and create your first form!

**Front-end**: [React](https://reactjs.org/), [ANT Design](https://ant.design/)

**Back-end**: [Slash GraphQL (Database)](https://dgraph.io/slash-graphql), [Auth0](https://auth0.com/) is used for creating JWT and create user hook

## Features

- Supports Short Answer, MCQs, Date Query and Rating type of questions.
- Visualize responses collected as Pie Chart, Word Cloud and Bar chart
- Provides GraphiQL IDE to make GraphQL queries

## Demo

### Creating a form

<img src="public/Create-Form.gif" width="450" />

### Visualizations of responses

<img src="public/Charts.gif" width="450" />

## Code structure and usage

### Running locally

### Environment variables

- To configure Surveyo with Slash GraphQL, create a `.env` file and add `REACT_APP_GRAPHQL_ENDPOINT` to the endpoint of your Slash cluster.

- In Slash GraphQl, Load the schema from schema.graphql present in this repo

- Start the frontend

### Auth0 configuration

We use Auth0 for authorisation. The snippets for auth0 configuration are checked in the code [here](https://github.com/rahulgurnani/surveyo/tree/master/auth0_snippets). The steps of configuring Auth0 dashboard are mentioned in the blog post [here](https://dgraph.io/blog/post/surveyo-into/).
After configuring Auth0 dashboard, update the Auth0 config used in the code present in src/AuthConfig.json.

## Contribution guidelines

This is an open source project, and we welcome contributions. Please open an issue if you have a feature request or better still if you have a PR for us to review.

### Issues

We use GitHub issues to track bugs and requests. Please ensure your bug description is clear and has sufficient instructions to be able to reproduce the issue. For feature requests, we would try to prioritize based on popularity.

### Pull Requests

All active development of this project happens on GitHub. We actively welcome your [pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

[Apache License 2.0](LICENSE)
