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
  Tooltip,
} from "@material-ui/core";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { ReducerType } from "../redux/store";
import colors from "../data/colors";
import { Redirect } from "react-router";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import Notification from "./Notification";
import LoadingLinearProgress from "./LoadingLinearProgress";

const Topbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const notificationBtnRef = React.useRef<HTMLButtonElement>(null);
  const avatarBtnRef = React.useRef<HTMLButtonElement>(null);

  const ICON_SIZE = 24;
  const ICON_INACTIVE_COLOR = "#f5f5f5";

  const dispatch = useDispatch();
  const { setAdmin, removeAdmin } = bindActionCreators(
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
    setAvatarMenuOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setLogout(true);
  };

  if (logout) return <Redirect push to={`/signin`} />;

  return (
    <div className="topbar">
      <LoadingLinearProgress />
      <div className="topbar__content">
        <div className="topbar__content-left-col">
          <Button className="menu-btn" onClick={() => toggleSidebar(true)}>
            <MenuIcon style={{ color: ICON_INACTIVE_COLOR }} />
          </Button>

          {/* <Tooltip
            children={
              <Button>
                <SearchIcon htmlColor={ICON_INACTIVE_COLOR} fontSize="medium" />
              </Button>
            }
            title={"Search"}
          /> */}
        </div>

        <div className="topbar__content-right-col">
          {/* <Tooltip
            children={
              <Button
                ref={notificationBtnRef}
                aria-controls={notificationOpen ? "grow" : undefined}
                aria-haspopup="true"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <NotificationsIcon
                  htmlColor={ICON_INACTIVE_COLOR}
                  fontSize="medium"
                />
              </Button>
            }
            title={"Notifications"}
          /> */}

          <Tooltip
            children={
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
            }
            title={"Avatar"}
          />
        </div>

        <SwipeableDrawer
          open={sidebarOpen}
          onOpen={() => toggleSidebar(true)}
          onClose={() => toggleSidebar(false)}
        >
          <Sidebar />
        </SwipeableDrawer>

        {/* <Notification
          open={notificationOpen}
          anchorEl={notificationBtnRef}
          onClose={() => setNotificationOpen(false)}
        /> */}

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
