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

var request = require("request");

module.exports = function (user, context, cb) {
   // Fill these values in with the details of your Auth0 "MACHINE TO MACHINE" application.
  // Creating the M2M app gives you the credentials needed to call the 'authorizationHook'
  // and thus generate an Auth0 signed JWT.
  const authorizationHook = "https://<tenant>/oauth/token";
  const clientID = "<your-client-id>";
  const clientSecret = "<your-client-secret>";
  const authAudience = "https://<tenant>/api/v2/";
  const dgraphURL = "<slash-graphql-endpoint>";
  let mutationString = `mutation {addUser(input:[{email: "${user.email}", name: "${user.name}" }]) {user {id}}}`;

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

      console.log("Client credentials", body);
      console.log("adding " + user.email);

      // Then use the token to call the Dgraph API and add the user
      request(
        {
          method: "POST",
          url: dgraphURL,
          json: true,
          headers: {
            "X-Auth-Token": body.access_token,
          },
          body: { query: mutationString },
        },
        function (err, resp, b) {
          //console.log(b)
          cb(err, resp)
        }
      );
    }
  );
}