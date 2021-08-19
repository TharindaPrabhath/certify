import React from "react";

import "../screens/User.css";

import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserTable from "../components/UserTable";

const User = () => {
  return (
    <div className="user">
      <div className="user__content">
        <div className="top">
          <h2>Users</h2>
          <Button
            style={{
              backgroundColor: "#0eadec",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            <AddIcon />
            New User
          </Button>
        </div>

        <div className="table">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default User;
