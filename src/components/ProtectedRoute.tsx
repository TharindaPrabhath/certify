import { Redirect, Route, RouteProps } from "react-router";
import useAuth from "../utils/useAuth";

interface ProtectedRouteProps extends RouteProps {}

// when try to navigate to pages (except signin page) without logged in,
// below code block helps to redirect back to the signin page :)

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest }) => {
  const { isAdminLoggedIn } = useAuth();

  if (isAdminLoggedIn() && rest.path !== "/signin") return <Route {...rest} />;
  return <Redirect to="/signin" />;
  //return <Route {...rest} />;
};

export default ProtectedRoute;
