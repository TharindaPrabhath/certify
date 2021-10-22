import {
  Breadcrumbs,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import CertifyTextField from "../components/core/CertifyTextField";
import colors from "../data/colors";
import { useButtonStyles } from "../data/styles";
import { date, object, string } from "yup";

import "./NewCertificateBulk.css";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

const validationSchema = object().shape({
  event: object({
    name: string().required("Required"),
    description: string().optional(),
    imageUrl: string().optional(),
    startDate: date().optional(),
    endDate: date().optional(),
  }),
  certificate: object({
    type: string().required("Required"),
    reason: string().required("Required"),
    remarks: string().required("Required"),
  }),
});

const initialValues = {
  event: {
    name: "",
    description: "",
    imageUrl: "",
    startDate: null,
    endDate: null,
  },
  certificate: {
    type: "",
    reason: "",
    remarks: "",
  },
};

const NewCertificateBulk = () => {
  const buttonStyles = useButtonStyles();
  const certificateTypes = ["Participation", "Content Creation", "Other"];
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  const submit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div className="new-certificate-bulk">
      <div className="new-certificate-bulk__content">
        <div className="top">
          <div className="left-col">
            <h2>Certificate Bulk</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/certificate">Certificates</Link>
              <Typography style={{ color: colors.dimmedClr }}>
                Certificate Bulk
              </Typography>
            </Breadcrumbs>
          </div>
        </div>

        <div className="bottom">
          <div className="content__section">
            <div className="section__content">
              <h3 className="section__content__topic">File</h3>
              <p>Import your .csv file here</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField variant="outlined" fullWidth disabled />
                <Button className={buttonStyles.standardBtn}>Import</Button>
              </div>
            </div>
          </div>

          <div className="new-certificate-bulk-group">
            <div className="new-certificate-bulk-group__left-col">
              <div className="content__section">
                <div className="section__content">
                  <h3 className="section__content__topic">File</h3>
                  <p>Import your .csv file here</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextField variant="outlined" fullWidth disabled />
                    <Button className={buttonStyles.standardBtn}>Import</Button>
                  </div>
                </div>
              </div>
            </div>

            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={submit}
            >
              <Form>
                <div className="new-certificate-bulk-group__right-col">
                  <div className="content__section">
                    <div className="section__content">
                      <h3 className="section__content__topic">Event</h3>
                      <p>Enter the details about this event</p>
                      <Field
                        label="Name"
                        name="event.name"
                        autoFocus
                        component={CertifyTextField}
                        required
                      ></Field>
                      <Field
                        label="Thumbnail URL"
                        name="event.imageUrl"
                        component={CertifyTextField}
                      ></Field>
                      <Field
                        label="Description"
                        name="event.description"
                        component={CertifyTextField}
                        textArea={true}
                      ></Field>
                      <Field
                        label="Start Date"
                        name="event.startDate"
                        component={CertifyDatePicker}
                      ></Field>
                      <Field
                        label="End Date"
                        name="event.endDate"
                        component={CertifyDatePicker}
                      ></Field>
                    </div>
                  </div>

                  <div className="content__section">
                    <div className="section__content">
                      <h3 className="section__content__topic">Certificate</h3>
                      <p>Enter the details about the certiicate</p>
                      <Field
                        label="Type"
                        name="certificate.type"
                        component={CertifySelect}
                        options={certificateTypes}
                        required
                      ></Field>
                      <Field
                        label="Reason"
                        name="certificate.reason"
                        component={CertifyTextField}
                        textArea={true}
                        required
                      ></Field>
                      <Field
                        label="Remarks"
                        name="certificate.remarks"
                        component={CertifyTextField}
                        textArea={true}
                        required
                      ></Field>
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
                        {loading ? "Submitting" : "Submit"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCertificateBulk;
