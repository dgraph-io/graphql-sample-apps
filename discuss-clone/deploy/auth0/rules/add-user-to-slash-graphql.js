function addUserToSlashGraphQL(user, context, callback) {
  if (context.stats.loginsCount === 1) {
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
      })
  } else {
    callback(null, user, context)
  }
}
