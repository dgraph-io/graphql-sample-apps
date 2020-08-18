import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import FlagSharpIcon from '@material-ui/icons/FlagSharp';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateTimeFormat from 'dateformat';

import { useQuery, useMutation } from "@apollo/react-hooks";

import { DELETE_POST, APPROVE_POST, LIKE_POST, UNLIKE_POST, FLAG_POST, UNFLAG_POST} from "../gql/queryData"
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./loading"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard({author, text, isApproved, flagCount, postID, likes, time,tags, flags, updateCache}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { isLoading, user } = useAuth0()
  const [liked, setLiked] = React.useState(false);
  const [flagged,setFlagged] = React.useState(false);
  const [numlikes,setnumlikes] = React.useState(0);

  const [deletePost] = useMutation(DELETE_POST, {update:updateCache});
  const [approvePost] = useMutation(APPROVE_POST, {update:updateCache});
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [flagPost] = useMutation(FLAG_POST);
  const [unflagPost] = useMutation(UNFLAG_POST);

  var i;
  var flagList=[];
  for (i = 0; i < flags.length;i++) {
    flagList.push({username: flags[i]["username"]})
  }

  console.log(flagList)
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    if(!user) {
      alert("Login to like the post")
      return
    }
    if (liked) {
      console.log("Unliking post...", postID)
      unlikePost({
        variables: {
          input:postID,
          likes: [{ username: user.email }]
        }
      })
      setLiked(false)
      setnumlikes(numlikes-1)
    } else{
      console.log("Liking post...", postID)
      likePost({
        variables: {
          input:postID,
          likes: [{ username: user.email }]
        }
      })
      setLiked(true)
      setnumlikes(numlikes+1)
    }
  }
  
  
  const handleFlag = () => {
    if(!user) {
      alert("Login to Flag the post")
      return
    }
    if (flagged){
      console.log("Unflagging post...", postID)
      unflagPost({
        variables: {
          input: postID,
          flags: [{ username: user.email }],
          flagCnt: flagCount-1
        }
      })
      setFlagged(false)
    }else{
      console.log("flagging post...", postID)
      flagPost({
        variables: {
          input: postID,
          flags: [{ username: user.email }],
          flagCnt: flagCount+1
        }
      })
      setFlagged(true)
    }
 
 
  }

  
  const handleApprove = () => {
    console.log("Approving post...", text, author)
    
    approvePost({
      variables: {
        input: postID,
        flagArray: flagList
      }
    })
  }


  


  const handleReject = () => {
    console.log("Rejecting post...", text, author)
    const delPost = {
      id : [postID]
    };
    deletePost({
      variables: {
        input: delPost
      }
    })
  }

  useEffect(() => {
    if(!likes)
      return
    likes.forEach( (item) => {
      if(item["username"] === user.email){
        setLiked(true)
      }    
    })
    setnumlikes(likes.length)
  },[user])

  useEffect(() => {
    if(!flags)
      return
    flags.forEach( (item) => {
      if(item["username"] === user.email){
        setFlagged(true)
      }    
    })
  },[user])




  if(isLoading) {
    return <Loading />
  }

  return (
    <Card className={classes.root}>
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        
        <Typography variant="body2" color="textSecondary" backcomponent="p">
          {text}
        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>
        {
          isApproved ?
          <>
          <Typography variant="button" color="primary" component="p">
          {numlikes}
          </Typography>
          <ToggleButton aria-label="add to favorites" value="check" onChange={handleLike} selected={liked}>
            <FavoriteSharpIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton aria-label="flag" value="check" onChange={handleFlag} selected={flagged}>
          <FlagSharpIcon fontSize="small"/>
          </ToggleButton>

          </> : <>
          <IconButton aria-label="approve" onClick={handleApprove}>
            <CheckCircleIcon htmlColor="green"/>
          </IconButton>
          <IconButton aria-label="reject" onClick={handleReject}>
            <CancelIcon htmlColor="red"/>
          </IconButton>
          {/* TODO: implement handleEdit */}
          <IconButton aria-label="edit">
            <EditIcon htmlColor="blue"/>
          </IconButton>
          </>
        }
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
             {author[0].toUpperCase()}
          </Avatar>
        }
        title={author}
        subheader={DateTimeFormat(time, "mmm dS, yyyy ,h:MM TT")}
      />
      <TagList tags={tags} />
      </Collapse>
    </Card>
  );
}

function TagList({tags}) {
  return ( <div>
    {tags.map( tag => 
      <Box component="div" display="inline" p={1} m={1} bgcolor="yellow">
      {tag.name}
    </Box>
    )}
    </div>
  )
}