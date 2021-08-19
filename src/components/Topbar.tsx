import React from "react";

import "../components/Topbar.css";

import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, Button, SwipeableDrawer } from "@material-ui/core";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Topbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <div className="topbar">
      <div className="topbar__content">
        <Button onClick={() => toggleSidebar(true)}>
          <MenuIcon style={{ color: "white" }} />
        </Button>
        <SwipeableDrawer
          open={sidebarOpen}
          onOpen={() => toggleSidebar(true)}
          onClose={() => toggleSidebar(false)}
        >
          <Sidebar />
        </SwipeableDrawer>
        <Avatar style={{ cursor: "pointer" }}>TP</Avatar>
      </div>
    </div>
  );
};

export default Topbar;
