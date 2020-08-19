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

export const Create = () => {
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [postText, setPostText] = useState("");
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
    console.log(newPost)
    addPost({
      variables: {
        post: newPost
      }
    })
  }

  const handleSubmit = async (evt) => {
      evt.preventDefault();

      // user must exist
      const { data } = await getUsers({
        username: user.email
      });

      console.log("Submitting post...", postText, user.email, data.getUser.isMod)

      // upload the image
      if(uploadInput.files.length != 0){
        let file = uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
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
            console.log("Response from s3")
            addToDatabase(data, url)
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })
        })
        .catch(error => {
          alert(JSON.stringify(error));
        })
      } else {
        addToDatabase(data, "")
      }
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
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="overline">Anything funny??</Typography>
          <TextField label="Joke" type="joke" name="Joke" margin="normal"
            value={postText} variant="outlined" fullWidth multiline rows={5}
            required={true} onChange={e => setPostText(e.target.value)}
          />
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
