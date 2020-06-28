import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { GraphQLError } from "graphql"
import {
  AddCategoryInput,
  AddPostInput,
  AddUserInput,
} from "../../src/types/graphql"
import {
  InitCategoriesMutation,
  InitCategoriesMutationVariables,
  InitCategoriesDocument,
  InitPostsMutation,
  InitPostsMutationVariables,
  InitPostsDocument,
} from "./types/operations"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:8080/graphql",
    fetch: fetch,
  }),
})

const categories: Array<AddCategoryInput> = [
  { name: "GraphQL" },
  { name: "Dgraph" },
  { name: "React" },
]

const diggy: AddUserInput = {
  username: "diggy",
  displayName: "Diggy",
  avatarImg: "/diggy.png",
}

const michael: AddUserInput = {
  username: "michael",
  displayName: "Michael",
  avatarImg: "/michael.png",
}

const virat: AddUserInput = {
  username: "virat",
  displayName: "Virat",
}

const qsQuote = `
With Dgraph you design your application in GraphQL. You design a set of GraphQL types that describes your requirements. Dgraph takes those types, prepares graph storage for them and generates a GraphQL API with queries and mutations.

You design a graph, store a graph and query a graph. You think and design in terms of the graph that your app is based around.
`

const docsQuote = `
Dgraph creates a GraphQL API from nothing more than GraphQL types. That's great, and gets you moving fast from an idea to a running app. However, at some point, as your app develops, you might want to customize the behaviour of your schema.

In Dgraph, you do that with code (in any language you like) that implements custom resolvers.

Dgraph doesn't execute your custom logic itself. It makes external HTTP requests. That means, you can deploy your custom logic into the same Kubernetes cluster as your Dgraph instance, deploy and call, for example, AWS Lambda functions, or even make calls to existing HTTP and GraphQL endpoints.
`

function makePosts(): Array<AddPostInput> {
  const now = new Date()
  const tenMinsAgo = new Date()
  const anHourAgo = new Date()
  const yesterday = new Date()
  const lastWeek = new Date()

  tenMinsAgo.setMinutes(now.getMinutes() - 10)
  anHourAgo.setHours(now.getHours() - 1)
  yesterday.setDate(now.getDate() - 1)
  lastWeek.setDate(now.getDate() - 7)

  return [
    {
      title: "My first post about GraphQL",
      text: qsQuote,
      datePublished: now,
      likes: 1,
      category: { name: "GraphQL" },
      author: michael,
    },
    {
      title: "Let me quote from the docs",
      text: docsQuote,
      datePublished: tenMinsAgo,
      likes: 5,
      category: { name: "GraphQL" },
      author: diggy,
    },
    {
      title: "I know some things about Dgraph",
      text: "It's a GraphQL native DB written from the disk up in Go.",
      datePublished: anHourAgo,
      likes: 50,
      category: { name: "Dgraph" },
      author: diggy,
    },
    {
      title: "How should I layout my components?",
      text: "Oh man, I can do the code, but the layout, that's not my thing.",
      datePublished: yesterday,
      category: { name: "React" },
      author: michael,
    },
    {
      title: "Where should I deploy my frontend app?",
      text: "I'm developing some new skills in development",
      datePublished: lastWeek,
      likes: 1000000,
      category: { name: "React" },
      author: virat,
    },
  ]
}

async function installData(): Promise<Readonly<GraphQLError[]> | undefined> {
  const { data: categoryData, errors: categoryErrors } = await client.mutate<
    InitCategoriesMutation,
    InitCategoriesMutationVariables
  >({
    mutation: InitCategoriesDocument,
    variables: { categories },
  })

  if (categoryErrors || !categoryData?.addCategory?.category) {
    return categoryErrors
  }

  console.log(`added ` + categoryData.addCategory.category.length + ` users`)

  const posts = makePosts()

  for (let cat of categoryData.addCategory.category) {
    for (let post of posts) {
      if (cat && cat.name === post.category.name) {
        post.category.id = cat.id
      }
    }
  }

  const { data: postsData, errors: postsErrors } = await client.mutate<
    InitPostsMutation,
    InitPostsMutationVariables
  >({
    mutation: InitPostsDocument,
    variables: { posts },
  })

  if (postsErrors || !postsData?.addPost?.post) {
    return postsErrors
  }

  console.log(`added ` + postsData.addPost.post.length + ` posts`)
}

const result = installData()
result.then((errs) => {
  if (errs) {
    console.log(`Failed !`)
    console.log(errs)
  }
})
