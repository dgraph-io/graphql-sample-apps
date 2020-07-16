import React from "react";

import Navbar from "../molecules/navbar";

const Layout = (props) => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

export default Layout;
