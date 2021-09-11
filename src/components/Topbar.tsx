import React from "react";

import "../components/Topbar.css";

import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SwipeableDrawer,
} from "@material-ui/core";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { ReducerType } from "../redux/store";
import colors from "../data/colors";
import { Redirect } from "react-router";

const Topbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);
  const avatarBtnRef = React.useRef<HTMLButtonElement>(null);
  const [logout, setLogout] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { initAdmin, removeAdmin } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const currentAdmin = useSelector(
    (state: ReducerType) => state.adminReducer.currentAdmin
  );

  const toggleSidebar = (open: boolean) => {
    setSidebarOpen(open);
  };

  const handleAvatarToggle = () => {
    setAvatarMenuOpen(!avatarMenuOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      avatarBtnRef.current &&
      avatarBtnRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setAvatarMenuOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setLogout(true);
  };

  if (logout) return <Redirect push to={`/signin`} />;

  return (
    <div className="topbar">
      <div className="topbar__content">
        <Button className="menu-btn" onClick={() => toggleSidebar(true)}>
          <MenuIcon style={{ color: "white" }} />
        </Button>
        <SwipeableDrawer
          open={sidebarOpen}
          onOpen={() => toggleSidebar(true)}
          onClose={() => toggleSidebar(false)}
        >
          <Sidebar />
        </SwipeableDrawer>
        <Button
          className="avatar"
          ref={avatarBtnRef}
          aria-controls={avatarMenuOpen ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleAvatarToggle}
        >
          <Avatar style={{ cursor: "pointer" }}>
            {localStorage.getItem("currentAdmin")?.substring(0, 2)}
          </Avatar>
        </Button>

        <Popper
          open={avatarMenuOpen}
          anchorEl={avatarBtnRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper
                style={{
                  backgroundColor: colors.secondaryBgClr,
                  color: colors.secondaryFontClr,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={avatarMenuOpen} id="menu-list-grow">
                    <MenuItem>Profile</MenuItem>
                    <MenuItem button onClick={handleLogoutClick}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default Topbar;
