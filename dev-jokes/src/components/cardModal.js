import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import PostCard from "../components/postCard";
import Modal from '@material-ui/core/Modal';
import {GET_POST_BY_ID } from "../gql/queryData.js";
import Fade from '@material-ui/core/Fade';
import { useQuery } from '@apollo/client';

const CardModal = (props) => {
    const history = useHistory();
    const postId = props.match.params.postId
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(true);
    const {data, loading, error} = useQuery(GET_POST_BY_ID,
      {
        variables: {postId: postId}
      });
    
    useEffect( () => {
      console.log(data["getPost"])
      setPost(data["getPost"])
    }, [data, loading, error])

    const handleClose = () => {
      setOpen(false);
      history.goBack();
    };

    return (
        <Modal open={open} onClose={handleClose}>
          <Fade in={open}>
            <div 
              style={{
                  position: 'absolute', 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
              }}
              >
              {post && 
                  <PostCard size={"500px"} author={post.createdby.username} text={post.text} postID={post.id} time={post.timeStamp} likes={post.likes} flagCount={post.numFlags} flags={post.flags} tags={post.tags} img={post.img} isApproved={true} id={post.id} />
              }
            </div>
         </Fade>
        </Modal>
    )
}

export default CardModal;