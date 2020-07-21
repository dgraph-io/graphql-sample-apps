import React, { Suspense } from 'react';
import { Router, Route } from "react-router-dom";

import history from "./utils/history";
import routes from "./routes";

import './App.css';

function App() {
  return (
     <Router history={history}>
      <Suspense fallback={<div  />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              render={(props) => <route.component {...props} />}
            />
          ))}
      </Suspense>
    </Router>
  );
}

export default App;
