Tutorial materials for Dgraph's workshop at GraphQL Asia 2020.

This doesn't represent everything that was covered in the workshop.  It's enough to help you follow along with the presented material, particularly to cut and paste queries and mutations.  (soon, we'll build a web-based tutorial from the full workshop content)

If you are coming along after the workshop, you'll find all Dgraph's GraphQL material [here](https://dgraph.io/graphql).

## What you'll learn from the workshop

* What Dgraph (the GraphQL database) is.
* How to use Dgraph to design a GraphQL App.
* How to use Dgraph's GraphQL API.
* How to iterate on your App as you develop.
* How to build a frontend and backend server.

## Required tools

* docker
* GraphQL Playground / GraphiQL / insomnia / ...

* npm / yarn
* ngrok


# Part 1: Design your GraphQL - get GraphQL from Dgraph

Dgraph is a GraphQL database.  It gives you a GraphQL API from a GraphQL schema of your types and objects.  You don't design a relational schema and try to translate that back and forth to GraphQL.

Most GraphQL tools start with something else like a relational database - you design a relational schema and work out how that translates as a graph; you’ll think about the app in terms of the graph, but always have to mentally translate back and forth between the relational and graph models. There are engineering challenges around the translation as well as the efficiency of the queries.

Dgraph doesn't work like that.

Dgraph GraphQL is part of Dgraph, which stores a graph - it’s a database of nodes and edges. So it’s efficient to store, query and traverse as a graph. Your data will get stored just like you design it in the schema, and the queries are a single graph query that does just what the GraphQL query says.

Best of all, you design exactly what you want in GraphQL and get a GraphQL API for your GraphQL design.

## 1) Start Dgraph

```
mkdir dgraph
docker run -p 8080:8080 -it -v $(pwd)/dgraph:/dgraph dgraph/standalone:v2.0.0-beta
```

## 2) Send the schema to Dgraph

```
curl -X POST localhost:8080/admin/schema --data-binary '

type Author {
  username: String! @id
  email: String!
  questions: [Question] @hasInverse(field: author)
}

interface Post {
  id: ID!
  text: String!
  datePublished: DateTime
  author: Author!
}

type Question implements Post {
  title: String!
}

'
```

## 3) Do GraphQL :-)

Use GraphQL Playground, insomnia, GraphiQL, etc to run queries and mutations at `http://localhost:8080/graphql`


Add some authors:

```
mutation {
  addAuthor(input: [
    { username: "Michael", email: "michael@michael.com.au" },
    { username: "Apoorv", email: "apoorv@apoorv.com" }, 
    { username: "Karthic", email: "karthic@metal.com" }
  ]) {
    author {
      username
    }
  }
}
```

Get an author by name:

```
query {
  getAuthor(username: "Michael") {
    username
    questions {
      text
    }
  }
}
```

Query all authors:

```
query {
  queryAuthor {
    username
    questions {
      text
    }
  }
}
```

There's no questions in there yet, so let's add some.

A question needs everything from Post, plus the things from question, so thats: a title, some text and a link to an author.  The title and text are just strings.  The author is a link to an existing author by their id (username)

```
mutation addQuestion {
  addQuestion(input: [
    {
      title: "Is Dgraph a GraphQL database",
      text: "What sort of database is Dgraph and what GraphQL support does it have?",
      datePublished: "2020-02-20",
      author: { username: "Apoorv" }
    }
  ]) {
    question {
      id
      text
      title
      author {
        username
      }
    }
  }
}
```

You can do mutations by directly supplying data in the arguments, like above, or using GraphQL variables, like below.

Query:
```
mutation addQuestion($question: AddQuestionInput!){
  addQuestion(input: [$question]) {
    question {
      id
      text
      title
      author {
        username
      }
    }
  }
}
```

With variables:
```
{
  "question": {
    "title": "I want to as a question about GraphQL",
    "text": "Is this the very fist post about GraphQL in Dgraph?",
    "datePublished": "2020-02-20",
    "author": { "username": "Michael" }
  }
}
```


# Part 2: Iterate on your app by iterating on GraphQL

Let's do an iteration on our App.  We'll fill out the schema some more, adding more types, fields and adding search capability.  

We don't have to think about how to translate that to any other technology.  With Dgraph, we just update our schema and get back to work.

## Add Answers

Let's update our schema so that there's answer to questions.  We'll be adding this much

```
type Question implements Post {
  ...
  answers: [Answer]  @hasInverse(field: inAnswerTo)
}

type Answer implements Post {
  inAnswerTo: Question!
}
```

So the full schema becomes:

```
type Author {
  username: String! @id
  email: String!
  questions: [Question] @hasInverse(field: author)
  answers: [Answer] @hasInverse(field: author)
}

interface Post {
  id: ID!
  text: String! @search(by: [fulltext])
  datePublished: DateTime @search
  author: Author!
}

type Question implements Post {
  title: String! @search(by: [term])
  answers: [Answer]  @hasInverse(field: inAnswerTo)
}

type Answer implements Post {
  inAnswerTo: Question!
}
```

Save that to a file `schema.graphql` and update the Dgraph schema.

```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

Now we can add answers to questions.

Given a question, say one of Apoorv's:

```
query {
 getAuthor(username: "Apoorv") {
    username
    questions {
      id
      text
      title
    }
  }
}
```

Which gave me the result:

```
{
  "data": {
    "getAuthor": {
      "username": "Apoorv",
      "questions": [
        {
          "id": "0x5",
          "text": "What sort of database is Dgraph and what GraphQL support does it have?",
          "title": "Is Dgraph a GraphQL database"
        }
      ]
    }
  }
}
```

We can add an answer linking the answer to Apoorv's question:

```
mutation {
  addAnswer(input: [
    {
      text: "Dgraph's datamodel is a Graph and it servers GraphQL schemas",
      author: { username: "Michael" },
      "datePublished": "2020-02-20",
      inAnswerTo: { id: "0x5" }
    }
  ]) {
    answer {
      id
      text
      author {
        username
      }
      inAnswerTo {
        title
        text
        author {
          username
        }
      }
    }
  }
}
```

So you can iterate on your App idea, by thinking about GraphQL and iterating on your GraphQL schema.

## Add Search

Here's a new schema that adds search and comments.

```
type Author {
  username: String! @id
  email: String!
  questions: [Question] @hasInverse(field: author)
  answers: [Answer] @hasInverse(field: author)
}

interface Post {
  id: ID!
  text: String! @search(by: [fulltext])
  datePublished: DateTime @search
  author: Author!
  comments: [Comment] @hasInverse(field: commentsOn)
}

type Question implements Post {
  title: String! @search(by: [term])
  answers: [Answer]  @hasInverse(field: inAnswerTo)
}

type Answer implements Post {
  inAnswerTo: Question!
}

type Comment implements Post {
  commentsOn: Post!
}
```

Update `schema.graphql` and update the Dgraph schema with:

```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

Dgraph uses the `@search` directive to build search capability into the generated GraphQL API.  E.g. from 

```
type Question implements Post {
  title: String! @search(by: [term])
  ...
}
```

we get search over the terms (words) in the question titles.

```
query {
  queryQuestion(filter: { title: { anyofterms: "GraphQL"}}) {
    id
    title
    text
    author {
      username
    }
  }
}
```

While the `@search` for a post's text gives a full text search like you would in google

```
query {
  queryQuestion(filter: { text: { alloftext: "database with GraphQL support"}}) {
    id
    title
    text
    author {
      username
    }
  }
}
```

From 

```
interface Post {
  ...
  datePublished: DateTime @search
  ...
}
```

we get search on when posts were added.

```
query {
  queryQuestion(
    filter: { datePublished: { ge: "2020-02-01" } }
  ) {
    id
    title
    text
    author {
      username
    }
  }
}
```

Dgraph also gives you pagination and ordering for free

```
query {
  queryQuestion(
    filter: { datePublished: { ge: "2020-02-01" } },
    order: { asc: datePublished }
    first: 10
  ) {
    id
    title
    text
    author {
      username
    }
  }
}
```

And you can do the filtering deep into a query:

```
query {
  getAuthor(username: "Apoorv") {
    username
    questions(filter: { text: { alloftext: "database with GraphQL support"}}) {
      text
    }
  }
}
```

We've also added comments, so now we can add comment threads.

```
mutation {
  addComment(input: [
    {
      text: "It's also distributed, so you get GraphQL at scale",
      author: { username: "Karthic" },
      commentsOn: { id: "0x7" }
    }
  ]) {
    comment {
      id
      text
      author {
        username
      }
      commentsOn {
        text
        author {
          username
        }
      }
    }
  }
}
```

## Render a page in a single query

We can query the post and get all the data that we'd need in the UI to render its page in a single query.


```
query {
  getQuestion(id: "0x5") {
    title
    text
    author {
      username
    }
    comments {
      text
      author {
        username
      }
    }
    answers {
      text
      author {
        username
      }
      comments {
        text 
        author {
          username
        }
      }
    }
  }
}
```

## review

Quick look at what we've got and how we got here.

* With Dgraph you design in GraphQL and go straight from a schema to a running GraphQL API.
* Iterating on the schema while you build you app is easy.
* We've gone straight from a schema to something that can:
    * run a GraphQL API for our schema
    * has built in search and filtering
    * can give the data to render a stackoverflow / discuss page in one query

# Part 3: Iterate on your app and update existing data

Let's do another iteration and update our data to match.

We'll add tags to questions and ensure that we can search on those tags.

```
type Question implements Post {
  ...
  tags: [String] @search(by: [hash])
  ...
}
```

That gives us this schema:

```
type Author {
  username: String! @id
  email: String!
  dob: DateTime
  questions: [Question] @hasInverse(field: author)
  answers: [Answer] @hasInverse(field: author)
}

interface Post {
  id: ID!
  text: String! @search(by: [fulltext])
  datePublished: DateTime @search
  likes: Int
  author: Author!
  comments: [Comment] @hasInverse(field: commentsOn)
}

type Question implements Post {
  title: String! @search(by: [term])
  answers: [Answer]  @hasInverse(field: inAnswerTo)
  tags: [String] @search(by: [hash])
}

type Answer implements Post {
  inAnswerTo: Question!
}

type Comment implements Post {
  commentsOn: Post!
}
```

Update your schema.graphql file and then refresh the Dgraph schema as before with:

```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

But all the existing questions don't have any tags :-(

No problem, we can use the built in mutations to update the existing data - so as we iterate on our app and iterate on our schema, we can also automate the updating of our existing data.

```
mutation {
  updateQuestion(input: { 
    filter: { title: { anyofterms: "GraphQL" }},
    set: { tags: ["graphql"] }
  }) {
    question(first: 10) {
      title
      text
      tags
      author {
        username
      }
    }
  }
}
```

and because it's GraphQL, we can of course parameterize that query and run it for any values we like

```
mutation addTags($term: String!, $tag: String!) {
  updateQuestion(input: { 
    filter: { title: { anyofterms: $term }},
    set: { tags: [$tag] }
  }) {
    question(first: 10) {
      title
      text
      tags
      author {
        username
      }
    }
  }
}
```

```
{
  "term": "database",
  "tag": "database"
}
```

So you can design in GraphQL, iterate on your design in GraphQL, get native GraphQL execution and even do you data migration in GraphQL - the same data model that you are always thinking in  for you app.

# Get the UI and backend running

In the workshop we used this backend to build a UI and backend with further business logic.  Check the README.md files in the apllo-dgraph and frontend directories for instructions on those.