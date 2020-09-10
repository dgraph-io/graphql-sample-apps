function enrichJWTFromSlashGraphQL(user, context, callback) {
  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context)
  }

  const axios = require("axios@0.19.2")
  const { GraphQLClient } = require("graphql-request@1.8.2")

  // Fill these values in with the details of your Auth0 "MACHINE TO MACHINE" application.
  // Creating the M2M app gives you the credentials needed to call the
  // "Client Credentials Exchange" and thus generate an Auth0 signed JWT.
  const authorizationHook = "<<your-M2M-hook>>"
  const clientID = "<<your-client-id>>"
  const clientSecret = "<<your-client-secret>>"
  const authAudience = "<<your-M2M-audience>>"

  // Fill this value with your Slash GraphQL backend.
  const slashGraphQL = "<<your-Slash-GraphQL-URL>>"

  // Fill this in with the custom claims namespace for your app.
  const namespace = "<<app-claims-namespace>>"

  const getLoggedInUser = `
    query getLoggedInUser($username: String!) {
      getUser(username: $username) {
        roles {
          role
          forCategory {
            id
          }
        }
      }
    }
  `

  axios
    .post(authorizationHook, {
      client_id: clientID,
      client_secret: clientSecret,
      audience: authAudience,
      grant_type: "client_credentials",
    })
    .then(function (response) {
      const client = new GraphQLClient(slashGraphQL, {
        headers: { Authorization: response.data.access_token },
      })

      client
        .request(getLoggedInUser, { username: user.email })
        .then((data, err) => {
          // console.log(data)
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
          callback(error, user, context)
        })
    })
    .catch(function (error) {
      callback(error, user, context)
    })
}
