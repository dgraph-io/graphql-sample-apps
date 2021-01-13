import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css'

import {AuthProvider} from "./Auth";

ReactDOM.render(
  <AuthProvider 
  />,
  document.getElementById("root")
);
