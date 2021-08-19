import React from "react";

import "../components/Sidebar.css";

import logo from "../assets/logo/logo.png";
import SidebarData from "../data/sidebarData";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

const useStyle = makeStyles({
  listItem: {
    padding: "0.5em 0",
    margin: 0,
  },
});

const Sidebar = () => {
  const location = useLocation();
  const classes = useStyle();

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <label className="logo">
          <img src={logo} alt="Logo" width={32} />
          <span>
            <h2>Certify</h2>
          </span>
        </label>

        <div className="tabs">
          <List>
            {SidebarData.map((item, index) => {
              return (
                <ListItem button key={index} className={classes.listItem}>
                  <Link
                    className={
                      location.pathname === item.path ? "tab active" : "tab"
                    }
                    to={item.path}
                  >
                    <ListItemIcon>
                      {<item.icon.name htmlColor={item.icon.htmlColor} />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
