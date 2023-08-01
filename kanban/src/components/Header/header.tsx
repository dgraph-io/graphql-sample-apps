import React from "react";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useProjectNamesQuery } from "./types/operations";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function useProjectMenuList() {
  const { loading, error, data } = useProjectNamesQuery();

  if (loading || error) {
    return <Dropdown.Menu />;
  }

  return (
    <Dropdown.Menu>
      {data?.queryProject?.map((proj) => (
        <Dropdown.Item
          key={proj?.projID}
          as={Link}
          to={"/project/" + proj?.projID}
        >
          {proj?.name}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
}

function LogoutButton() {
  // const { logout, user } = useAuth0()
  const auth0 = useAuth0();
  const logout = auth0.logout;
  return (
    <Dropdown.Menu>
      <Dropdown.Item
        onClick={() => logout({ returnTo: window.location.origin })}
        as="a"
      >
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  );
}

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Menu.Item onClick={() => loginWithRedirect()} position="right" as="a">
      Login
    </Menu.Item>
  );
}

function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Menu fixed="top" borderless={true}>
      <Container>
        <Menu.Item as="a">
          <Image
            size="tiny"
            src="/diggy.png"
            style={{ marginRight: "1.5em" }}
          />
        </Menu.Item>

        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>

        <Dropdown item simple text="Projects">
          {useProjectMenuList()}
        </Dropdown>

        <Menu.Menu position="right">
          {!isLoading && !isAuthenticated && <LoginButton />}
          {!isLoading && isAuthenticated && (
            <Dropdown
              item
              simple
              text={user.name === user.email ? user.nickname : user.name}
            >
              <LogoutButton />
            </Dropdown>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Header;
