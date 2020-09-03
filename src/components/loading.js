import React from "react";
import { CircularProgress } from "@material-ui/core";
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="spinner">
    <CircularProgress />
  </div>
);

export default Loading;
