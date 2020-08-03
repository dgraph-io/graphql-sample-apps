import React, { Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";
import Profile from './pages/profile';
import Types from "./pages/types";
import Create from "./pages/create";
import Approve from "./pages/approve"
import NotFound from "./pages/not-found";

import PrivateRoute from "./components/privateRoute"

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CssBaseline from "@material-ui/core/CssBaseline";

import './App.css';

import {Sidebar, SidebarItem} from './components/sidebar';
import Loading from "./components/loading"

import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

function App() {
  const classes = useStyles();

  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar>
        <SidebarItem label="Home" icon={HomeIcon} link="/" />
        <SidebarItem label="Profile" icon={PersonIcon} link="/profile" />
        <SidebarItem label="Create" icon={EditIcon} link="/create"/>
        {isAuthenticated ?
          <SidebarItem label="Approve" icon={CheckCircleIcon} link="/approve" />:
          <></>
        }
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <PrivateRoute path="/profile" exact={true} component={Profile} />
            <PrivateRoute path="/types/:typeId" exact={true} component={Types} />
            <PrivateRoute path="/create" exact={true} component={Create} />
            <PrivateRoute path="/approve" exact={true} component={Approve} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default App;
