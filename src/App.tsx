import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Topbar from "./components/Topbar";
import User from "./screens/User";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__topbar">
          <Topbar />
        </div>

        <div className="app__sidebar">
          <Sidebar />
        </div>

        <div className="app__screen">
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
