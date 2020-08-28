function (user, context, callback) {
    const namespace = "https://dgraph.io/jwt/claims";
    context.idToken[namespace] =
      {
        'USER': user.email,
      };
		
    return callback(null, user, context);
 }