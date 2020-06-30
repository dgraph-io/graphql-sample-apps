import React from "react"
import { Container, Image, Menu, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

export function AppHeader() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  const userItem = isAuthenticated ? (
    <Menu.Item onClick={() => logout()}>
      <Icon name="user circle" />
      Logout
    </Menu.Item>
  ) : (
    <Menu.Item onClick={loginWithRedirect}>
      <Icon name="user circle" />
      Login
    </Menu.Item>
  )

  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="tiny"
            src="/diggy-graphql.png"
            style={{ marginRight: "1.5em" }}
          />
          Dgraph Discuss
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          <Icon name="home" />
          Home
        </Menu.Item>
        {userItem}
      </Container>
    </Menu>
  )
}
