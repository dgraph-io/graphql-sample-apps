import React from "react";
import { Link } from "react-router-dom";

import { Text } from "../../atoms";

import { LogoIcon, MessageIcon, ChatIcon, SupportIcon } from "../../svg";

import "./landing.css";

const Landing = () => (
  <div className="wrapper">
    <div className="image-title-wrapper">
      <LogoIcon />
      <div className="title">
        <Text text="Best Weekly GraphQL Tweets" color="white" fontSize="rs-large" fontWeight="medium" />
      </div>
    </div>
    <br />
    <div>
      <Link to="/tweet-list">
        <Text text="Connecting You To The GraphQL Community" color="white" fontSize="rs-extra-large" fontWeight="bold" />
      </Link>
    </div>
    <br />
    <div>
      <Text text="Best Weekly GraphQL Tweets Curated Just For You" fontSize="rs-medium" fontWeight="medium" opacity="light" />
    </div>

    <div className="footer">
      <div className="dgraph-text">
        <Text text="Built with Slash GraphQL" color="white" fontSize="rs-small" opacity="light" />
      </div>
      <div className="icons">
        <div><MessageIcon /></div>
        <div><SupportIcon /></div>
        <div><ChatIcon /></div>
      </div>
    </div>
  </div>
);

export default Landing;
