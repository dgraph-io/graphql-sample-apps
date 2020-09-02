import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Content from '../components/content';
import { Navbar } from '../components/navbar';
import LogoutButton from "../components/auth/logoutButton";

const Profile = () => {

  const { user } = useAuth0();
  console.log("Profile", user)

  return <>
    <Navbar title="Profile" color="primary" />
    <Content>
        <div className="profile">
          <img className="profile-img" src={user.picture} alt="Profile" />
          <p>Name: <strong>{user.name}</strong></p>
          <p>Email: <strong>{user.email}</strong></p>
        </div>
        <LogoutButton />
    </Content>
  </>
}

export default Profile;
