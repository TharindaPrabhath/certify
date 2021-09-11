import { Redirect, Route, RouteProps } from "react-router";
import { isAdminLoggedIn } from "../utils/auth";

// when try to navigate to the signin page after a successful login,
// below code block helps to redirect back to the dashboard page :)

const AuthRoute: React.FC<RouteProps> = ({ ...rest }) => {
  if (isAdminLoggedIn() && rest.path === "/signin")
    return <Redirect to="/dashboard" />;
  return <Route {...rest} />;
};

export default AuthRoute;
