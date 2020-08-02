import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Picker } from "emoji-mart";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";
import JokeField from "../components/jokeField";

export const Form = () => {
  return (
    <>
      <Navbar title="Create" />
      <Content>
        <form noValidate autoComplete="off">
          <Typography variant="overline">Anything funny??</Typography>
          <JokeField type="joke" label="Joke" name="joke" rows={2}defaultValue="" required={true} />
          <Box mt={4}>
            <Button variant="contained" color="primary" size="large">
              Action
            </Button>
          </Box>
        </form>
      </Content>
    </>
  );
};

export default Form;
