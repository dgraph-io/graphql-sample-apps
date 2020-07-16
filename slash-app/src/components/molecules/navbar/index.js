import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Text, SearchBar } from "../../atoms";
import { Button } from "../index";
import { LogoIcon } from "../../svg";

import "./navbar.css";

const Navbar = () => {
  const onBtnClick = () => {
    setCloseIcon(!closeIcon);
  };

  const [closeIcon, setCloseIcon] = useState(false);

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" onClick={onBtnClick} />
      <div className="nav-left">
        <Link to="/">
          <LogoIcon />
        </Link>
        <Text text="Best Weekly GraphQL Tweets" fontColor="white" fontSize="rs-medium" fontWeight="medium" />

        {!closeIcon ? <div className="search-bar"><SearchBar placeholder="Search Tweet Site" /></div> : null}
      </div>
      <div className="nav-btn">
        <label className={closeIcon ? "label close": "label"} htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      
      <div className="nav-right">
        <div className="nav-button">
          <Button title="Subscribe to TweetLetter" />
        </div>
        <div className="nav-item-link">
          <a href="#">
          <Text text="About" fontColor="white" fontSize="little-small" />
          </a>
        </div>
      </div>

      <div className="nav-links">
          <div className="p-2">
            <SearchBar placeholder="Search Tweet Site" />
            <br />
            <a href="#">
              <Text text="About" fontColor="white" fontSize="little-small" fontWeight="medium" />
            </a>
          </div>
        <br />
        <div className="nav-item-button">
          <Text text="Subscribe to TweetLetter" fontColor="white" fontSize="little-small" fontWeight="medium" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
