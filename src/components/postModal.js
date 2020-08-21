import React, { useState, useEffect } from 'react';

// import material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// import components
import TagSelector from "../components/tagSelector";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({open, setOpen, text, setText, tags, setTags, postText, postTags, allTags, handleEdit}) {
  const classes = useStyles();

  const handleClose = () => {
    setTags(postTags);
    setText(postText);
    setOpen(false);
  };

  const onUpdateHandler = async () => {
    await handleEdit(text, tags)
    setOpen(false)
  }

  const handleChange = (event) => {
    setTags(event.target.value);
    console.log("handle", event.target.value, tags)
  };

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
              <TextField label="Joke" type="joke" name="Joke" margin="normal"
                value={text} variant="outlined" fullWidth multiline rows={5}
                required={true} onChange={e => setText(e.target.value)}
              />
              <TagSelector names={allTags} tags={tags} handleChange={handleChange}/>
              <br />
              <Button variant="contained" color="primary" size="small" onClick={onUpdateHandler}>
                Update
              </Button>
              <Button variant="contained" color="secondary" size="small" onClick={handleClose}>
                Cancel
              </Button>
          </div>
        </Fade>
      </Modal>
  );
}
