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
var unirest = require("unirest");
module.exports = function (user, context, cb) {
var req = unirest("POST", "https://61cb0829.ngrok.io/graphql"); // Change the URL with your ngrok HTTPS URL
console.log("user", user)
req.headers({
  "content-type": "application/json"
});

const email = user.email;

req.send(`{\"query\":\"mutation {addAuthor(input:[{username: \\"${email}\\", email: \\"${email}\\"}]){author {username}}}\"}`);

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

  cb();
};
