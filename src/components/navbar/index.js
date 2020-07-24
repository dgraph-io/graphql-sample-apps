import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./navbar.style";

export default function Navbar({ navProperties }) {
  const classes = useStyles();
  const [closeBtn, setCloseBtn] = useState(false);
  const {
    basicStyle,
    logo,
    title,
    searchBar,
    navRightItems,
    mobileViewNavLink,
  } = navProperties;

  const getLogo = () => {
    return logo ? (
      <Link to="/">
        <img
          src={require(`../../assets/images/${logo.imageName}`)}
          alt="logo"
          width={logo.width}
          height={logo.height}
        />
      </Link>
    ) : null;
  };

  const getTitle = () => {
    return title ? (
      <Typography variant={title.variant}>{title.text}</Typography>
    ) : null;
  };

  const getSearchBar = (view) => {
    return searchBar ? (
      <div className={view === "web" ? classes.search : classes.searchToggle}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={searchBar.placeholder}
          onChange={searchBar.onChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    ) : null;
  };

  const getNavRightItems = (view) => {
    return navRightItems.map((item, index) => {
      return (
        <div
          className={view === "web" ? classes.ml2 : null}
          style={{ cursor: "pointer" }}
          key={index}
        >
          {item.type === "text" ? (
            <a
              href={item.href}
              onClick={item.onClick}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography variant={item.variant}>{item.text}</Typography>
            </a>
          ) : (
            <div onClick={item.onClick}>
              <img
                src={require(`../../assets/images/${item.iconName}`)}
                alt="icon"
                width={item.width}
                height={item.height}
              />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className={classes.nav} style={basicStyle}>
        <div className={classes.navLeft}>
          {getLogo()}
          {getTitle()}
          {getSearchBar("web")}
        </div>

        <div className={classes.navRight}>{getNavRightItems("web")}</div>

        <div
          className={classes.toggleBtn}
          onClick={() => setCloseBtn(!closeBtn)}
        >
          <IconButton color="inherit">
            {!closeBtn ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </div>
      {closeBtn ? (
        <div className={classes.navLinks} style={mobileViewNavLink}>
          {searchBar ? (
            <div>
              {getSearchBar()}
              <br />
            </div>
          ) : null}
          {getNavRightItems()}
        </div>
      ) : null}
    </React.Fragment>
  );
}
