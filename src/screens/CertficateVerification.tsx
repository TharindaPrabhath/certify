import React from "react";

import "./CertificateVerification.css";

import logo from "../assets/logo/logo.png";
import { Field, Form, Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { useButtonStyles } from "../data/styles";

const CertificateVerification = () => {
  const buttonStyles = useButtonStyles();

  return (
    <div className="certificate-verification">
      <div className="certificate-verification__content">
        <label className="logo">
          <img src={logo} alt="Logo" width={32} />
          <h2>Certify</h2>
        </label>
        <h2>Verify a certificate</h2>
        <Formik initialValues={{ certificateId: "" }} onSubmit={() => {}}>
          <Form>
            <div className="form">
              <Field
                label="Enter Certificate ID"
                name="certificateId"
                helperText="The Certificate ID can be found at the bottom of each certificate."
                component={TextField}
              />
              <Button className={buttonStyles.standardBtn}>Validate</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CertificateVerification;
