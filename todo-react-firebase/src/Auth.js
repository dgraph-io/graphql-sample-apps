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
  const addAdminRole = firebase.functions().httpsCallable('addAdminRole');


  useEffect(() => {
    app.auth().onAuthStateChanged( async user => {
      setLoading(false)
      setCurrentUser(user)
      if (user) {
        addAdminRole({email: user.email})
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
