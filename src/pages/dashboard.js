import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Content from '../components/content';
import { Navbar } from '../components/navbar';

const Dashboard = () => {

  const { user } = useAuth0();
  console.log("Profile", user)

  return <>
    <Navbar title="Dashboard" color="primary" />
    <Content>
        <div>
          Login to see jokes
        </div>
    </Content>
  </>
}

export default Dashboard;
