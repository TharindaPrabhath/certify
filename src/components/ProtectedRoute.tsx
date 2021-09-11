import { Redirect, Route, RouteProps } from "react-router";
import { isAdminLoggedIn } from "../utils/auth";

interface ProtectedRouteProps extends RouteProps {}

// when try to navigate to pages (except signin page) without logged in,
// below code block helps to redirect back to the signin page :)

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest }) => {
  if (isAdminLoggedIn() && rest.path !== "/signin") return <Route {...rest} />;
  return <Redirect to="/signin" />;
};

export default ProtectedRoute;
