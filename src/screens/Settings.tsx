import { Breadcrumbs, Button, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import colors from "../data/colors";
import * as yup from "yup";

import "./Settings.css";
import { useButtonStyles, useTextfieldStyles } from "../data/styles";
import { useEffect } from "react";
import { changePassword } from "../utils/requestHelper";
import useLocalStorage from "../utils/useLocalStorage";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current Password is required")
    .min(6, "Invalid password."),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Too short - Minimum 6 characters are needed")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  confirmPassword: yup.string().required("Confirm Password required"),
});

const Settings = () => {
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );
  const styles = useTextfieldStyles();
  const buttonStyles = useButtonStyles();
  const { getAdmin } = useLocalStorage();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values) => {
      if (values.newPassword !== values.confirmPassword)
        formik.setErrors({ confirmPassword: "Invalid confirm password" });
      else if (values.newPassword === values.currentPassword)
        formik.setErrors({ newPassword: "New and current passwords are same" });
      else {
        setLoading(true);
        changePassword(
          values.currentPassword,
          values.newPassword,
          parseInt(getAdmin().id!)
        )
          .then((res) => {
            if (res.status === 200) formik.resetForm();
            else console.error("An error occured");
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setLoading(false));
      }
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="settings-page">
      <div className="settings-page__content">
        <div className="top">
          <div className="left-col">
            <h2>Settings</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Typography style={{ color: colors.dimmedClr }}>Users</Typography>
            </Breadcrumbs>
          </div>
        </div>

        <div className="body">
          <h3>Change Password</h3>
          <div className="settings__form-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="form">
                <TextField
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  label="Current Password"
                  autoFocus
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  error={!!formik.errors.currentPassword}
                  helperText={formik.errors.currentPassword}
                  variant="outlined"
                  required={true}
                  InputProps={{ className: styles.input }}
                />
                <TextField
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  label="New Password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={!!formik.errors.newPassword}
                  helperText={formik.errors.newPassword}
                  variant="outlined"
                  required={true}
                  InputProps={{ className: styles.input }}
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={!!formik.errors.confirmPassword}
                  helperText={formik.errors.confirmPassword}
                  variant="outlined"
                  required={true}
                  InputProps={{ className: styles.input }}
                />
              </div>
              <div className="submit-btn">
                <Button
                  className={buttonStyles.standardBtn}
                  type="submit"
                  disabled={loading}
                >
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
