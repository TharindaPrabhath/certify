import React from "react";

import "../screens/User.css";

import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";
import { useButtonStyles } from "../data/styles";
import colors from "../data/colors";
import { useEffect } from "react";
import axios from "../utils/axios";
import requests from "../data/requests";
import { useState } from "react";
import UserDto from "../types/models/UserDto";
import { toUserDtos } from "../utils/mapper";

const User = () => {
  const buttonStyles = useButtonStyles();

  return (
    <div className="user">
      <div className="user__content">
        <div className="top">
          <div className="left-col">
            <h2>Users</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Typography style={{ color: colors.dimmedClr }}>Users</Typography>
            </Breadcrumbs>
          </div>

          <div className="right-col">
            <Link to="user/new/">
              <Button className={buttonStyles.standardBtn}>
                <AddIcon />
                New User
              </Button>
            </Link>
          </div>
        </div>

        <div className="table">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default User;
