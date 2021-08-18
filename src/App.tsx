import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="left-col">
        <Sidebar />
      </div>

      <div className="right-col">
        <h2>Screens</h2>
      </div>
    </div>
  );
}

export default App;
