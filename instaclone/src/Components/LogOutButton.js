import { GenericButton } from "./GenericButton";
import { useAuth0 } from "@auth0/auth0-react";

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <GenericButton
      color="status-warning"
      plain={true}
      label="Log out"
      style={{ margin: 10 }}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    />
  );
};

export default LogOutButton;
