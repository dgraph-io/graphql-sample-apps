import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Content from '../components/content';
import { Navbar, NavbarItem } from '../components/navbar';

const Profile = () => {

  const { user } = useAuth0();

  return <>
    <Navbar title="Profile" color="primary" />
    <Content>
        <div className="profile">
          <img className="profile-img" src={user.picture} alt="Profile" />
          <p>Name: <strong>{user.nickname}</strong></p>
          <p>Email: <strong>{user.email}</strong></p>
        </div>
    </Content>
  </>
}

export default Profile;
