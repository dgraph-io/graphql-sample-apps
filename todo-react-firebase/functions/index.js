const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
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
