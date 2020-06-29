import React from "react"
import { Container, Image, Menu, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

export function AppHeader() {
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
      </Container>
    </Menu>
  )
}
