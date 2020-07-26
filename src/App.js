import React, { Suspense } from 'react';
import { Router, Route } from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";

import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import CreditCardIcon from '@material-ui/icons/CreditCard';
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
        <SidebarItem label="Home" icon={HomeIcon} />
        <SidebarItem label="Customers" icon={PeopleIcon} />
        <SidebarItem label="Payments" icon={CreditCardIcon} />
        <SidebarItem label="Management" icon={SettingsIcon} >
          <SidebarItem label="Product" />
          <SidebarItem label="Order" />
        </SidebarItem>
      </Sidebar>
      <Router history={history}>
        <Suspense fallback={<div />}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/types" exact={true} component={Home} />
        </Suspense>
      </Router>
    </div>
  )
}

export default App;
