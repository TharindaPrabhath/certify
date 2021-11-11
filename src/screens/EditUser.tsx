import {
  Breadcrumbs,
  Button,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import colors from "../data/colors";
import { useButtonStyles, useTextfieldStyles } from "../data/styles";
import * as yup from "yup";

import "./Page.css";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";
import UserDto from "../types/models/UserDto";
import { getUserDto } from "../utils/mapper";
import { fetchUser, updateUser } from "../utils/requestHelper";
import { useSnackbar } from "notistack";
import useLocalStorage from "../utils/useLocalStorage";

const EditUser = () => {
  const [user, setUser] = useState<UserDto>({
    id: 0,
    fname: "",
    lname: "",
    email: "",
    address: "",
    role: "",
    member: false,
    description: "",
    admin: { id: 0, username: "" },
    emailVerified: false,
    certified: false,
    numCertificates: 0,
    phone: "",
    birthday: "",
    createdDate: "",
  });
  const styles = useTextfieldStyles();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(
    (state: ReducerType) => state.userReducer.currentUser
  );
  const { getAdmin } = useLocalStorage();

  useEffect(() => {
    fetchUser(currentUser?.id!)
      .then((res) => setUser(getUserDto(res.data)))
      .catch((err) => console.error(err));
  }, [currentUser?.id]);

  const buttonStyles = useButtonStyles();

  const userValidationSchema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    phone: yup.number().min(10, "Invalid Phone"),
    role: yup.string().required("Role is required"),
    address: yup.string(),
    description: yup.string(),
    emailVerified: yup.boolean(),
    birthday: yup.date(),
  });

  const validatePhone = (value: any) => {
    let error;
    if (!value) return (error = "Phone is required");
    else value.length !== 10 ? (error = "Invalid Phone") : (error = "");
    return error;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
      emailVerified: user?.emailVerified,
      phone: user?.phone,
      birthday: user?.birthday,
      role: user?.role,
      address: user?.address,
      description: user?.description,
    },
    onSubmit: (values) => {
      const res = updateUser(
        user.id,
        getUserDto(values),
        parseInt(getAdmin().id!)
      );
      res
        .then(() => {
          enqueueSnackbar(
            `Successfully updated the user ${user.fname} ${user.lname}`,
            {
              variant: "success",
            }
          );
        })
        .catch((err) => {
          enqueueSnackbar(
            `${err} .Could not update the user.Try again later.`,
            {
              variant: "error",
            }
          );
        });
    },
    validationSchema: userValidationSchema,
  });

  return (
    <div className="page">
      <div className="page__content">
        <div className="top">
          <h2 className="">Edit User</h2>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user">User</Link>
            <Typography style={{ color: colors.dimmedClr }}>
              Edit User
            </Typography>
          </Breadcrumbs>
        </div>

        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="left-col">
              <TextField
                id="fname"
                name="fname"
                type="text"
                label="First Name"
                value={formik.values.fname}
                onChange={formik.handleChange}
                error={!!formik.errors.fname}
                helperText={formik.errors.fname}
                variant="outlined"
                required={true}
                InputProps={{ className: styles.input }}
              />
              <TextField
                id="lname"
                name="lname"
                type="text"
                label="Last Name"
                value={formik.values.lname}
                onChange={formik.handleChange}
                error={!!formik.errors.lname}
                helperText={formik.errors.lname}
                variant="outlined"
                required={true}
                InputProps={{ className: styles.input }}
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                variant="outlined"
                required={true}
                InputProps={{ className: styles.input }}
              />

              <div className="email-verified">
                <Switch
                  color="primary"
                  name="emailVerified"
                  value={formik.values.emailVerified}
                  checked={formik.values.emailVerified}
                  onChange={formik.handleChange}
                />
                <div className="right-col">
                  <label>Email verified</label>
                  <p>
                    Disabling this will automatically send the user a
                    verification email
                  </p>
                </div>
              </div>
              <TextField
                id="phone"
                name="phone"
                type="text"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={!!formik.errors.phone}
                helperText={formik.errors.phone}
                variant="outlined"
                required={false}
                InputProps={{ className: styles.input }}
              />
            </div>

            <div className="right-col">
              <TextField
                id="birthday"
                name="birthday"
                type="date"
                label="Birthday"
                value={formik.values.birthday}
                onChange={formik.handleChange}
                variant="outlined"
                required={false}
                InputLabelProps={{
                  className: styles.input,
                  shrink: true,
                }}
              />
              <Select
                id="role"
                name="role"
                label="Role"
                color="primary"
                variant="outlined"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={!!formik.errors.role}
              >
                {["Student", "Undergraduate", "Graduate", "Unknown"].map(
                  (option, index) => {
                    return (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
              <TextField
                id="address"
                name="address"
                type="text"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={!!formik.errors.address}
                helperText={formik.errors.address}
                variant="outlined"
                required={false}
                InputProps={{ className: styles.input }}
                multiline={true}
                rows={5}
              />
              <TextField
                id="description"
                name="description"
                type="text"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                variant="outlined"
                required={false}
                InputProps={{ className: styles.input }}
                multiline={true}
                rows={5}
              />
              <div className="submit-btn">
                <Button className={buttonStyles.standardBtn} type="submit">
                  Update User
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
