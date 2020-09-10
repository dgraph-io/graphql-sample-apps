import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PostCard from './postCard';
import Modal from '@material-ui/core/Modal';
import { GET_POST_BY_ID } from '../../gql/queryData.js';
import Fade from '@material-ui/core/Fade';
import { useQuery } from '@apollo/client';

// const useStyles = makeStyles((theme) => ({
//   modalSize: {
//     position: 'fixed',
//     width: '70%',
//     height: '70%',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     transform: 'translate(-50%, -50%)',
//     background: '#fff',
//   },
// }));

const CardModal = (props) => {
  const history = useHistory();
  const postId = props.match.params.postId;
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(true);
  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { postId: postId },
  });
  const location = useLocation();
  useEffect(() => {
    if (!loading && !error) {
      setPost(data['getPost']);
    }
  }, [data, loading, error]);

  const handleClose = () => {
    setOpen(false);
    // When a single post is shared (say through twitter),
    // we must redirect to home, when modal is closed
    console.log(location);
    if (location.state === undefined) history.push('/');
    else history.goBack();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {/* <div className={classes.modalSize}> */}
      <Fade in={open}>
        <div
          style={{
            outline: 'none',
            position: 'absolute',
            left: '50%',
            top: '40%',
            width: '500px',
            height: '700px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {post && (
            <PostCard
              size={'500px'}
              author={post.createdby.username}
              text={post.text}
              postID={post.id}
              time={post.timeStamp}
              likes={post.likes}
              flagCount={post.numFlags}
              flags={post.flags}
              tags={post.tags}
              img={post.img}
              isApproved={true}
              id={post.id}
              clickable={false}
              dummyLikes={post.dummyLikes}
            />
          )}
        </div>
      </Fade>
      {/* </div> */}
    </Modal>
  );
};

export default CardModal;
