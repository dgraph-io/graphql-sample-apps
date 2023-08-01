function addUserToSlashGraphQL(user, context, callback) {
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

  const findUser = `
    query getUser($username: String!) {
      getUser(username: $username) {
        username
      }
    }
  `

  const addUser = `
    mutation($username: String!) {
      addUser(input: [{ username: $username, displayName: $username }]) {
        user {
          username
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
      // Now we have a signed JWT in body.access_token, so we can add the new user
      // into Slash GraphQL with an authenticated GraphQL mutation.

      const client = new GraphQLClient(slashGraphQL, {
        headers: { Authorization: response.data.access_token },
      })

      client
        .request(findUser, { username: user.email })
        .then((data, err) => {
          if (data && data.getUser && data.getUser.username === user.email) {
            // The user is already in Slash GraphQL
            callback(err, user, context)
          }

          client
            .request(addUser, { username: user.email })
            .then((data, error) => {
              callback(error, user, context)
            })
            .catch((error) => {
              callback(error, user, context)
            })
        })
        .catch((error) => {
          callback(error, user, context)
        })
    })
    .catch(function (error) {
      callback(error, user, context)
    })
}
