import React, { useState } from "react";

import "./CertificateVerification.css";

import logo from "../assets/logo/logo.png";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useButtonStyles } from "../data/styles";
import { validateCertificate } from "../utils/requestHelper";
import { Redirect } from "react-router";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "../redux/store";
import InvalidCertificate from "./InvalidCertificate";

const CertificateVerification = () => {
  const buttonStyles = useButtonStyles();
  const [verified, setVerified] = useState<boolean>(false);
  const [invalidCertificate, setInvalidCertificate] = useState(false);
  const [id, setId] = useState<string>("");
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  const handleValidate = async () => {
    setLoading(true);
    validateCertificate(id)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          setVerified(true);
        } else {
          setVerified(false);
          setInvalidCertificate(true);
        }
      })
      .catch((err) => {
        setVerified(false);
        setInvalidCertificate(true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  if (verified) return <Redirect push to={`/certificate/view?id=${id}`} />;

  return (
    <div className="certificate-verification">
      {invalidCertificate ? (
        <InvalidCertificate invalidCertificateId={id} />
      ) : (
        <div className="certificate-verification__content">
          <label className="logo">
            <img src={logo} alt="Logo" width={32} />
            <h2>Certify</h2>
          </label>
          <h2>Verify a certificate</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleValidate();
            }}
          >
            <div className="form">
              <TextField
                label="Enter Certificate ID"
                name="certificateId"
                helperText="The Certificate ID can be found at the bottom of each certificate."
                value={id}
                required
                autoComplete="off"
                onChange={(e) => setId(e.target.value)}
              />
              <Button
                className={buttonStyles.standardBtn}
                type="submit"
                startIcon={
                  loading ? (
                    <CircularProgress size="1rem" color="secondary" />
                  ) : null
                }
              >
                {loading ? "Validating" : "Validate"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;
