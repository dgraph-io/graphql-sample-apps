import React, { useEffect } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { KanbanBoard, Header, Projects } from "./components";
import { Header as SUHeader } from "semantic-ui-react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import createApolloClient from "./ApolloConfig";
import ManageUsers from "./utils/ManageUsers";

const CLAIMS = process.env.REACT_APP_AUTH0_CLAIMS_KEY as string;

const App = () => {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const currentUser = user?.[CLAIMS] || {};
  useEffect(() => {}, [isAuthenticated]);
  return (
    <ApolloProvider
      client={createApolloClient(isAuthenticated ? getIdTokenClaims : null)}
    >
      <ManageUsers />
      <BrowserRouter>
        <div style={{ height: "-webkit-fill-available", paddingTop: "10em" }}>
          {!isLoading && <Header />}
          <Switch>
            <Route exact path="/project/:projID" component={KanbanBoard} />
            <Route
              path="/"
              render={(props) => (
                <>
                  {isAuthenticated && (
                    <Projects
                      {...props}
                      // withProjectEdits={currentUser.isAdmin === true}
                      withProjectEdits={
                        isAuthenticated && Boolean(currentUser.username)
                      }
                    />
                  )}
                  {!isAuthenticated && (
                    <SUHeader
                      style={{ textAlign: "center" }}
                      content="Please login above to see your projects."
                      as="h4"
                    />
                  )}
                </>
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
