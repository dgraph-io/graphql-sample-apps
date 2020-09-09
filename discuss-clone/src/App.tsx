import React from "react";
import "./App.css";
import { Image } from "semantic-ui-react";
import { AppHeader, Home, Post } from "./components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export function App() {
  return (
    <>
      <div className="app-banner">
        <div className="inline-flex">
          <span>
            Powered by{" "}
            <a href="https://slash.dgraph.io" target="__blank">
              <strong>Slash GraphQL</strong>
            </a>
          </span>
          <Image size="mini" src="/lighting.svg" className="lightning-logo" />
        </div>
      </div>
      <div className="App">
        <BrowserRouter>
          <AppHeader />
          <Switch>
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}
