import React from "react";
import "./App.css";
import { Image } from "semantic-ui-react";
import { AppHeader, Home, Post } from "./components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export function App() {
  return (
    <>
      <div
        style={{
          padding: "5px",
          height: "30px",
          textAlign: "center",
          fontSize: "larger",
          backgroundColor: "#eaeaea",
        }}
      >
        <div style={{ display: "inline-flex" }}>
          <span>
            Powered by{" "}
            <a href="https://slash.dgraph.io" target="__blank">
              <strong>Slash GraphQL</strong>
            </a>
          </span>
          <Image size="mini" src="/lighting.svg" style={{ height: "25px" }} />
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
