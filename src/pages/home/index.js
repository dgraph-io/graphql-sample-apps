import React from "react";
import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Navbar from '../../components/navbar';
import navbarData from '../../components/navbar/navbarData';
import Sidebar from '../../components/sidebar';
import sidebarData from '../../components/sidebar/sidebarData';
import Content from '../../components/content';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, classes.appBarShift)}>
        <Navbar navProperties={navbarData}/>
      </AppBar>
      <Sidebar sidelists={sidebarData} />
      <Content />
    </div>
  )
}

export default Home;



