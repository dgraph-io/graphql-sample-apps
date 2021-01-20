function (user, context, callback) {
  
  // const { request } = require('graphql-request');
  // const API = "https://[your-slash].[location].[service].cloud.dgraph.io/graphql";

  const CLAIMS = "https://dgraph.io/claims/graphqlkanban"; // REACT_APP_AUTH0_CLAIMS_KEY
  const CLIENT_ID = "eaNlZ3Hi019Ty8kfJ1cZ8iL4abmpZP24"; // REACT_APP_AUTH0_CLIENT_ID
  
  if (context.clientID!==CLIENT_ID) return callback(null, user, context);
  
  context.idToken[CLAIMS] = {username: user.email};
  return callback(null, user, context);

  /**
   * NOTE: To get make this work with one-click deploy application on Slash,
   * All of the deploys of this application with their own instance of Slash
   * will need to use the same Auth0 application and application. To make 
   * this happen, we cannot make queries and mutations from the Auth0 rule
   * to the specific slash db. To work around this, we are putting these
   * actions into the application.
   * 
   * On `/src/App.tsx` we have imported `ManageUsers` and place it as a child
   * component of ApolloProvider.
   * 
   * If you will be forking this application and hosting yourself, then we
   * recommend to remove/comment the above two lines (11 & 12), uncomment
   * lines 3 & 4, replace the API constant with your Slash GraphQL Endpoint,
   * and use the following actions below. 
   * 
   * Remove the work around on the client side by removing the `ManageUsers`
   * component from the `/src/App.tsx` file.
   * 
   */

  // const GET_USER = `query GET_USER($username: String!) {
  //   getUser(username: $username) {
  //     username
  //     isAdmin
  //     image
  //   }
  // }`;
  // const COUNT_USERS_AND_SEARCH = `query COUNT_USER_AND_SEARCH($username: String!) {
  //   aggregateUser {
  //     count
  //   }
  //   getUser(username: $username) {
  //     username
  //     isAdmin
  //     image
  //   }
  // }`;
  // const ADD_USER = `mutation ADD_USER($username: String! $displayName: String! $image: String $isAdmin: Boolean) {
  //   addUser(input:[{
  //     username: $username
  //     displayName: $displayName
  //     isAdmin: $isAdmin
  //     image: $image
  //   }]) {
  //     user {
  //       username
  //       isAdmin
  //       image
  //     }
  //   }
  // }`;
  // const UPDATE_USER = `mutation UPDATE_USER($username: String! $displayName: String $image: String) {
  //   updateUser(input: {
  //     filter: { usernmame: { eq: $username } }
  //     set: {
  //       displayName: $displayName
  //       image: $image
  //     }
  //   }) {
  //     user {
  //       username
  //     }
  //   }

  // }`;

  // async function returnUser () {
  //   try {
  //     const getUserRes = await request(API, GET_USER, {
  //       username: user.email
  //     });
  //     const { getUser } = getUserRes;
  //     if (getUser===null) return checkUser();
  //     getUser.IS_ADMIN = (getUser && typeof getUser.isAdmin === 'boolean') ? getUser.isAdmin.toString() : "false";
  //     context.idToken[CLAIMS] = getUser;
  //     return callback(null, user, context);
  //   } catch (err) {
  //     console.error(err);
  //     return callback(null, user, context);
  //   }
  // }
  
  // async function createUser (variables) {
  //   try {
  //     const newUserRes = await request(API, ADD_USER, variables);
  //     const { addUser: { user: createdUser } } = newUserRes;
  //     console.log('Created User:', createdUser);
  //     if (Array.isArray(createdUser) && createdUser.length===1) {
  //       createdUser[0].IS_ADMIN = (typeof createdUser[0].isAdmin === 'boolean') ? createdUser[0].isAdmin.toString() : "false";
  //       context.idToken[CLAIMS] = createdUser[0];
  //     }
  //     return callback(null, user, context);
  //   } catch (err) {
  //     console.error(err);
  //     return callback(null, user, context);
  //   }
  // }

  // async function checkUser () {
  //   console.log("checking user");
  //   try {
  //     const response = await request(API, COUNT_USERS_AND_SEARCH, {
  //       username: user.email
  //     });
  //     const count = (
  //       response && response.aggregateUser && response.aggregateUser.count
  //     ) ? response.aggregateUser.count : 0;
  //     const getUser = (
  //       response && response.getUser
  //     ) ? response.getUser : { username: null, isAdmin: false };
  //     const { username, isAdmin, displayName, image } = getUser;

  //     // if the user already exists do not add again
  //     const authDisplayName = user.name || user.email.match(/^([^@]*)@/)[1];
  //     if (username === user.email) {
  //       console.log('User already exists:', username);
  //       context.idToken[CLAIMS] = { username, isAdmin, image: user.picture, IS_ADMIN: (typeof isAdmin === 'boolean') ? isAdmin.toString() : "false" };
  //       return callback(null, user, context);
  //     // if the user already exists and either the displayName or picture/image is not the same, then update
  //     } else if((authDisplayName && displayName!==authDisplayName) || (user.picture && image!==user.picture)) {
  //       console.log('Updating existing user:', username);
  //       const options = {
  //         username: user.email
  //       };
  //       if (authDisplayName) options.displayName = authDisplayName;
  //       if (user.picture) options.image = user.picture;
  //       request(API, UPDATE_USER, options);
  //     }

  //     const userVariables = {
  //       username: user.email,
  //       displayName: authDisplayName,
  //       // if this is the first user, make them an admin
  //       isAdmin: (count<1),
  //       image: user.picture
  //     };
      
  //     return createUser(userVariables);
  //   } catch (err) {
  //     console.error(err);
  //     return callback(err, user, context);
  //   }
  // }

  // if (context.stats.loginsCount>1) return returnUser();
  // return checkUser();
}