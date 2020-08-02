import React, { Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";
import Types from "./pages/types";
import Form from "./pages/form";
import NotFound from "./pages/not-found";

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';

import './App.css';

import CssBaseline from "@material-ui/core/CssBaseline";

import {Sidebar, SidebarItem} from './components/sidebar';

const useStyles = makeStyles((theme) => ({
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
        <SidebarItem label="Create" icon={EditIcon} link="/form"/>
        <SidebarItem label="Settings" icon={SettingsIcon}>
          <SidebarItem label="Start" link="/not-implemented" />
          <SidebarItem label="Here" link="/not-implemented" />
        </SidebarItem>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/types/:typeId" exact={true} component={Types} />
            <Route path="/form" exact={true} component={Form} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default App;
