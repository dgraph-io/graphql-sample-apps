import React, { Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";
import Profile from './pages/profile';
import Types from "./pages/types";
import Form from "./pages/form";
import NotFound from "./pages/not-found";


import PrivateRoute from "./components/PrivateRoute"

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
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

  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar>
        <SidebarItem label="Home" icon={HomeIcon} link="/" />
        <SidebarItem label="Profile" icon={PersonIcon} link="/profile" />
        <SidebarItem label="Create" icon={EditIcon} link="/form"/>
        <SidebarItem label="Settings" icon={SettingsIcon}>
          <SidebarItem label="Start" link="/not-implemented" />
          <SidebarItem label="Here" link="/not-implemented" />
        </SidebarItem>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <PrivateRoute path="/profile" exact={true} component={Profile} />
            <PrivateRoute path="/types/:typeId" exact={true} component={Types} />
            <PrivateRoute path="/form" exact={true} component={Form} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default App;
