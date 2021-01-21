# Todo React App with Firebase Auth

This Repo contains a Todo app which uses Firebase for Authentication.
For more context about setting up Todo App with Dgraph GraphQL, please refer to [here](https://github.com/dgraph-io/graphql-sample-apps/blob/master/todo-app-react/README.md).

# Firebase Auth
Authentication with Firebase is done through the JWKURL, where the Json Web Key sets are hosted by the firebase. Since firebase shares the JWKs among multiple tenants, you must provide your firebase `project-Id` to the `Audience` field.
So the `Dgraph.Authorization` header will look like this:
```
{"Header":"your-header", "Namespace":"namespace-of-custom-claims","JWKURL": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com", "Audience":[your-projectID]}
```
You don't need to set the `VerificationKey` and `Algo` in the `Authorization` header. Doing so will result in error.

# Setting up Firebase Auth with Dgraph GraphQL'

## Step 1 - Create Firebase App
Go to the [Firebase Website](https://firebase.google.com/) and create a new project. In the Authentication section, enable `Email/Password` signin.
In this app, we have used signin by `Email/Password`. 
Configure `Authorized domain` below according to where you want to deploy your app. By defaut localhost is added to the list.
We are done here. We will now be able to use the `jwt` tokens provided by firebase to login into your app. But for handling `authorization` we need to add custom claims to our token. 

## Step 2 - Add Custom Claims
In order to add custom claims to the `jwt` you need to host a `cloud function` which will insert claims to the `jwt` on user creation.
This is our cloud function which inserts `USER`: `email` claim under the Namespace `https://dgraph.io/jwt/claims`.
```js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserClaim = functions.https.onCall((data, context) => {
	return admin.auth().getUserByEmail(data.email).then(user=>{
		return admin.auth().setCustomUserClaims(user.uid, {
			"https://dgraph.io/jwt/claims":{
				"USER": data.email
			}
		});
	}).then(() => {
		return {
			message: `Success!`
		}
	}).catch(err => {
		 return err
	})
})
```
### Using the firebase CLI
- Install the firebase CLI tool `npm install -g firebase-tools.
- Login into firebase from the CLI `firebase login`.
- Run `firebase init functions` then select an existing project (that you created above).
- Select language as `JavaScript` for this example.
- Replace `index.js` with the snippet above.
- Let's deploy the function `firebase deploy --only functions`

Please refer the [deployment guide](https://firebase.google.com/docs/functions/get-started) for more info.

## Step 3 - Using it inside our React App.
Create a web app from your firebase project settings page. After creatung that copy the config from there.
Setup your console configuration and your `Dgraph GraphQL` endpoint in the  [config.json](https://github.com/dgraph-io/graphql-sample-apps/blob/master/todo-react-firebase/src/config.json). It looks like this:
```json
{
    "apiKey": "your-firebase-apiKey",
    "authDomain": "your-firebase-authDomain",
    "projectId": "your-firebase-projectId",
    "storageBucket": "your-firebase-storageBucket",
    "messagingSenderId": "your-firebase-messagingSenderId",
    "appId": "your-firebase-appId",
    "graphqlUrl": "your-graphql-endpoint"
}
```

Auth.js:
```js
import React, { useEffect, useState } from "react";
import app from "./base.js";
import firebase from "firebase/app";
import "firebase/functions";

import App from "./App";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");
  const addUserClaim = firebase.functions().httpsCallable('addUserClaim');

  useEffect(() => {
    app.auth().onAuthStateChanged( async user => {
      setLoading(false)
      setCurrentUser(user)
      if (user) {
        addUserClaim({email: user.email})
        const token = await user.getIdToken(); 
        setIdToken(token);
      }
    });
  }, []);

  if(loading){
    return <>Loading...</>
  }
  return (
    <AuthContext.Provider
      value={{
        loading,
        currentUser,
      }}
    >
      {children}
      <App idToken = {idToken}/>
    </AuthContext.Provider>
  );
};
```
This is the main component related to the Auth. It is simple to understand that whenever there will be `state` change, `currentUser` will be set to the new `user` and Context will return `App` with the new `idToken`. `App` will initialize new apollo client which will send this `idToken` in header along with every GraphQL request.

Let's start the app -
`npm start`