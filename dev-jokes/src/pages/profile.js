import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from '../components/navbar';

import Button from '@material-ui/core/Button';
import LogoutButton from '../components/auth/logoutButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FlagIcon from '@material-ui/icons/Flag';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    textAlign: 'center',
    width: '100%',
  },
  content: {
    marginTop: '10%',
    [theme.breakpoints.down('md')]: {
      marginTop: '25%',
    },
  },
  profileImg: {
    borderRadius: '50%',
    height: '200px',
  },
  logout: {
    textAlign: 'center',
  },
  admin: {
    textAlign: 'center',
    marginTop: '10px',
  },
}));

const Profile = () => {
  const [role, setRole] = useState('USER');
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    const initAuth0 = async () => {
      if (isAuthenticated) {
        const idTokenClaims = await getIdTokenClaims();
        setRole(idTokenClaims['https://dgraph.io/jwt/claims']['ROLE']);
      }
    };
    initAuth0();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <>
      <Navbar title="Profile" color="primary" />
      <div className={classes.content}>
        <div className={classes.profile}>
          <img
            className={classes.profileImg}
            src={user.picture}
            alt="Profile"
            style={{ 'max-width': '100%' }}
          />
          <p>
            Name: <strong>{user.name}</strong>
          </p>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
        </div>
        <div className={classes.logout}>
          <LogoutButton />
        </div>
        {role === 'ADMIN' ? (
          <div className={classes.admin}>
            <Button
              onClick={() => history.push('/approve')}
              variant="contained"
              color="secondary"
              className="btn-margin"
              startIcon={<CheckCircleIcon />}
            >
              Approve
            </Button>
            &nbsp;
            <Button
              onClick={() => history.push('/flagged')}
              variant="contained"
              color="secondary"
              className="btn-margin"
              startIcon={<FlagIcon />}
            >
              Flagged
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
