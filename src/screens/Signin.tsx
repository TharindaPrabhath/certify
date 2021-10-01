import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useButtonStyles, useTextfieldStyles } from "../data/styles";

import "./Signin.css";

import LoginImage from "../assets/login.svg";
import logo from "../assets/logo/logo.png";

import useAuth from "../utils/useAuth";

import * as yup from "yup";
import useTokenService from "../utils/useTokenService";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

const Signin = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const buttonStyles = useButtonStyles();
  const { signin } = useAuth();
  const styles = useTextfieldStyles();
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  const userValidationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    setAccessToken,
    setRefreshToken,
    setAccessTokenExpiresAt,
    setRefreshTokenExpiresAt,
  } = useTokenService();
  const { setAdmin } = bindActionCreators(actionCreators, dispatch);

  const formik = useFormik({
    //enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
      //rememberMe: true,
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      signin(values)
        .then((res) => {
          if (res.status === 200) {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setAccessTokenExpiresAt(res.data.accessTokenExpiresAt);
            setRefreshTokenExpiresAt(res.data.refreshTokenExpiresAt);
            setAdmin({ username: values.username });
            setSuccess(true);
          } else setSuccess(false);
        })
        .catch((err) => {
          setSuccess(false);
          console.error(err);
        })
        .finally(() => setLoading(false));
    },
  });

  if (success) return <Redirect to="/dashboard" />;

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
            <form onSubmit={formik.handleSubmit}>
              <div className="form">
                <TextField
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  autoFocus
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={!!formik.errors.username}
                  helperText={formik.errors.username}
                  variant="outlined"
                  required={true}
                  InputProps={{ className: styles.input }}
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                  variant="outlined"
                  required={true}
                  InputProps={{ className: styles.input }}
                />

                {/* <div className="special-actions">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox color="primary" />
                    <Typography style={{ color: colors.secondaryFontClr }}>
                      Remember me
                    </Typography>
                  </div>

                  <Link to="">
                    <Typography className="forgot-password">
                      Forgot password?
                    </Typography>
                  </Link>
                </div> */}
                <Button
                  className={buttonStyles.standardBtn}
                  type="submit"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size="1rem" color="secondary" />
                    ) : null
                  }
                >
                  {loading ? "Submitting" : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
