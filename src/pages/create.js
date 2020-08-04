import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Typography, FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";
import JokeField from "../components/jokeField";
import TextField from "@material-ui/core/TextField";

import {GET_USER, ADD_USER, ADD_POST} from "../gql/queryData"
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useImperativeQuery from "../utils/imperativeQuery"

export const Create = () => {
  const [postText, setPostText] = useState("");

  const printMessage = () => {
    setPostText("")
    alert("Joke submitted succesfully!!")
  }

  const [addUser] = useMutation(ADD_USER);
  const [addPost] = useMutation(ADD_POST, {onCompleted: printMessage});
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
        isMod: false,
      };
      addUser({
        variables: {
          user: newUser
        }
      })
    }
  }

  const handleSubmit = async (evt) => {
      evt.preventDefault();
      // user must exist
      const { data } = await getUsers({
        username: user.email
      });

      console.log("Submitting post...", postText, user.email, data.getUser.isMod)
      const newPost = [{
        text: postText,
        createdby: {
          username: user.email,
        },
        timeStamp: new Date().toISOString(),
        isApproved: data.getUser.isMod ? true : false
      }];
      addPost({
        variables: {
          post: newPost
        }
      })
  }

  useEffect( () => {
    createUser()
  }, [user])

  return (
    <>
      <Navbar title="Create" />
      <Content>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="overline">Anything funny??</Typography>
          {/* <JokeField type="joke" label="Joke" name="joke" rows={5} defaultValue={name} required={true}/> */}
          <TextField
            label="Joke"
            type="joke"
            name="Joke"
            margin="normal"
            value={postText}
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            required={true}
            onChange={e => setPostText(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Post
          </Button>
        </form>
      </Content>
    </>
  );
};

export default Create;
