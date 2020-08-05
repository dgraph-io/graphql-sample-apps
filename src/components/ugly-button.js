import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: "4px 12px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
}))

export default function UglyButton(props) {
  const { root } = useStyles();
  return <Button color="primary" size="large" className={root} {...props} />
}
