import React, { Suspense } from 'react';
import { Router, Route } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";

import { makeStyles } from "@material-ui/core/styles";

import './App.css';

import CssBaseline from "@material-ui/core/CssBaseline";

import Sidebar from './components/sidebar';
import sidebarData from './components/sidebar/sidebarData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar sidelists={sidebarData} />
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/types" exact={true} component={Home} />
        </Suspense>
      </Router>
    </div>
  )
}

export default App;
