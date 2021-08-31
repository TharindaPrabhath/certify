import React from "react";

import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useButtonStyles } from "../data/styles";

import "./Page.css";
import CertifyTextField from "../components/core/CertifyTextField";
import CertifySwitch from "../components/core/CertifySwitch";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";
import colors from "../data/colors";
import axios from "../utils/axios";
import requests from "../data/requests";
import * as yup from "yup";

const NewUser = () => {
  const buttonStyles = useButtonStyles();

  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    emailVerified: false,
    phone: "",
    birthday: "",
    role: "",
    address: "",
    description: "",
  };

  const userValidationSchema = yup.object().shape({
    fName: yup.string().required("First Name is required"),
    lName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    phone: yup.number(),
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

  const submit = async (values: typeof initialValues) => {
    const res = await axios.post(requests.postNewUser, values);
    console.log(res);
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="top">
          <h2 className="">Create a new User</h2>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user">User</Link>
            <Typography style={{ color: colors.dimmedClr }}>
              New User
            </Typography>
          </Breadcrumbs>
        </div>

        <div className="form-container">
          <Formik
            validationSchema={userValidationSchema}
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values);
              submit(values);
            }}
          >
            <Form>
              <div className="left-col">
                <Field
                  label="First Name"
                  name="fName"
                  component={CertifyTextField}
                  required
                ></Field>
                <Field
                  label="Last Name"
                  name="lName"
                  component={CertifyTextField}
                  required
                ></Field>
                <Field
                  label="Email"
                  name="email"
                  component={CertifyTextField}
                  required
                ></Field>
                <div className="email-verified">
                  <Field name="emailVerified" component={CertifySwitch} />

                  <div className="right-col">
                    <label>Email verified</label>
                    <p>
                      Disabling this will automatically send the user a
                      verification email
                    </p>
                  </div>
                </div>
                <Field
                  label="Phone"
                  name="phone"
                  validate={validatePhone}
                  component={CertifyTextField}
                ></Field>
              </div>

              <div className="right-col">
                <Field
                  label="Birthday"
                  name="birthday"
                  component={CertifyDatePicker}
                ></Field>
                <Field
                  label="Role"
                  name="role"
                  component={CertifySelect}
                  options={["Student", "Undergraduate", "Graduate"]}
                ></Field>
                <Field
                  label="Address"
                  name="address"
                  component={CertifyTextField}
                ></Field>
                <Field
                  label="Description"
                  name="description"
                  textArea
                  component={CertifyTextField}
                ></Field>

                <div className="submit-btn">
                  <Button className={buttonStyles.standardBtn} type="submit">
                    Create User
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
