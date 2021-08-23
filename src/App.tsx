import React from "react";

import "./App.css";
import "./components/Topbar.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
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
        <div className="app">
          <div className="signin-screen">
            <Route path="/signin" exact>
              <Signin />
            </Route>
            <Route path="/certificate/verify" exact>
              <CertificateVerification />
            </Route>
            <Route path="/certificate/view" exact>
              <CertificateView />
            </Route>
          </div>

          <div className="app__topbar">
            <Topbar />
          </div>

          <div className="app__sidebar">
            <Sidebar />
          </div>

          <div className="app__screen">
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/user" exact>
              <User />
            </Route>
            <Route path="/user/new" exact>
              <NewUser />
            </Route>
            <Route path="/user/edit/:uid" exact>
              <EditUser />
            </Route>
            <Route path="/user/:uid" exact>
              <UserProfile />
            </Route>
            <Route path="/certificate" exact>
              <Certificate />
            </Route>
            <Route path="/certificate/new" exact>
              <NewCertificate />
            </Route>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
