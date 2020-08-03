import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";
import JokeField from "../components/jokeField";

import {GET_USER, ADD_USER} from "../gql/queryData"
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loading from "../components/loading";

const useImperativeQuery = (query) => {
  const { refetch } = useQuery(query, {skip:true});
  const imperativelyCallQuery = (variables) => {
    return refetch(variables);
  };
  return imperativelyCallQuery;
};

export const Form = () => {
  const [addUser] = useMutation(ADD_USER);
  const getUsers = useImperativeQuery(GET_USER)

  const { user } = useAuth0()

  const createUser = async () => {
    if (user === undefined) {
      return null;
    }
    const { data: getUser } = await getUsers({
      username: user.email
    });
    if (getUser && getUser.getUser === null) {
      console.log("Creating new user...", user)
      const newUser = {
        username: user.email,
        name: user.nickname,
      };
      addUser({
        variables: {
          user: newUser
        }
      })
    }
  }

  useEffect( () => {
    createUser()
  })

  return (
    <>
      <Navbar title="Create" />
      <Content>
        <form noValidate autoComplete="off">
          <Typography variant="overline">Anything funny??</Typography>
          <JokeField type="joke" label="Joke" name="joke" rows={2}defaultValue="" required={true} />
          <Box mt={4}>
            <Button variant="contained" color="primary" size="large">
              Post
            </Button>
          </Box>
        </form>
      </Content>
    </>
  );
};

export default Form;
