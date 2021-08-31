import React from "react";

import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useButtonStyles } from "../data/styles";

import "./Page.css";
import CertifyTextField from "../components/core/CertifyTextField";
import CertifySelect from "../components/core/CertifySelect";
import colors from "../data/colors";
import { useState } from "react";
import CertifySwitch from "../components/core/CertifySwitch";
import axios from "../utils/axios";
import requests from "../data/requests";
import * as yup from "yup";

const NewCertificate = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const buttonStyles = useButtonStyles();

  const handleChange = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  console.log(toggle);

  const initialValues = {
    reciever: "",
    type: "",
    defaultEmail: true,
    customEmail: "",
    reason: "",
    remarks: "",
  };

  const certificateValidationSchema = yup.object().shape({
    reciever: yup.string().required("Reciever is required"),
    type: yup.string().required("Type is required"),
    customEmail: yup.string().email("Invalid Email"),
    defaultEmail: yup.boolean(),
    reason: yup.string().required("Reason is required"),
    remarks: yup.string().required("Remarks are required"),
  });

  const submit = async (values: typeof initialValues) => {
    const res = await axios.post(requests.postNewCertificate, values);
    console.log(res);
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="top">
          <h2 className="">Create a new Certificate</h2>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/certificate">Certificate</Link>
            <Typography style={{ color: colors.dimmedClr }}>
              New Certificate
            </Typography>
          </Breadcrumbs>
        </div>

        <div className="form-container">
          <Formik
            validationSchema={certificateValidationSchema}
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log("data: ", values);
              submit(values);
            }}
          >
            <Form>
              <div className="left-col">
                <Field
                  label="Reciever"
                  name="reciever"
                  options={["Tharinda P", "Lasana", "Lishitha", "Chamath"]}
                  component={CertifySelect}
                  required
                ></Field>
                <Field
                  label="Type"
                  name="type"
                  options={[
                    "Content Contribution",
                    "Platform Development",
                    "Teaching",
                    "Other",
                  ]}
                  component={CertifySelect}
                  required
                ></Field>

                <div className="email-verified">
                  <Field
                    name="defaultEmail"
                    checked={toggle}
                    onChange={handleChange}
                    component={CertifySwitch}
                  />
                  {/* <Switch
                    color="primary"
                    checked={defaultEmail}
                    onChange={(e) => {
                      setDefaultEmail(e.target.checked);
                    }}
                  ></Switch> */}

                  <div className="right-col">
                    <label>Send to reciever's default email</label>
                    <p>
                      Disabling this will send the issued certificate to the
                      custom email
                    </p>
                  </div>
                </div>
                {!toggle && (
                  <Field
                    label="Custom Email"
                    name="customEmail"
                    component={CertifyTextField}
                    required
                  />
                )}
              </div>

              <div className="right-col">
                <Field
                  label="Reason"
                  name="reason"
                  component={CertifyTextField}
                  textArea
                  required
                ></Field>

                <Field
                  label="Remarks"
                  name="remarks"
                  component={CertifyTextField}
                  textArea
                  required
                ></Field>

                <div className="submit-bt">
                  <Button className={buttonStyles.standardBtn} type="submit">
                    Create Certificate
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

export default NewCertificate;
