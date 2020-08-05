import React, { useRef, useState, useEffect } from "react";
import { Typography, FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {GET_TAGS ,GET_USER, ADD_POST} from "../gql/queryData"
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useImperativeQuery from "../utils/imperativeQuery"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const Create = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [postText, setPostText] = useState("");
  const [postTags, setPostTags] = useState("");


  const printMessage = () => {
    setPostText("")
    setTags([])
    alert("Joke submitted succesfully!!")
  }

  const handleChange = (event) => {
    setTags(event.target.value);
  };

  const [addPost] = useMutation(ADD_POST, {onCompleted: printMessage});
  const getUsers = useImperativeQuery(GET_USER)
  const getTags = useImperativeQuery(GET_TAGS)

  const { user } = useAuth0()

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
        numLikes: 0,
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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={tags}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
