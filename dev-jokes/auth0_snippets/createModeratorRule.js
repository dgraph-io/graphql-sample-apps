// This rule makes a mutation to dgraph to add some users as moderators.
function (user, context, callback) {
  const unirest = require("unirest");
  // Change the URL with your slash endpoint
  const slashEndpoint = "https://lazy-panda-8164.us-west-2.aws.cloud.dgraph.io/graphql"; 
  var req = unirest("POST", slashEndpoint); 
  req.headers({
    "content-type": "application/json"
  });
  
  // List of moderators
  const moderators = ["xyz@gmail.com", "abc@dgraph.io"];
  
  const username = user.email;
  const name = user.nickname;
 	const isMod = moderators.includes(username);
  req.send(`{\"query\":\"mutation { addUser(input: [{ name: \\"${name}\\",username:\\"${username}\\", isMod: ${isMod} }]) { numUids }}\"}`); 
  req.end(function (res) {
    console.log(JSON.stringify(res.body));
    if (res.body.errors) {
      // Try update
      var req2 = unirest("POST", slashEndpoint);
  req2.headers({
    "content-type": "application/json"
  });
      req2.send(`{\"query\":\"mutation { updateUser(input: {filter: {username: {eq: \\"${username}\\"}}, set: {isMod: ${isMod}}}) { numUids }}\"}`);
      req2.end(function (res){
        console.log(JSON.stringify(res.body));
        if(res.body.errors) throw new Error(res.body.errors);
      });
    }
  });
  return callback(null, user, context);
}