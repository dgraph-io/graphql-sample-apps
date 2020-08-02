import React from "react";
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loading} class="center" alt="Loading" />
  </div>
);

export default Loading;