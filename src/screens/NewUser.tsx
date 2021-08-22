import React from "react";

import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useButtonStyles } from "../data/styles";

import "./NewUser.css";
import CertifyTextField from "../components/core/CertifyTextField";
import CertifySwitch from "../components/core/CertifySwitch";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";
import { stringify } from "querystring";
import colors from "../data/colors";

const NewUser = () => {
  const buttonStyles = useButtonStyles();

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email("Invalid Email").required(),
    phone: yup.number(),
    role: yup.string(),
    address: yup.string(),
    description: yup.string(),
    emailVerified: yup.boolean(),
    birthday: yup.date(),
  });

  return (
    <div className="new-user">
      <div className="new-user__content">
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
            validationSchema={schema}
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
            onSubmit={(values) => {
              alert(stringify(values));
            }}
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
