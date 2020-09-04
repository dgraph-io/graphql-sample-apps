import React from "react";
import { Image } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function AppHeader() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const userItem = isAuthenticated ? (
    <span>
      <Image src={user.picture} avatar />
      <button
        className="ui button"
        style={{
          background: "linear-gradient(135deg, #ff1800, #ff009b)",
          color: "white",
        }}
        onClick={() => logout()}
      >
        Logout
      </button>
    </span>
  ) : (
    <button
      className="ui button"
      style={{
        background: "linear-gradient(135deg, #ff1800, #ff009b)",
        color: "white",
      }}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );

  return (
    <>
      <div
        className="ui clearing segment"
        style={{
          border: "0px",
          borderRadius: "0px",
          boxShadow: "inset 0 0 0 10px #eaeaea",
          padding: "1.5em 1.5em",
          paddingTop: "0px",
        }}
      >
        <h3
          className="ui right floated header"
          style={{ paddingRight: "7rem", transform: "translate(-10px, 50px)" }}
        >
          {/* <button className="ui pink button">Sign Up</button> */}
          {userItem}
        </h3>
        <h3
          className="ui left floated header"
          style={{ paddingLeft: "7rem", transform: "translate(-23px, 40px)" }}
        >
          <Link to="/">
            <div style={{ display: "flex" }}>
              <span>
                <Image
                  size="tiny"
                  src="/diggy.png"
                  style={{ marginRight: "1.5em" }}
                />{" "}
              </span>
              <div>
                <p
                  style={{
                    background: "-webkit-linear-gradient(#ff1800, #ff009b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0px",
                    fontSize: "x-large",
                  }}
                >
                  Dgraph
                </p>
                <p style={{ fontSize: "smaller" }}>DISCUSS</p>
              </div>
            </div>
          </Link>
        </h3>
      </div>
    </>
  );
}
