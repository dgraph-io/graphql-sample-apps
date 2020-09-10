import React, { Suspense, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import ReactGA from 'react-ga';

import history from "./utils/history";

// import pages
import Home from "./pages/home";
import Profile from './pages/profile';
import Create from "./pages/create";
import Approve from "./pages/approve"
import NotFound from "./pages/not-found";
import Flagged from "./pages/flagged"
import PrivateRoute from "./components/privateRoute"
import Loading from "./components/loading"
import CardModal from "./components/card/cardModal"

// imports material UI
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// import styles
import './App.css';

// import Auth0
import { useAuth0 } from "@auth0/auth0-react";

// import react-apollo
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './utils/apollo-client';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

function App() {
  
  const [idToken, setIdToken] = useState("");

  const classes = useStyles();
  const { isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const initAuth0 = async () => {
      if (isAuthenticated) {
        const idTokenClaims = await getIdTokenClaims();
        setIdToken(idTokenClaims.__raw);
      }
    };
    initAuth0();
  }, [isAuthenticated, getIdTokenClaims]);

  useEffect(() => {
    ReactGA.initialize('UA-177248464-1');
    ReactGA.pageview(window.location.pathname);
  }, [])

  if (isLoading) {
    return <Loading />;
  }
  
  const client = createApolloClient(idToken);
 
  return (
    <ApolloProvider client={client}>
    <div className={classes.root}>
      <CssBaseline />
      <Router history={history}>
        <Suspense fallback={<div />}>
          <ModalSwitch />
        </Suspense>
      </Router>
    </div>
    </ApolloProvider>
  )
}

function ModalSwitch(){
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <div className="page-container">
      <Switch location={background || location}>
      <Route path="/" exact={true} component={Home} />
        <PrivateRoute path="/profile" exact={true} component={Profile} />
        <Route path="/post/:postId" exact={true} component={CardModal} />
        <PrivateRoute path="/create" exact={true} component={Create} />
        <PrivateRoute path="/approve" exact={true} component={Approve} />
        <PrivateRoute path="/flagged" exact={true} component={Flagged} />
        <Route component={NotFound} />
      </Switch>
       {background && <Route path="/post/:postId" exact={true} component={CardModal}/>}
    </div>
  );
}

export default App;
