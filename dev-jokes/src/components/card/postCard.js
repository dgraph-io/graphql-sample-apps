import React, { useEffect, useState } from 'react';

import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

// import styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// import components
import Loading from '../loading';
import TransitionModal from './postModal';

// import material UI
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, blue, grey, orange } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import FlagSharpIcon from '@material-ui/icons/FlagSharp';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FacebookIcon from '@material-ui/icons/Facebook';

// other imports
import DateTimeFormat from 'dateformat';
import { FacebookShareButton } from 'react-share';

// import GQL
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_POST,
  APPROVE_POST,
  LIKE_POST,
  UNLIKE_POST,
  FLAG_POST,
  UNFLAG_POST,
  EDIT_POST,
  ADD_DUMMY_LIKE,
} from '../../gql/queryData';

// import auth0
import { useAuth0 } from '@auth0/auth0-react';
import { a2gTags, g2aTags } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: '100%',
    paddingTop: '56.25%', // 16:9
    width: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: "auto",
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  share: {
    marginLeft: 'auto',
  },
  flag: {
    marginRight: '10px',
  },
  likeCount: {
    fontSize: 'large',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard({
  size,
  author,
  text,
  isApproved,
  flagCount,
  postID,
  likes,
  dummyLikes,
  time,
  tags,
  flags,
  img,
  allTags,
  updateCache,
  id,
  location,
  clickable,
}) {
  const classes = useStyles();
  const { isLoading, user } = useAuth0();

  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [numlikes, setnumlikes] = useState(likes.length + dummyLikes.length);
  const [postText, setPostText] = useState(text);
  const [postTags, setPostTags] = useState(null);
  const [open, setOpen] = useState(false);
  const [editText, setText] = useState(text);
  const [editTags, setTags] = useState(null);

  const [deletePost] = useMutation(DELETE_POST, { update: updateCache });
  const [approvePost] = useMutation(APPROVE_POST, { update: updateCache });
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [flagPost] = useMutation(FLAG_POST);
  const [unflagPost] = useMutation(UNFLAG_POST);
  const [editPost] = useMutation(EDIT_POST);
  const [dummyLike] = useMutation(ADD_DUMMY_LIKE);

  const handleLike = () => {
    if (!user) {
      console.log('Like by dummy user..');
      if (!liked) {
        dummyLike({
          variables: {
            postId: postID,
          },
        });
        setLiked(true);
        setnumlikes(numlikes + 1);
      } else {
        setLiked(false);
        setnumlikes(numlikes - 1);
      }
      return;
    }
    if (liked) {
      console.log('Unliking post...', postID);
      unlikePost({
        variables: {
          input: postID,
          likes: [{ username: user.email }],
        },
      });
      setLiked(false);
      setnumlikes(numlikes - 1);
    } else {
      console.log('Liking post...', postID);
      likePost({
        variables: {
          input: postID,
          likes: [{ username: user.email }],
        },
      });
      setLiked(true);
      setnumlikes(numlikes + 1);
    }
  };

  const handleFlag = () => {
    if (!user) {
      alert('Login to Flag the post');
      return;
    }
    if (flagged) {
      console.log('Unflagging post...', postID);
      unflagPost({
        variables: {
          input: postID,
          flags: [{ username: user.email }],
          flagCnt: flagCount - 1,
        },
      });
      setFlagged(false);
    } else {
      console.log('flagging post...', postID);
      flagPost({
        variables: {
          input: postID,
          flags: [{ username: user.email }],
          flagCnt: flagCount + 1,
        },
      });
      setFlagged(true);
    }
  };

  const handleApprove = () => {
    console.log('Approving post...', postText, author);
    var flagList = [];
    flags.forEach((element) => {
      flagList.push({ username: element['username'] });
    });
    approvePost({
      variables: {
        input: postID,
        flagArray: flagList,
      },
    });
  };

  const handleReject = () => {
    console.log('Rejecting post...', postText, author);
    const delPost = {
      id: [postID],
    };
    deletePost({
      variables: {
        input: delPost,
      },
    });
  };

  const handleEdit = async (newText, newTags) => {
    console.log('editing post...', postID, newTags, postTags);
    var removeTags = postTags.filter((x) => !newTags.includes(x));
    var addTags = newTags.filter((x) => !postTags.includes(x));

    var ptags = a2gTags(removeTags);
    var ntags = a2gTags(addTags);
    await editPost({
      variables: {
        input: postID,
        ptags: ptags,
        ntags: ntags,
        text: newText,
      },
    });
    setPostText(newText);
    setPostTags(newTags);
  };

  // set likes
  useEffect(() => {
    if (likes){
      likes.forEach((item) => {
        if (item['username'] === user.email) {
          setLiked(true);
        }
      });
    }
  }, [user,likes]);

  // set flags
  useEffect(() => {
    if (!flags) return;
    flags.forEach((item) => {
      if (item['username'] === user.email) {
        setFlagged(true);
      }
    });
  }, [user, flags]);

  // set Tags
  useEffect(() => {
    const formatted_tags = g2aTags(tags);
    setPostTags(formatted_tags);
    setTags(formatted_tags);
  }, [tags]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MetaTags>
        <meta name="og:description" content="DevJoke Application" />
        <meta property="og:title" content="DevJoke" />
        <meta property="og:image" content={img} />
        <meta
          property="og:url"
          content={'https://' + window.location.host + '/post/' + postID}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={img} />
        <meta name="twitter:title" content="DevJoke" />
        <meta name="twitter:description" content="DevJoke Application" />
      </MetaTags>
      <div className={'card'} style={{ borderRadius: '10px' }}>
        {clickable ? (
          <Link
            to={{
              pathname: `/post/${id}`,
              state: { background: location },
            }}
          >
            <img
              src={img}
              className="pic"
              alt={'preview'}
              width={'100%'}
              height={'auto'}
              style={{
                borderRadius: '10px',
              }}
            />
          </Link>
        ) : (
          <img
            src={img}
            className="pic"
            alt={'preview'}
            width={'100%'}
            height={'auto'}
            style={{
              borderRadius: '10px',
            }}
          />
        )}
        <CardActions disableSpacing style={{ padding: '0' }}>
          {isApproved ? (
            <>
              <IconButton
                aria-label="add to favorites"
                style={{
                  color: liked === true ? red[500] : grey[500],
                  paddingRight: '4px',
                }}
                onClick={handleLike}
                selected={liked}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="button"
                style={{
                  color: liked ? orange[500] : grey[500],
                  font: '15px arial',
                }}
                className={classes.likeCount}
                color="primary"
                component="p"
              >
                {numlikes}
              </Typography>
              <FacebookShareButton
                className={classes.share}
                style={{ color: blue[500] }}
                url={img}
                quote={'Do checkout this nice joke!! #DevJoke'}
                hashtag={'DevJoke'}
              >
                <FacebookIcon fontSize="small" />
              </FacebookShareButton>
            </>
          ) : (
            <>
              <IconButton aria-label="approve" onClick={handleApprove}>
                <CheckCircleIcon htmlColor="green" />
              </IconButton>
              <IconButton aria-label="reject" onClick={handleReject}>
                <CancelIcon htmlColor="red" />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <EditIcon htmlColor="blue" />
              </IconButton>
              <TransitionModal
                open={open}
                setOpen={setOpen}
                text={editText}
                setText={setText}
                tags={editTags}
                setTags={setTags}
                postText={postText}
                setPostText={setPostText}
                postTags={postTags}
                setPostTags={setPostTags}
                allTags={allTags}
                handleEdit={handleEdit}
              />
            </>
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div>
            {DateTimeFormat(time, 'mmm dS, h:MM')}
            <IconButton
              aria-label="flag"
              className={classes.flag}
              value="check"
              style={{ color: flagged ? red[500] : grey[500] }}
              onClick={handleFlag}
              selected={flagged}
            >
              <FlagSharpIcon fontSize="small" />
            </IconButton>
          </div>

          {isApproved ? (
            <></>
          ) : (
            <Typography variant="body2" color="textSecondary" backcomponent="p">
              {postText}
            </Typography>
          )}

          <TagList tags={postTags} />
        </Collapse>
      </div>
    </>
  );
}

function TagList({ tags }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Box component="div" display="inline" p={1} m={1} bgcolor="yellow">
          {tag}
        </Box>
      ))}
    </div>
  );
}
