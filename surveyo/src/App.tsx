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
import logo from './logo.svg';
import {Layout, Typography} from 'antd';
import FormCreator from './FormCreator';
import history from './history';

// Initialize google analytics page view tracking
const trackingId = 'UA-75364122-11';
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

function SyMenu(isAuthenticated: Boolean) {
  const {loginWithRedirect, logout} = useAuth0();

  return (
    <>
      <div style={{float: 'left'}}>
        <NavLink to="/">
          <img src={logo} style={{height: '24px'}} alt="" />
        </NavLink>
      </div>
      <div style={{float: 'right'}}>
        {isAuthenticated ? (
          <Button
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
            ghost
            style={{color: '#000000', borderColor: '#000000', margin: '10px'}}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              onClick={() =>
                loginWithRedirect({
                  returnTo: window.location.origin,
                })
              }
              ghost
              style={{color: '#000000', borderColor: '#000000', margin: '10px'}}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={() =>
                loginWithRedirect({
                  screen_hint: 'signup',
                })
              }
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </>
  );
}

function App() {
  const {isAuthenticated, isLoading, getIdTokenClaims} = useAuth0();

  return (
    <ApolloProvider
      client={createApolloClient(isAuthenticated ? getIdTokenClaims : null)}
    >
      <Router history={history}>
        <Layout style={{height: '100%'}}>
          <Layout.Header style={{background: 'white'}}>
            {SyMenu(isAuthenticated as Boolean)}
          </Layout.Header>
          <Layout hasSider>
            <Layout.Sider breakpoint="lg" collapsedWidth={1} theme="light" />
            <Layout.Content>
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
            </Layout.Content>
            <Layout.Sider breakpoint="lg" collapsedWidth={1} theme="light" />
          </Layout>
        </Layout>
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
      <img src={logo} alt="" />
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
