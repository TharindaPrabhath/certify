import React, { useEffect } from "react";

import "./App.css";
import "./components/Topbar.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Topbar from "./components/Topbar";
import User from "./screens/User";
import NewUser from "./screens/NewUser";
import { createTheme, ThemeProvider } from "@material-ui/core";
import colors from "./data/colors";
import Certificate from "./screens/Certificate";
import NewCertificate from "./screens/NewCertificate";
import EditUser from "./screens/EditUser";
import Signin from "./screens/Signin";
import CertificateVerification from "./screens/CertficateVerification";
import CertificateView from "./screens/CertificateView";
import UserProfile from "./screens/UserProfile";
import { SnackbarProvider } from "notistack";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import useLocalStorage from "./utils/useLocalStorage";
import { useSelector } from "react-redux";
import { ReducerType } from "./redux/store";
import { fetchAdminByUsername } from "./utils/requestHelper";
import Activity from "./screens/Activity";
import Settings from "./screens/Settings";
import useTokenService from "./utils/useTokenService";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryBrandClr,
    },
    secondary: {
      main: colors.primaryFontClr,
    },
  },
});

function App() {
  const { saveAdmin } = useLocalStorage();
  const currentAdmin = useSelector(
    (state: ReducerType) => state.adminReducer.currentAdmin
  );
  const { getRefreshTokenExpiresAt } = useTokenService();

  useEffect(() => {
    const refreshTokenExpiresAt = getRefreshTokenExpiresAt();
    if (refreshTokenExpiresAt && refreshTokenExpiresAt !== undefined) {
      // checking refersh token is expires or not
      if (Date.now() > Date.parse(getRefreshTokenExpiresAt()!)) {
        // refresh token has expired
        // logging out the admin
        localStorage.clear();
      }
    } else {
      // no refresh token in the local storage. cannot trust the situation
      // logging out the admin
      localStorage.clear();
    }
  }, [getRefreshTokenExpiresAt]);

  useEffect(() => {
    fetchAdminByUsername(currentAdmin?.username!)
      .then((res) => {
        saveAdmin({ id: res.data.id, username: currentAdmin?.username });
      })
      .catch((err) => console.error(err));
    // if (currentAdmin === null) {
    //   const admin = getAdmin();
    //   setAdmin({ id: parseInt(admin.id!), username: admin.username! });
    // }
  }, [currentAdmin?.username]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider>
          <div className="app">
            <div className="signin-screen">
              <Switch>
                <AuthRoute path="/signin" exact>
                  <Signin />
                </AuthRoute>
                <Route path="/certificate/verify" exact>
                  <CertificateVerification />
                </Route>
                <Route path="/certificate/view" exact>
                  <CertificateView />
                </Route>
              </Switch>
            </div>

            <div className="app__topbar">
              <Topbar />
            </div>

            <div className="app__sidebar">
              <Sidebar />
            </div>

            <div className="app__screen">
              <Switch>
                <ProtectedRoute path="/dashboard" exact>
                  <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute path="/user" exact>
                  <User />
                </ProtectedRoute>
                <ProtectedRoute path="/user/new" exact>
                  <NewUser />
                </ProtectedRoute>
                <ProtectedRoute path="/user/edit/:uid" exact>
                  <EditUser />
                </ProtectedRoute>
                <ProtectedRoute path="/user/:uid" exact>
                  <UserProfile />
                </ProtectedRoute>
                <ProtectedRoute path="/certificate" exact>
                  <Certificate />
                </ProtectedRoute>
                <ProtectedRoute path="/certificate/new" exact>
                  <NewCertificate />
                </ProtectedRoute>
                <ProtectedRoute path="/activity" exact>
                  <Activity />
                </ProtectedRoute>
                <ProtectedRoute path="/settings" exact>
                  <Settings />
                </ProtectedRoute>
              </Switch>
            </div>
          </div>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
