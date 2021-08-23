import { Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import CertifyCheckbox from "../components/core/CertifyCheckbox";
import CertifyTextField from "../components/core/CertifyTextField";
import { useButtonStyles } from "../data/styles";

import "./Signin.css";

import LoginImage from "../assets/login.svg";
import logo from "../assets/logo/logo.png";

const Signin = () => {
  const buttonStyles = useButtonStyles();

  return (
    <div className="signin">
      <div className="signin__content">
        <div className="left-col">
          <div className="left-col__content">
            <div className="logo">
              <img src={logo} alt="Logo" width={32} />
              <h2>Certify</h2>
            </div>
            <h1>Welcome</h1>
            <img src={LoginImage} alt="Login" />
          </div>
        </div>

        <div className="right-col">
          <h1>Sign in</h1>
          <div className="form-container">
            <Formik
              initialValues={{
                username: "",
                password: "",
                rememberMe: true,
              }}
              onSubmit={() => {}}
            >
              <Form>
                <div className="form">
                  <Field
                    label="Username"
                    name="username"
                    component={CertifyTextField}
                  />
                  <Field
                    label="Password"
                    name="password"
                    component={CertifyTextField}
                  />
                  <div className="special-actions">
                    <Field
                      label="Remember me"
                      name="rememberMe"
                      component={CertifyCheckbox}
                    />
                    <Link to="">
                      <Typography className="forgot-password">
                        Forgot password?
                      </Typography>
                    </Link>
                  </div>
                  <Button className={buttonStyles.standardBtn}>Login</Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
