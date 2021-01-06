import React, { useContext } from "react";
import {AuthContext} from "./Auth.js";
import './Profile.css';

const Profile = () => {
  const {  currentUser } =  useContext(AuthContext);

  if (!currentUser) {
    return <div> {currentUser.email} </div>;
  }

  return (
      <div className="profile">
        <img className="profile-img" src={currentUser.picture} alt="Profile" />
        <p>Name: <strong>{currentUser.nickname}</strong></p>
        <p>Email: <strong>{currentUser.email}</strong></p>
      </div>
  );
};

export default Profile;