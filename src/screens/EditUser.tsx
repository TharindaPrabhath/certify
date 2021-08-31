import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";
import CertifySwitch from "../components/core/CertifySwitch";
import CertifyTextField from "../components/core/CertifyTextField";
import colors from "../data/colors";
import { useButtonStyles } from "../data/styles";
import * as yup from "yup";

import "./Page.css";

const EditUser = () => {
  const buttonStyles = useButtonStyles();

  const userValidationSchema = yup.object().shape({
    fName: yup.string().required("First Name is required"),
    lName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    phone: yup.number().min(9).max(10),
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
          <Formik
            validationSchema={userValidationSchema}
            initialValues={{
              fName: "",
              lName: "",
              email: "",
              emailVerified: false,
              phone: "",
              birthday: "",
              role: "",
              address: "",
              description: "",
            }}
            onSubmit={(values) => {}}
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
                  name="decription"
                  component={CertifyTextField}
                  textArea
                ></Field>

                <div className="submit-btn">
                  <Button className={buttonStyles.standardBtn} type="submit">
                    Update User
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

export default EditUser;
