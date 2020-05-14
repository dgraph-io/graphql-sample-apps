import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import { Link } from "react-router-dom";

import './NavBar.css';

const NavBar = () => {
  const { loading, isAuthenticated, logout } = useAuth0();

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="navbar">
      <ul>
        {isAuthenticated && (
          <span>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li style={{ float: "right"}}>
              <Link onClick={() => logout()}>
                Log out
              </Link>
            </li>
          </span>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
