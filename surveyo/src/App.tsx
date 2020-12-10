import React from 'react';
import ReactGA from 'react-ga';
import {Button, Spin} from 'antd';
import Graphiql from './Graphiql';
import FormPage from './Form';
import VizPage from './Charts';
import Dashboard from './Dashboard';
import {ApolloProvider} from '@apollo/client';
import {Switch, Route, Link, NavLink, Router} from 'react-router-dom';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import createApolloClient from './ApolloConfig';
import logoLight from './images/logoLight.svg';
import logoDark from './images/logoDark.svg';
import slashLogo from './images/slash-logo.png';
import {Typography} from 'antd';
import FormCreator from './FormCreator';
import history from './history';

// Initialize google analytics page view tracking
const trackingId = 'UA-75364122-13';
ReactGA.initialize(trackingId);

history.listen(location => {
  ReactGA.set({page: location.pathname}); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function Loading() {
  return (
    <div style={{textAlign: 'center'}}>
      <Spin />
    </div>
  );
}

function PrivateRoute({component, ...args}: any) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
      })}
      {...args}
    />
  );
}

function SyMenu() {
  const {isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();

  const menuItems = () => {
    if (isLoading) {
      return null;
    } else if (isAuthenticated) {
      return (
        <Button
          onClick={() =>
            logout({
              returnTo: window.location.origin,
            })
          }
          ghost
          style={{color: 'white', borderColor: 'white'}}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <>
          <Button
            onClick={() =>
              loginWithRedirect({
                returnTo: window.location.origin,
              })
            }
            ghost
            style={{color: 'white', borderColor: 'white'}}
          >
            Login
          </Button>
          <Button
            type="primary"
            onClick={() => loginWithRedirect({screen_hint: 'signup'})}
            style={{marginLeft: 10}}
          >
            Sign up
          </Button>
        </>
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}
    >
      <div>
        <NavLink to="/">
          <img src={logoLight} style={{height: 32, padding: 5}} alt="" />
        </NavLink>
      </div>
      <div>{menuItems()}</div>
    </div>
  );
}

function App() {
  const {isAuthenticated, isLoading, getIdTokenClaims} = useAuth0();

  return (
    <ApolloProvider
      client={createApolloClient(isAuthenticated ? getIdTokenClaims : null)}
    >
      <Router history={history}>
        <div className="box">
          <div className="row header">
            <SyMenu />
          </div>
          <div className="row content">
            <main>
              {isLoading ? (
                <Loading />
              ) : (
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={isAuthenticated ? Dashboard : Home}
                  />
                  <Route exact path="/form/:id" component={FormPage} />
                  <PrivateRoute exact path="/create" component={FormCreator} />
                  <PrivateRoute exact path="/charts/:id" component={VizPage} />
                  <PrivateRoute
                    exact
                    path="/graphiql/:id"
                    component={Graphiql}
                  />
                </Switch>
              )}

              <img
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  borderTopLeftRadius: '10px',
                }}
                src={slashLogo}
                alt="slash-logo"
              />
            </main>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function Home() {
  return (
    <div
      style={{
        background: 'white',
        height: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={logoDark} alt="" />
      <Typography.Title level={3}>Surveys, simplified.</Typography.Title>
      <Link to="/create">
        <Button type="primary" size="large">
          Create a survey
        </Button>
      </Link>
    </div>
  );
}

export default App;
