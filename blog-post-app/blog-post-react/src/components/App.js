import React from "react";

import PostList from "./PostList";
import Header from "./Header";
import PostView from "./ViewPost";
import CreatePost from "./CreatePost";
import { Switch, Route } from "react-router-dom";
import EditPost from "./EditPost";

export default function App() {
  return (
    <div className="container">
      <Header />

      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/create" component={CreatePost} />
        <Route exact path="/view" component={PostView} />
        <Route exact path="/edit" component={EditPost} />
      </Switch>
    </div>
  );
}
