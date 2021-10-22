import {
  Breadcrumbs,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CertificateTable from "../components/CertificateTable";
import colors from "../data/colors";
import { useButtonStyles } from "../data/styles";

import "./Certificate.css";

const Certificate = () => {
  const buttonStyles = useButtonStyles();
  const [certificateActionMenuOpen, setCertificateActionMenuOpen] =
    useState(false);
  const certificateActionRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setCertificateActionMenuOpen(false);
  };

  return (
    <div className="certificate-screen">
      <div className="certificate-screen__content">
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
            <div className="right-col__mobile-certificate-actions">
              <Button
                ref={certificateActionRef}
                aria-controls="certificate-action-menu"
                aria-haspopup="true"
                onClick={() => setCertificateActionMenuOpen(true)}
              >
                <MoreVert htmlColor="white"></MoreVert>
              </Button>

              <Popper
                open={certificateActionMenuOpen}
                anchorEl={certificateActionRef.current}
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
                        <MenuList
                          autoFocusItem={certificateActionMenuOpen}
                          id="menu-list-grow"
                        >
                          <MenuItem button>
                            <Link to="certificate/new">New Certificate</Link>
                          </MenuItem>
                          <MenuItem button>
                            <Link to="certificate/new">Certificate Bulk</Link>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            <Link
              to="certificate/new"
              className="right-col__new-certificate-btn"
            >
              <Button className={buttonStyles.standardBtn}>
                <AddIcon />
                New Certificate
              </Button>
            </Link>
          </div>
        </div>

        <div className="table">
          <CertificateTable />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
