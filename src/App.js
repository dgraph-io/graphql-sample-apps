import React, { Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";
import Metrics from "./pages/metrics";
import AddData from "./pages/add-data";
import NotFound from "./pages/not-found";

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import './App.css';

import CssBaseline from "@material-ui/core/CssBaseline";

import {Sidebar, SidebarItem} from './components/sidebar';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar>
        <SidebarItem label="Home" icon={HomeIcon} link="/" />
        <SidebarItem label="Settings" icon={SettingsIcon}>
          <SidebarItem label="Metrics" link="/metrics" />
          <SidebarItem label="Add Data" link="/add-data" />
        </SidebarItem>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/metrics" exact={true} component={Metrics} />
            <Route path="/add-data" exact={true} component={AddData} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default App;
