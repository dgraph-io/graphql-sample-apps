import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
      <Button 
        variant="contained"
        color="secondary"
        startIcon={<ExitToAppIcon/>}
        onClick={() => logout({returnTo: window.location.origin})}
      > 
        Logout 
      </Button>
  );
};

export default LogoutButton;