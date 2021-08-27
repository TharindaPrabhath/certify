import {
  Avatar,
  createStyles,
  makeStyles,
  Tab,
  Theme,
} from "@material-ui/core";
import React from "react";

import "./UserCell.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: "0.8em",
      backgroundColor: theme.palette.success.dark,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const UserCell = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const classes = useStyles();

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
