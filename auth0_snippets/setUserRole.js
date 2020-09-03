// This rule sets the role of few people as moderator.
function (user, context, callback) {
  const namespace = "https://dgraph.io/jwt/claims";
  // List of moderators
  const moderators = ["xyz@gmail.com", "abc@dgraph.io"];
  
 	const role = moderators.includes(user.email) ? "ADMIN":"USER";
  context.idToken[namespace] =
    {
      'USER': user.email,
      'ROLE': role
    };
  
  return callback(null, user, context);
}