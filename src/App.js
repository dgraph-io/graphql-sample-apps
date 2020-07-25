import React, { Suspense } from 'react';
import { Router, Route } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";

import './App.css';


function App() {
  return (
     <Router history={history}>
      <Suspense fallback={<div  />}>
        <Route path="/" exact={true} component={Home} />
        <Route path="/types" exact={true} component={Home} />
      </Suspense>
    </Router>
  );
}

export default App;
