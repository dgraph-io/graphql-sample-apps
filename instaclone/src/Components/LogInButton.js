import { useAuth0 } from "@auth0/auth0-react";
import { GenericButton } from "./GenericButton";

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <GenericButton
      color="status-ok"
      secondary
      plain={true}
      label="Log in"
      style={{ margin: 10 }}
      onClick={loginWithRedirect}
    />
  );
};

export default LogInButton;
