function addUserToSlashGraphQL(user, context, callback) {
  if (context.stats.loginsCount === 1) {
    const { GraphQLClient } = require("graphql-request@1.8.2")

    // Fill this value with your Slash GraphQL backend.
    const slashGraphQL = "<<your-Slash-GraphQL-URL>>"

    const client = new GraphQLClient(slashGraphQL, {
      headers: { Authorization: context.idToken },
    })

    client
      .request(
        `mutation($username: String!) {
          addUser(input: [ { username: $username, displayName: $username } ]) {
            user { username }
          }
        }`,
        { username: user.email }
      )
      .then((data, error) => {
        callback(error, user, context)
      })
      .catch((error) => {
        callback(error, user, context)
      })
  } else {
    callback(null, user, context)
  }
}
