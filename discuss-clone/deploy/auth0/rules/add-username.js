function addUsername(user, context, callback) {
  const namespace = "<<app-claims-namespace>>"
  context.idToken[namespace] = {
    username: user.email,
  }

  return callback(null, user, context)
}
