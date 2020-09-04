const { readFileSync, existsSync } = require("fs")
const readlineSync = require("readline-sync")
const { GraphQLClient, gql } = require("graphql-request")
const jwksClient = require("jwks-rsa")
require("dotenv").config()

const updateSchema = gql`
  mutation($schema: String!) {
    updateGQLSchema(input: { set: { schema: $schema } }) {
      gqlSchema {
        schema
      }
    }
  }
`

async function createSchema() {
  var schema = readFileSync("deploy/SlashGraphQL/schema.graphql", "utf8")

  const regexp = /"<<([\w-]*)>>"/g

  var i
  var match
  while((match = regexp.exec(schema)) !== null) {
    const ruleName = match[1]
    var rule = readFileSync(
      "deploy/SlashGraphQL/" + ruleName + ".auth.graphql",
      "utf8"
    )

    var re = new RegExp(`"<<` + ruleName + `>>"`, `g`)
    schema = schema.replace(re, '"""' + rule + '"""')
  }

  var authConfig = JSON.parse(
    readFileSync("deploy/SlashGraphQL/auth.json", "utf8")
  )

  if (existsSync("deploy/SlashGraphQL/public.key")) {
    var key = readFileSync("deploy/SlashGraphQL/public.key", "utf8")

    authConfig.Dgraph_Authorization.VerificationKey = key
  } else if (authConfig.jwksClient) {
    const client = jwksClient({
      jwksUri: authConfig.jwksClient.jwksUri,
    })
    authConfig.Dgraph_Authorization.VerificationKey = (
      await client.getSigningKeyAsync(authConfig.jwksClient.kid)
    ).getPublicKey()
  } else {
    console.log("Unable to find keys in auth config")
    process.exit(1)
  }

  schema =
    schema +
    "\n\n# Dgraph.Authorization " +
    JSON.stringify(authConfig.Dgraph_Authorization)

  console.log(schema)

  return schema
}

async function installSchema() {
  const gqlSchema = await createSchema()

  var slashToken = readlineSync.question("Slash GraphQL API Key : ", {
    hideEchoBack: true,
  })

  const client = new GraphQLClient(
    process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT + "/admin",
    { headers: { "X-Auth-Token": slashToken } }
  )

  const { error } = await client.request(updateSchema, { schema: gqlSchema })

  return error
}

installSchema()
  .then((error) => {
    if (error) {
      console.log(error)
    } else {
      console.log(
        `Schema added to Slash GraphQL instance at ` +
          process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT
      )
    }
  })
  .catch((error) => {
    console.log(error)
  })
