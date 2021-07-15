const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserClaim = functions.https.onCall((data, context) => {
	return admin.auth().getUserByEmail(data.email).then(user=>{
		return admin.auth().setCustomUserClaims(user.uid, {
			"https://dgraph.io/jwt/claims":{
				"USER": data.email,
				"isAuthenticated" : "true"
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
