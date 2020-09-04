import React from "react";
import { Image } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

export function AppHeader() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

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
      className="ui pink basic button"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );

  return (
    // <Menu fixed="top">
    //   <Container>
    //     <Menu.Item as="a" header>
    //       <Image
    //         size="tiny"
    //         src="/diggy-graphql.png"
    //         style={{ marginRight: "1.5em" }}
    //       />
    //       Dgraph Discuss
    //     </Menu.Item>
    //     <Menu.Item as={Link} to="/">
    //       <Icon name="home" />
    //       Home
    //     </Menu.Item>
    //     {userItem}
    //   </Container>
    // </Menu>
    <>
      <div
        className="ui clearing segment"
        style={{
          border: "0px",
          borderRadius: "0px",
          boxShadow: "inset 0 0 0 10px #eaeaea",
          padding: "1.5em 1.5em",
        }}
      >
        {/* <Image
            size="tiny"
            src="/diggy-graphql.png"
            style={{ marginRight: "1.5em" }}
          /> */}
        <h3
          className="ui right floated header"
          style={{ paddingRight: "7rem" }}
        >
          {/* <button className="ui pink button">Sign Up</button> */}
          {userItem}
        </h3>
        <h3 className="ui left floated header" style={{ paddingLeft: "7rem" }}>
          <p
            style={{
              color: "deeppink",
              marginBottom: "0px",
              fontSize: "x-large",
            }}
          >
            Dgraph
          </p>
          <p style={{ fontSize: "smaller" }}>DISCUSS</p>
        </h3>
      </div>
    </>
  );
}
