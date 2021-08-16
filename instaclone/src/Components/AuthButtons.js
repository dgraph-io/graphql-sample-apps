import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogOutButton /> : <LogInButton />;
};

export default AuthButton;