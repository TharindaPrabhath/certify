import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import React from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/UserTable";
import colors from "../data/colors";
import { useButtonStyles } from "../data/styles";

import "./Certificate.css";

const Certificate = () => {
  const buttonStyles = useButtonStyles();

  return (
    <div className="certificate">
      <div className="certificate__content">
        <div className="top">
          <div className="left-col">
            <h2>Certificates</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Typography style={{ color: colors.dimmedClr }}>
                Certificates
              </Typography>
            </Breadcrumbs>
          </div>

          <div className="right-col">
            <Link to="certificate/new">
              <Button className={buttonStyles.standardBtn}>
                <AddIcon />
                New Certificate
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

export default Certificate;
