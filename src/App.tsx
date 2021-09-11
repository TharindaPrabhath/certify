import React from "react";

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
              </Switch>
            </div>
          </div>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
