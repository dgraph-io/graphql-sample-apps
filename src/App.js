import React, { Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";

// import pages
import Home from "./pages/home";
import Profile from './pages/profile';
import Create from "./pages/create";
import Approve from "./pages/approve"
import NotFound from "./pages/not-found";
import Flagged from "./pages/flagged"
import PrivateRoute from "./components/privateRoute"
import {Sidebar, SidebarItem} from './components/sidebar';
import Loading from "./components/loading"

// imports material UI
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FlagIcon from '@material-ui/icons/Flag';
import CssBaseline from "@material-ui/core/CssBaseline";

// import styles
import './App.css';

// import Auth0
import { useAuth0 } from "@auth0/auth0-react";

// import react-apollo
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apollo-client';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

function App() {
  const [idToken, setIdToken] = useState("");
  const [role, setRole] = useState('USER');

  const classes = useStyles();
  const { isLoading, isAuthenticated, user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const initAuth0 = async () => {
      console.log("isAuth:", isAuthenticated)
      if (isAuthenticated) {
        const idTokenClaims = await getIdTokenClaims();
        setIdToken(idTokenClaims.__raw);
        setRole(idTokenClaims['https://dgraph.io/jwt/claims']['ROLE'])
      }
    };
    initAuth0();
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }
  
  const client = createApolloClient(idToken);
  console.log(user)
  return (
    <ApolloProvider client={client}>
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar>
        <></>
        <>
        <SidebarItem label="Home" icon={HomeIcon} link="/" />
      { isAuthenticated ? <>
        <SidebarItem label="Profile" icon={PersonIcon} link="/profile" />
        <SidebarItem label="Create" icon={EditIcon} link="/create"/>
        <AdminSidebarItem role={role}/>
        </> : null
      }
      </>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <PrivateRoute path="/profile" exact={true} component={Profile} />
            <PrivateRoute path="/create" exact={true} component={Create} />
            <PrivateRoute path="/approve" exact={true} component={Approve} />
            <PrivateRoute path="/flagged" exact={true} component={Flagged} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
    </ApolloProvider>
  )
}

function AdminSidebarItem({role}) {
  return role === 'ADMIN' ? 
  <>
  <SidebarItem label="Approve" icon={CheckCircleIcon} link="/approve"/>
  <SidebarItem label="Flagged" icon={FlagIcon} link="/flagged"/>
  </>
  :
  <></>
}

export default App;
