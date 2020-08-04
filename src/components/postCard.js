import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DELETE_POST,APPROVE_POST,UPDATE_LIKES } from "../gql/queryData"


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

export default function PostCard({author, text, isApproved, postID, numLikes,time}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked,setLiked] = React.useState(false);
  const [deletePost] = useMutation(DELETE_POST);
  const [approvePost] = useMutation(APPROVE_POST);
  const [likePost] = useMutation(UPDATE_LIKES);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  const handleLike = () => {

    //console.log("Approving post...", text, author)
    console.log("liked",{liked})
    if ({liked}==false) {
      likePost({
        variables: {
          input:postID,
          likes: numLikes+1
        }
      })
    } else{
      likePost({
        variables: {
          input:postID,
          likes: numLikes-1
        }
      })
    }
 
    setLiked(!{liked})
   
  }
  
  
  const handleApprove = () => {
    console.log("Approving post...", text, author)
    
    approvePost({
      variables: {
        input:postID
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

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={author}
        subheader={time}
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          isApproved ?
          <>
          <ToggleButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon />
          </ToggleButton>
          </> : <>
          <IconButton aria-label="approve" onClick={handleApprove}>
            <CheckCircleIcon htmlColor="green"/>
          </IconButton>
          <IconButton aria-label="reject" onClick={handleReject}>
            <CancelIcon htmlColor="red"/>
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
      {/* Can be used for long jokes */}
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}