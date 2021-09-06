import { Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import CertifyCheckbox from "../components/core/CertifyCheckbox";
import CertifyTextField from "../components/core/CertifyTextField";
import { useButtonStyles } from "../data/styles";

import "./Signin.css";

import LoginImage from "../assets/login.svg";
import logo from "../assets/logo/logo.png";
import axios from "axios";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { getAdminDto } from "../utils/mapper";
import axiosInstance from "../utils/axios";
import requests from "../data/requests";

const Signin = () => {
  const buttonStyles = useButtonStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { initAdmin, removeAdmin } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const initialValues = {
    username: "",
    password: "",
    //rememberMe: true,
  };

  const submit = (values: typeof initialValues) => {
    axios
      .post("http://localhost:8080/login", values)
      .then((res) => {
        if (res.status === 200) {
          history.push("dashboard");
          localStorage.setItem("token", res.data.token);

          axiosInstance.get("/admin/get/1").then((res) => {
            initAdmin(getAdminDto(res.data));
            //console.log(res);
            localStorage.setItem(
              "currentAdmin",
              getAdminDto(res.data).username
            );
          });
        }
      })
      .catch((err) => console.error(err));
  };

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
              initialValues={initialValues}
              onSubmit={(values) => submit(values)}
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
                  <Button className={buttonStyles.standardBtn} type="submit">
                    Login
                  </Button>
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
