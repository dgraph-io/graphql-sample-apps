// This rule makes a mutation to dgraph to add some users as moderators.
function (user, context, callback) {
  const unirest = require("unirest");
  // Change the URL with your slash endpoint
  const slashEndpoint = "https://lazy-panda-8164.us-west-2.aws.cloud.dgraph.io/graphql"; 
  var req = unirest("POST", slashEndpoint); 
  req.headers({
    "content-type": "application/json"
  });
  
  const username = user.email;
  const name = user.nickname;
  req.send(`{\"query\":\"mutation { addUser(input: [{ name: \\"${name}\\",username:\\"${username}\\" }]) { numUids }}\"}`); 
  req.end(function (res) {
    console.log(JSON.stringify(res.body));
    if (res.body.errors) {
        console.log(JSON.stringify(res.body));
        if(res.body.errors) throw new Error(res.body.errors);
    }
  });
  return callback(null, user, context);
}