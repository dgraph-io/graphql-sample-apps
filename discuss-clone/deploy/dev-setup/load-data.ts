import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { GraphQLError } from "graphql"
import {
  AddCategoryInput,
  AddPostInput,
  AddUserInput,
  PermissionRef,
  Role
} from "../../src/types/graphql"
import {
  InitCategoriesMutation,
  InitCategoriesMutationVariables,
  InitCategoriesDocument,
  InitPostsMutation,
  InitPostsMutationVariables,
  InitPostsDocument,
} from "./types/operations"
import { lorem } from 'faker';

require("dotenv").config()

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT + '/graphql',
    fetch: fetch,
  }),
})

const diggy: AddUserInput = {
  username: "diggy@dgraph.io",
  displayName: "Diggy",
  avatarImg: "/diggy.png",
}

const michael: AddUserInput = {
  username: "michael@dgraph.io",
  displayName: "Michael",
  // roles: [ { role: Role.Administrator } ]
}

// const apoorv: AddUserInput = {
//   username: "apoorv@dgraph.io",
//   displayName: "Michael",
//   roles: [ { role: Role.Administrator } ]
// }

const stdAdmins: PermissionRef[] = [
  { role: Role.Administrator, user: { username: "michael@dgraph.io" } },
  // { role: Role.Administrator, user: { username: "apoorv@dgraph.io" } } 
]

const categories: Array<AddCategoryInput> = [
  { name: "General", isPublic: true, permissions: stdAdmins },
  { name: "GraphQL", isPublic: true, permissions: stdAdmins  },
  { name: "Slash GraphQL", isPublic: true, permissions: stdAdmins  },
  { name: "React", isPublic: true, permissions: stdAdmins  },
  { name: "Dgraph Internal", isPublic: false, permissions: stdAdmins  },
]

const qsQuote = `
With Dgraph you design your application in GraphQL. 

You start by designing a set of GraphQL types that describes your app. When you load that data model into Dgraph, it takes those types, prepares graph storage for them and generates a GraphQL API with queries and mutations.

With that you can iterate quickly.  Thanks to Dgraph and all the tools in the GraphQL ecosystem, you can iterate on your data model and app without leaving your editor.  There's so many great tools in GraphQL to help you develop, you should set those up early so you get a great development experience.

With Dgraph, you design the graph of your, store a graph and query a graph. You think and design in terms of the graph that your app is based around.  And, best of all, you do all that inside the GraphQL ecosystem.
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
      title: "I have something auto-generated to say",
      text: lorem.paragraphs(7),
      datePublished: tenMinsAgo,
      likes: 10,
      category: { name: "General" },
      author: michael,
      comments: []
    },
    {
      title: "My first post about Dgraph GraphQL",
      text: qsQuote,
      datePublished: now,
      likes: 1,
      category: { name: "GraphQL" },
      author: diggy,
      comments: []
    },
    {
      title: "Let me quote from the docs",
      text: docsQuote,
      datePublished: tenMinsAgo,
      likes: 5,
      category: { name: "GraphQL" },
      author: michael,
      comments: []
    },
    {
      title: "I know some things about Dgraph",
      text: "It's a GraphQL native DB written from the disk up in Go.\nIn fact, I know so much, I can tell you in latin.\n"+lorem.paragraphs(6),
      datePublished: anHourAgo,
      likes: 50,
      category: { name: "Dgraph" },
      author: diggy,
      comments: []
    },
    {
      title: "How should I layout my components?",
      text: "Oh man, I can do the code, but the layout, that's not my thing.",
      datePublished: yesterday,
      category: { name: "React" },
      author: michael,
      comments: []
    }
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
