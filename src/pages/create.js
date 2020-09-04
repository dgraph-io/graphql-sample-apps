import React, { useRef, useState, useEffect } from "react";

//import material UI
import { FormControl, Select, Button, TextField, InputLabel, MenuItem, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// import components
import { Navbar } from "../components/navbar";
import Content from "../components/content";
import TagSelector from "../components/tagSelector";

// import Auth0
import { useAuth0 } from "@auth0/auth0-react";

// import GQL
import { useMutation, useQuery } from "@apollo/react-hooks";
import {GET_TAGS ,GET_USER, ADD_POST} from "../gql/queryData"
import useImperativeQuery from "../utils/imperativeQuery"

// imports for image uploading
import axios from 'axios';
import {v4 as uuid} from 'uuid'; 
import LoadingOverlay from 'react-loading-overlay';
import CanvasImage from "../components/create/canvasImage";
import * as cimg from "../assets/images/background.jpg"
import config from "../config"

import {g2aTags, a2gTags, dataURItoBlob} from "../utils/utils"

const AWS_ENDPOINT = process.env.AWS_ENDPOINT || config['AWS_ENDPOINT']

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export const Create = () => {
  const classes = useStyles();

  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [type, setType] = useState('text');
  const [postText, setPostText] = useState("");
  const [isMod, setIsMod] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);

  const refCanvas = useRef(null);

  var uploadInput = null;
  const printMessage = () => {
    setPostText("")
    setTags([])
    setIsActive(false)
    isMod ? alert("Joke posted!!") :alert("Joke submitted for review!!")
  }

  const getUsers = useImperativeQuery(GET_USER)
  const {data: tagsData, loading: tloading, error: terror} = useQuery(GET_TAGS)
  const [addPost] = useMutation(ADD_POST, {onCompleted: printMessage});

  const { user } = useAuth0()

  const addToDatabase = (data, imgUrl) => {
    setIsMod(data.getUser.isMod)
    // add post to db
    const newPost = [{
      text: postText,
      createdby: {
        username: user.email,
      },
      tags: a2gTags(tags),
      timeStamp: new Date().toISOString(),
      isApproved: data.getUser.isMod ? true : false,
      numFlags: 0,
      img: imgUrl
    }];

    console.log("Adding post:", newPost)
    addPost({
      variables: {
        post: newPost
      }
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsActive(true);
    // Set image properties
    var dataUrl, file, fileName = uuid(), fileType;
    if(type === 'text'){
      dataUrl = refCanvas.current.toDataURL('image/png')
      file = dataURItoBlob(dataUrl);
      fileType = "png"
    } else if (type === 'meme'){
      if(uploadInput.files.length === 0){
        alert('Forgot to upload the meme?')
        return
      }
      file = uploadInput.files[0];
      fileType = uploadInput.files[0].name.split('.')[1];
    }

    // user must exist
    const { data } = await getUsers({
      username: user.email
    });

    // upload the image
    console.log("Preparing the upload");
    axios.post(AWS_ENDPOINT, {
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      console.log("Recieved a signed request " + signedRequest);

    // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3: ", result)
        addToDatabase(data, url)
      })
      .catch(error => {
        setIsActive(false)
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      setIsActive(false)
      alert("ERROR: " + error);
    })
  }

  const previewImage = (e) => {
    e.preventDefault();
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setImagePreviewURL(reader.result)
    }
    reader.readAsDataURL(file)
  }

  useEffect (() => {
    if(!tloading && !terror){
      setNames(g2aTags(tagsData.queryTag));
    }
  }, [tagsData, tloading, terror])

  return (
    <>
      <Navbar title="Create" />
      <LoadingOverlay
        active={isActive}
        text='Posting the joke...'
        >
        <Content>
          <div style={{"display":"flex", "justify-content":"space-between"}}>
            <FormControl className={classes.formControl}>
              <InputLabel>Joke Type</InputLabel>
              <Select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <MenuItem value={'text'}>Text Joke</MenuItem>
                <MenuItem value={'meme'}>Meme</MenuItem>
              </Select>
              <FormHelperText>What kind of joke you have?</FormHelperText>
            </FormControl>
            <TagSelector names={names} tags={tags} 
              handleChange={(e) => setTags(e.target.value)}/>
          </div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField type="joke" value={postText} required={true}
              label={type === 'text' ? "Joke": "Description"}
              name={type === 'text' ? "Joke": "Description"}
              onChange={e => setPostText(e.target.value)}
              margin="normal" variant="outlined" 
              fullWidth multiline rows={5}
              inputProps={{ maxLength: 250}}/>
            {
              type === 'text' ?
              <CanvasImage image={cimg} text={postText} ref={refCanvas}/> : <>
              {imagePreviewURL === null ? <></> :
                <img src={imagePreviewURL} height={200} width={300} alt={"preview"}/> }
              <br/>
              <input ref={(ref) => { uploadInput = ref; }}
                type="file" accept="image/*"
                onChange={previewImage}
              />
              </>
            }
            <br/>
            <Button type="submit" variant="contained" color="primary" size="large">
              Post
            </Button>
          </form>
        </Content>
      </LoadingOverlay>
    </>
  );
};

export default Create;
