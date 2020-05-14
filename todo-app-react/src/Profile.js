import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import './Profile.css';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
      <div className="profile">
        <img className="profile-img" src={user.picture} alt="Profile" />
        <p>Name: <strong>{user.nickname}</strong></p>
        <p>Email: <strong>{user.email}</strong></p>
      </div>
  );
};

export default Profile;
