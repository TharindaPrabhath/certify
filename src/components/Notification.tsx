import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Button,
} from "@material-ui/core";
import React from "react";
import colors from "../data/colors";

import "./Notification.css";

interface NotificationProps {
  open: boolean;
  anchorEl: any;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  open,
  onClose,
  anchorEl,
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl.current}
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
            <ClickAwayListener onClickAway={onClose}>
              <div className="notification">
                <div className="notification__header">
                  <h3>Notifications</h3>
                </div>
                <div className="notification__body">
                  <MenuList autoFocusItem={open}>
                    <MenuItem>Profile</MenuItem>
                  </MenuList>
                </div>
                <div className="notification__footer">
                  <Button className="clear-btn" variant="text">
                    Clear
                  </Button>
                </div>
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default Notification;
