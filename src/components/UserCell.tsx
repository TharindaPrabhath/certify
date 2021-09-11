import {
  Avatar,
  createStyles,
  makeStyles,
  Tab,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useAvatarStyles } from "../data/styles";

import "./UserCell.css";

const UserCell = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const classes = useAvatarStyles();

  return (
    <div className="user-cell">
      <div className="user-cell__content">
        <Avatar className={classes.small}>
          {firstName.substring(0, 1) + lastName.substring(0, 1)}
        </Avatar>
        <p className="username">{firstName}</p>
      </div>
    </div>
  );
};

export default UserCell;
