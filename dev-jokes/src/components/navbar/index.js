import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';

import LoginButton from '../auth/loginButton';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';

import clsx from 'clsx';
import useStyles from './navbar.style';
import Logo from '../../assets/images/logo.svg';

const AuthNav = ({ history }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const classes = useStyles();
  return (
    <div className={classes.navRight}>
      {location && location.pathname !== '/create' ? (
        <Button
          onClick={() => {isAuthenticated? history.push("/create"): loginWithRedirect()}}
          variant="contained"
          color="secondary"
          className="btn-margin"
          startIcon={<AddIcon />}
        >
          <span class="button-text">Create</span>
        </Button>
      ) : null}
      &nbsp;
      {isAuthenticated ? (
        <IconButton onClick={() => history.push('/profile')}>
          <Avatar alt={user.name} src={user.picture} />
        </IconButton>
      ) : (
        <span className={classes.login}>
          <LoginButton />
        </span>
      )}
    </div>
  );
};

export function Navbar({ title, searchBar, children = [], color = 'primary' }) {
  const classes = useStyles();
  const [closeBtn, setCloseBtn] = useState(false);
  const history = useHistory();

  const getSearchBar = (view) => {
    return searchBar ? (
      <div className={view === 'web' ? classes.search : classes.searchToggle}>
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
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    ) : null;
  };

  const getNavRightItems = (view) => {
    return children.map((item, index) => {
      return (
        <div
          className={view === 'web' ? classes.ml2 : null}
          style={{ cursor: 'pointer' }}
          key={index}
        >
          {item}
        </div>
      );
    });
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, classes.appBarShift)}
      color={color}
    >
      <div className={classes.nav}>
        <div className={classes.navLeft}>
          <div className={classes.logo}>
            <img
              src={Logo}
              height="70"
              alt="logo"
              onClick={() => history.push('/')}
            />
          </div>
          {getSearchBar('web')}
        </div>

        <div className={classes.navRight}>{getNavRightItems('web')}</div>

        <div
          className={classes.toggleBtn}
          onClick={() => setCloseBtn(!closeBtn)}
        >
          <IconButton color="inherit">
            {!closeBtn ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </div>
        <AuthNav history={history} />
      </div>
      {closeBtn ? (
        <div className={classes.navLinks}>
          {searchBar ? (
            <div>
              {getSearchBar()}
              <br />
            </div>
          ) : null}
          {getNavRightItems()}
        </div>
      ) : null}
    </AppBar>
  );
}
