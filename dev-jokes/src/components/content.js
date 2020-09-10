import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Logo from "../assets/images/slash.png"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Content = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={clsx(classes.content, classes.contentShift)}>
      <div className={classes.drawerHeader} />
      {children}
      <img src={Logo} style={{position: "fixed", bottom:"0", right:"0", borderTopLeftRadius:"10px", width:"15%", minWidth:"120px"}} alt="slash-graphql"/>
    </main>
  );
};
export default Content;
