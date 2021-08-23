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
import validationConditions from "../data/validation";

import "./Page.css";

const EditUser = () => {
  const buttonStyles = useButtonStyles();

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
            validationSchema={validationConditions.userValidationSchema}
            initialValues={{
              firstName: "",
              lastName: "",
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
                  name="firstName"
                  component={CertifyTextField}
                  required
                ></Field>
                <Field
                  label="Last Name"
                  name="lastName"
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
