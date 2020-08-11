import React, { useRef, useState, useEffect } from "react";
import { Typography, FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";

import TextField from "@material-ui/core/TextField";

import {GET_TAGS ,GET_USER, ADD_POST} from "../gql/queryData"
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useImperativeQuery from "../utils/imperativeQuery"
import TagSelector from "../components/tagSelector";

export const Create = () => {
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [postText, setPostText] = useState("");

  const printMessage = () => {
    setPostText("")
    setTags([])
    alert("Joke submitted succesfully!!")
  }

  const [addPost] = useMutation(ADD_POST, {onCompleted: printMessage});
  const getUsers = useImperativeQuery(GET_USER)
  const getTags = useImperativeQuery(GET_TAGS)

  const { user } = useAuth0()

  const handleChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = async (evt) => {
      evt.preventDefault();
      // user must exist
      const { data } = await getUsers({
        username: user.email
      });

      console.log("Submitting post...", postText, user.email, data.getUser.isMod)
      var formatted_tags = []
      tags.forEach(element => {
        formatted_tags.push({"name": element})
      });
      const newPost = [{
        text: postText,
        createdby: {
          username: user.email,
        },
        tags: formatted_tags,
        timeStamp: new Date().toISOString(),
        isApproved: data.getUser.isMod ? true : false,
      }];
      addPost({
        variables: {
          post: newPost
        }
      })
  }

  const fetchTags = async () => {
    const {data} = await getTags()
    var tmp = []
    data.queryTag.forEach(element => {
      tmp.push(element["name"])
    });
    setNames(tmp)
    console.log("tags fetched...", data.queryTag, "setNames:", names)
  }

  useEffect( () => {
    fetchTags()
  }, [user])

  return (
    <>
      <Navbar title="Create" />
      <Content>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="overline">Anything funny??</Typography>
          <TextField label="Joke" type="joke" name="Joke" margin="normal"
            value={postText} variant="outlined" fullWidth multiline rows={5}
            required={true} onChange={e => setPostText(e.target.value)}
          />
          <TagSelector names={names} tags={tags} handleChange={handleChange}/>
          <br />
          <Button type="submit" variant="contained" color="primary" size="large">
            Post
          </Button>
        </form>
      </Content>
    </>
  );
};

export default Create;
