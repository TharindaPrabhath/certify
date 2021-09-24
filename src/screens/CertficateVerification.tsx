import React, { useState } from "react";

import "./CertificateVerification.css";

import logo from "../assets/logo/logo.png";
import { Button, TextField } from "@material-ui/core";
import { useButtonStyles } from "../data/styles";
import { validateCertificate } from "../utils/requestHelper";
import { Redirect } from "react-router";

const CertificateVerification = () => {
  const buttonStyles = useButtonStyles();
  const [verified, setVerified] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const handleValidate = async () => {
    validateCertificate(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setVerified(true);
        } else setVerified(false);
      })
      .catch((err) => {
        setVerified(false);
        console.error(err);
      });
  };
  console.log(verified);

  if (verified) return <Redirect push to={`/certificate/view?id=${id}`} />;

  return (
    <div className="certificate-verification">
      <div className="certificate-verification__content">
        <label className="logo">
          <img src={logo} alt="Logo" width={32} />
          <h2>Certify</h2>
        </label>
        <h2>Verify a certificate</h2>

        <div className="form">
          <TextField
            label="Enter Certificate ID"
            name="certificateId"
            helperText="The Certificate ID can be found at the bottom of each certificate."
            value={id}
            onChange={(e) => setId(e.target.value)}
            //error={!!id}
          />
          <Button
            className={buttonStyles.standardBtn}
            onClick={(e) => {
              handleValidate();
            }}
          >
            Validate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
