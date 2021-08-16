import React from "react";
import { Box, Text } from "grommet";
import { Instagram } from "grommet-icons";
import AuthButton from "./AuthButtons";

const NavBar = () => (
  <Box
    as="header"
    flex={false}
    direction="row"
    background="white"
    elevation="medium"
    align="center"
    justify="center"
    responsive={true}
  >
    <Instagram />
    <Text size="large" color="brand" style={{ marginLeft: 10 }}>
      InstaClone
    </Text>

    <Box
      margin={{ left: "medium" }}
      round="xsmall"
      background={{ color: "white", opacity: "weak" }}
      direction="row"
      align="center"
      pad={{ horizontal: "small" }}
    >
      <AuthButton />
    </Box>
  </Box>
);

export default NavBar;
