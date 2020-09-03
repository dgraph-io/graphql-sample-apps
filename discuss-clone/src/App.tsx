import React from "react"
import "./App.css"
// import "./tailwind.css";
import { AppHeader, Home, Post } from "./components"
import { BrowserRouter, Switch, Route } from "react-router-dom"

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
        Powered by Slash
      </div>
      <div className="App">
        <BrowserRouter>
          <AppHeader />
          {/* <div className="ui divider"></div> */}
          <Switch>
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}
