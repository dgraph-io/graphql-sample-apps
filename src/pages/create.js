import React, { useRef, useState, useEffect } from "react";

//import material UI
import { Typography, FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// import components
import { Navbar, NavbarItem } from "../components/navbar";
import Content from "../components/content";
import TagSelector from "../components/tagSelector";

// import Auth0
import { useAuth0 } from "@auth0/auth0-react";

// import GQL
import { useQuery, useMutation } from "@apollo/react-hooks";
import {GET_TAGS ,GET_USER, ADD_POST} from "../gql/queryData"
import useImperativeQuery from "../utils/imperativeQuery"

// imports for image uploading
import axios from 'axios';
import {v4 as uuid} from 'uuid'; 
import CanvasImage from "../components/canvasImage";
import * as cimg from "../assets/images/background.jpg"

export const Create = () => {
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [postText, setPostText] = useState("");
  const refCanvas = useRef(null)
  var uploadInput = null;

  const printMessage = () => {
    setPostText("")
    setTags([])
    alert("Joke submitted for review!!")
  }

  const [addPost] = useMutation(ADD_POST, {onCompleted: printMessage});
  const getUsers = useImperativeQuery(GET_USER)
  const getTags = useImperativeQuery(GET_TAGS)

  const { user } = useAuth0()

  const handleChange = (event) => {
    setTags(event.target.value);
  };

  const addToDatabase = (data, imgUrl) => {
    // parse the tags into required format
    var formatted_tags = []
    tags.forEach(element => {
      formatted_tags.push({"name": element})
    });

    // add post to db
    const newPost = [{
      text: postText,
      createdby: {
        username: user.email,
      },
      tags: formatted_tags,
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

  const dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

  const handleSubmit = async (evt) => {
      evt.preventDefault();

      // user must exist
      const { data } = await getUsers({
        username: user.email
      });

      // Currently we are overriding the file upload to override the canvas image
      // TODO: Have a better logic over here, maybe provide an option to user

      var dataUrl = refCanvas.current.toDataURL('image/png')
      var file = dataURItoBlob(dataUrl);
      var fileName = uuid()
      var fileType = "png"

      if(uploadInput.files.length != 0){
        file = uploadInput.files[0];
        let fileParts = uploadInput.files[0].name.split('.');
        fileName = fileParts[0];
        fileType = fileParts[1];
      }

      // upload the image
      console.log("Preparing the upload");
      axios.post("http://localhost:4000/sign_s3",{
        fileName : fileName,
        fileType : fileType
      })
      .then(response => {
        var returnData = response.data.data.returnData;
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
          alert("ERROR " + JSON.stringify(error));
        })
      })
      .catch(error => {
        alert(JSON.stringify(error));
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
  }, [])

  return (
    <>
      <Navbar title="Create" />
      <Content>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="overline">Anything funny??</Typography>
          <br/>
          <TextField label="Joke" type="joke" name="Joke" margin="normal"
            value={postText} variant="outlined" halfWidth multiline rows={5}
            required={true} onChange={e => setPostText(e.target.value)}
          />
          <CanvasImage image={cimg} text={postText} ref={refCanvas}/>
          <br/>
          <TagSelector names={names} tags={tags} handleChange={handleChange}/>
          <br />
          <input ref={(ref) => { uploadInput = ref; }} type="file"/>
          <Button type="submit" variant="contained" color="primary" size="large">
            Post
          </Button>
        </form>
      </Content>
    </>
  );
};

export default Create;
