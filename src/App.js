import React, { Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Profile from './pages/profile';
import Types from "./pages/types";
import Create from "./pages/create";
import Approve from "./pages/approve"
import NotFound from "./pages/not-found";

import PrivateRoute from "./components/privateRoute"
import {Typography} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CssBaseline from "@material-ui/core/CssBaseline";

import './App.css';

import {Sidebar, SidebarItem} from './components/sidebar';
import Loading from "./components/loading"

import { useAuth0 } from "@auth0/auth0-react";
import {GET_USER} from "./gql/queryData";
import { useQuery, useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

function App() {
  const classes = useStyles();
  const { isLoading, isAuthenticated, user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar>
        <></>
        <>
      { isAuthenticated ? <>
        <SidebarItem label="Home" icon={HomeIcon} link="/home" />
        <SidebarItem label="Profile" icon={PersonIcon} link="/profile" />
        <SidebarItem label="Create" icon={EditIcon} link="/create"/>
        <SideItem label="Approve" icon={CheckCircleIcon} link="/approve" user={user}/>
        </> :
        <SidebarItem label="DashBoard" icon={DashboardIcon} link="/"/>
      }
      </>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <PrivateRoute path="/home" exact={true} component={Home} />
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

function SideItem({user, label, icon, link}) {
  const {loading, error, data} = useQuery(GET_USER, {variables: {username: user.email}})

  if(loading) {
    return <Loading />
  }
  if(error) {
    return <Typography>
      Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?
    </Typography>
  }
  console.log("App:", data)
  return data.getUser && data.getUser.isMod ? <SidebarItem label="Approve" icon={CheckCircleIcon} link="/approve" user={user}/>:
  <></>
}

export default App;
