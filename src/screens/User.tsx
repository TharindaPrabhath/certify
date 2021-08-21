import React from "react";

import "../screens/User.css";

import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";
import { useButtonStyles } from "../data/styles";

const User = () => {
  const buttonStyles = useButtonStyles();

  return (
    <div className="user">
      <div className="user__content">
        <div className="top">
          <h2>Users</h2>
          <Link to="user/new">
            <Button className={buttonStyles.standardBtn}>
              <AddIcon />
              New User
            </Button>
          </Link>
        </div>

        <div className="table">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default User;
