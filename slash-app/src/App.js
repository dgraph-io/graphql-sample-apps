import React, { Suspense } from "react";
import { Router, Route } from "react-router-dom";

import history from "./utils/history";
import routes from "./routes";

import Layout from "./components/layout";
import { LoaderIcon } from "./components/svg";

import "./App.css";

const App = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<div className="loader"><LoaderIcon /></div>}>
        <Layout>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              render={(props) => <route.component {...props} />}
            />
          ))}
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
