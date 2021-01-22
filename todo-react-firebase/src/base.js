import firebase from "firebase/app";
import "firebase/auth";
import config from "./config.json";


const app  = firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});


export default app;
