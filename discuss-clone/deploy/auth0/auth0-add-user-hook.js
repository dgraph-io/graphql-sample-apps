/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/

var request = require("request")

// Add this hook as a "Post User Registration" hook.
// It needs both a "Client Credentials Exchange" hook and
// a "MACHINE TO MACHINE" application set up to work
// (see auth0-authorize-add-user.js).

// Example of an Auth0 hook that's run on Auth0 "Post User Registration".
// After Auth0 has processed the user registration flow and added the user
// to its user data base for the app (there's lots of ways to set this up),
// it calls this hook which then adds the user to the Dgraph graph - the user
// is needed there, so we can link the user to their posts.  (Another way to
// set it up would have been to keep the user details only in auth0 and just
// tag the posts with a 'username', but we want more user data in the Dgraph
// graph, so we also create a user object there.)
//
// In this case, we have locked down the Dgraph GraphQL API so that the only way to
// add a user is if the request contains a valid Auth0 signed JWT that has the
// 'AddUser' permission, and the only way to get that is if you know the
// Auth0 secrets.  So this hook must first get such a token, and then call the
// Dgraph GraphQL API.

module.exports = function (user, context, cb) {
  // Fill these values in with the details of your Auth0 "MACHINE TO MACHINE" application.
  // Creating the M2M app gives you the credentials needed to call the 'authorizationHook'
  // and thus generate an Auth0 signed JWT.
  const authorizationHook = "https://dev-x44cgu-8.auth0.com/oauth/token"
  const clientID = "<<your client id>>"
  const clientSecret = "<<your client secret>>"
  const authAudience = "https://dev-x44cgu-8.auth0.com/api/v2/"

  // Fill these values with your Dgraph GraphQL instances.
  // * If you have a Slash GraphQL instance, it's the URL of your deployment
  // * If you have Dgraph running locally, that will be the ngrok URL
  // * If you have a Dgraph deployed elsewhere, then it's the URL of your deployment
  const dgraphURL = "https://69d57768a343.ngrok.io/graphql"

  // First grab an Auth0 signed JWT token that's authorized to add a user.
  request(
    {
      method: "POST",
      url: authorizationHook,
      json: true,
      body: {
        client_id: clientID,
        client_secret: clientSecret,
        audience: authAudience,
        grant_type: "client_credentials",
      },
    },
    function (error, response, body) {
      if (error) {
        throw new Error(error)
      }

      // console.log(body)
      // console.log("adding " + user.email)

      // Then use the token to call the Dgraph API and add the user
      request(
        {
          method: "POST",
          url: dgraphURL,
          json: true,
          headers: {
            Authorization: body.access_token,
          },
          body: {
            query:
              "mutation ($name:String!) {addUser(input:[{username: $name, displayName: $name}]){user {username}}}",
            variables: { name: user.email },
          },
        },
        function (err, resp, b) {
          // console.log(b)
          cb(err, resp)
        }
      )
    }
  )
}
