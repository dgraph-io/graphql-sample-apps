import React, { Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";
import Profile from './pages/profile';
import Types from "./pages/types";
import Create from "./pages/create";
import Approve from "./pages/approve"
import NotFound from "./pages/not-found";
import Flagged from "./pages/flagged"
import PrivateRoute from "./components/privateRoute"
import {Typography} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FlagIcon from '@material-ui/icons/Flag';
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

  console.log(user)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar>
        <></>
        <>
        <SidebarItem label="Home" icon={HomeIcon} link="/" />
      { isAuthenticated ? <>
        <SidebarItem label="Profile" icon={PersonIcon} link="/profile" />
        <SidebarItem label="Create" icon={EditIcon} link="/create"/>
        <SideItem label="Approve" icon={CheckCircleIcon} link="/approve" user={user}/>
        <SideItem label="Flagged" icon={FlagIcon} link="/flagged" user={user}/>
        
        </> : null
      }
      </>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <PrivateRoute path="/profile" exact={true} component={Profile} />
            <PrivateRoute path="/types/:typeId" exact={true} component={Types} />
            <PrivateRoute path="/create" exact={true} component={Create} />
            <PrivateRoute path="/approve" exact={true} component={Approve} />
            <PrivateRoute path="/flagged" exact={true} component={Flagged} />
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
      Unable to fetch user info.
    </Typography>
  }
  console.log("App:", data)
  return data.getUser && data.getUser.isMod ? <SidebarItem label={label} icon={icon} link={link} user={user}/>:
  <></>
}

export default App;
