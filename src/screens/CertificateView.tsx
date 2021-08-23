import { Button } from "@material-ui/core";
import React from "react";
import Certificate from "../components/Certificate";

import "./CertificateView.css";

import GetAppIcon from "@material-ui/icons/GetApp";
import { useButtonStyles } from "../data/styles";

const CertificateView = () => {
  const buttonStyles = useButtonStyles();
  return (
    <div className="certificate-view">
      <div className="certificate-view__content">
        <div className="certificate-container">
          <Certificate />
        </div>
        <div className="actions-container">
          <div className="left-col">
            <Button className={buttonStyles.standardBtn}>
              <GetAppIcon />
              Download
            </Button>
          </div>

          <div className="right-col"></div>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
