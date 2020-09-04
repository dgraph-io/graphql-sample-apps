const { GraphQLClient } = require("graphql-request@1.8.2")

function enrichJWTFromSlashGraphQL(user, context, callback) {
  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context)
  }

  // Fill this value with your Slash GraphQL backend.
  const slashGraphQL = "<<your-Slash-GraphQL-URL>>"

  // Fill this in with the custom claims namespace for your app.
  const namespace = "<<app-claims-namespace>>"

  const client = new GraphQLClient(slashGraphQL, {
    headers: { Authorization: context.idToken },
  })

  client
    .request(
      `query getLoggedInUser($username: String!) {
        getUser(username: $username) {
          roles {
            role
            forCategory
          }
        }
      }`,
      { name: user.email }
    )
    .then((data, err) => {
      const hasAdminRole = !!(
        data &&
        data.getUser &&
        data.getUser.roles.find(
          (p) => (p.role = "ADMINISTRATOR" && !p.forCategory)
        )
      )
      context.idToken[namespace].role = hasAdminRole ? "Admin" : "User"

      callback(err, user, context)
    })
    .catch((error) => {
      cb(error, user, context)
    })
}
