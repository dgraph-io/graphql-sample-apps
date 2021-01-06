import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from './Auth';
import app from "./base.js";

import './NavBar.css';

const NavBar = () => {
  const { loading, currentUser } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="navbar">
      <ul>
        {currentUser && (
          <span>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li style={{ float: "right"}}>
              <Link onClick={() => app.auth().signOut()}>
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