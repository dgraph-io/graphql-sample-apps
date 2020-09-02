import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="contained"
      color="secondary"
      className="btn-margin"
      startIcon={<VpnKeyIcon/>}
    >
      Log In
    </Button>
  );
};

export default LoginButton;