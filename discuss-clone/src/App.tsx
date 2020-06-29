import React from "react"
import "./App.css"
import { AppHeader, Home, Post } from "./components"
import { BrowserRouter, Switch, Route } from "react-router-dom"

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <Switch>
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
