import React, { ReactNode, useEffect } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  MenuList,
  Radio,
  Select,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  useFormik,
} from "formik";
import { Link } from "react-router-dom";
import { useButtonStyles, useTextfieldStyles } from "../data/styles";

import "./Page.css";
import colors from "../data/colors";
import { useState } from "react";
import * as yup from "yup";
import UserDto from "../types/models/UserDto";
import { toUserDtos } from "../utils/mapper";
import { useSnackbar } from "notistack";
import { addCertificate, fetchUsers } from "../utils/requestHelper";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

import { object, mixed, string, boolean } from "yup";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const NewCertificate = () => {
  const [memberCertificate, setMemberCertificate] = useState(true);
  const certificateTypes = ["Participation", "Content Creation", "Other"];
  const thirdPartRoles = ["Student", "Graduate", "Undergraduate", "Other"];
  const textfieldStyles = useTextfieldStyles();
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const initialValues = {
    memberCertificate: "true",
    member: {
      reciever: "",
      defaultEmail: true,
      customEmail: "",
    },

    thirdPartyUser: {
      firstName: "",
      lastName: "",
      email: "",
      emailVerified: false,
      phone: "",
      role: "",
      birthday: "",
      address: "",
      description: "",
    },

    certificate: {
      type: "",
      reason: "",
      remarks: "",
    },
  };

  const step1ValidationSchema = object({
    memberCertificate: boolean()
      .required("Target group is required")
      .default(true),
  });

  const step2ValidationSchema = object({
    member: object().when("memberCertificate", {
      is: "true",
      then: object({
        reciever: string().required("Reciever is required"),
        defaultEmail: boolean().required(),
        customEmail: string().when("defaultEmail", {
          is: "false",
          then: string().required(),
        }),
      }),
    }),

    thirdPartyUser: object().when("memberCertificate", {
      is: "false",
      then: object({
        firstName: string().required("First Name is required"),
        lastName: string().required("Last Name is required"),
        email: string().email().required("Email is required"),
        phone: string().required("Phone is required"),
        role: string().required("Role is required"),
      }),
    }),
  });

  const step3ValidationSchema = object({
    certificate: object({
      type: string().required("Certificate type is required"),
      reason: string().required("Reason is required"),
      remarks: string().required("Remarks are required"),
    }),
  });

  const validationSchema = object({
    member: object({
      reciever: mixed().when("memberCertificate", {
        is: true,
        then: string().required("Reciever is required"),
        otherwise: string().optional(),
      }),
      customEmail: mixed().when("defaultEmail", {
        is: true,
        then: string().email().required("Custom email is required"),
        otherwise: string().email().optional(),
      }),
    }),

    thirdPartyUser: object({
      firstName: mixed().when("memberCertificate", {
        is: false,
        then: string().required("First Name is required"),
        otherwise: string().optional(),
      }),
      lastName: mixed().when("memberCertificate", {
        is: false,
        then: string().required("Last Name is required"),
        otherwise: string().optional(),
      }),
      email: mixed().when("memberCertificate", {
        is: false,
        then: string().email().required("Email is required"),
        otherwise: string().email().optional(),
      }),
      phone: mixed().when("memberCertificate", {
        is: false,
        then: string().required("Phone is required"),
        otherwise: string().optional(),
      }),
      role: mixed().when("memberCertificate", {
        is: false,
        then: string().required("Role is required"),
        otherwise: string().optional(),
      }),
    }),

    certificate: object({
      type: string().required("Certificate type is required"),
      reason: string().required("Reason is required"),
      remarks: string().required("Remarks are required"),
    }),
  });

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

          <div>
            <MyStepper
              initialValues={initialValues}
              onSubmit={async (values) => {
                setLoading(true);
                await sleep(2000);
                setLoading(false);
                console.log(values);
              }}
            >
              <MyStep label="Step 1" validationSchema={step1ValidationSchema}>
                <MyBox>
                  <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                    Who does recieve this certificate ?
                  </p>
                  <div role="group">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Field
                        name="memberCertificate"
                        value="true"
                        type="radio"
                        as={Radio}
                        color="primary"
                        onClick={() => setMemberCertificate(true)}
                      />
                      <p>Member of Certify</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Field
                        name="memberCertificate"
                        value="false"
                        type="radio"
                        as={Radio}
                        color="primary"
                        onClick={() => setMemberCertificate(false)}
                      />
                      <p>Third party person</p>
                    </div>
                  </div>
                </MyBox>
              </MyStep>

              <MyStep label="Step 2" validationSchema={step2ValidationSchema}>
                {memberCertificate ? (
                  <MyBox>
                    <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                      Create the reciever
                    </p>
                    <Field
                      name="member.reciever"
                      as={TextField}
                      label="Reciever"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Field
                        name="member.defaultEmail"
                        as={Switch}
                        color="primary"
                      />
                      <p>Send to reciever's default email</p>
                    </div>
                    <Field
                      name="member.customEmail"
                      as={TextField}
                      label="Custom Email"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                  </MyBox>
                ) : (
                  <MyBox>
                    <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                      Create the third party reciever
                    </p>
                    <Field
                      name="thirdPartyUser.firstName"
                      as={TextField}
                      label="First Name"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.lastName"
                      as={TextField}
                      label="Last Name"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.phone"
                      as={TextField}
                      label="Phone"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.role"
                      label="Role"
                      component={CertifySelect}
                      options={thirdPartRoles}
                    />
                    <Field
                      label="Birthday"
                      name="thirdPartyUser.birthday"
                      component={CertifyDatePicker}
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.address"
                      as={TextField}
                      multiline={true}
                      rows={5}
                      label="Address"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.description"
                      as={TextField}
                      multiline={true}
                      rows={5}
                      label="Description"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                  </MyBox>
                )}
              </MyStep>

              <MyStep label="Step 3" validationSchema={step3ValidationSchema}>
                <MyBox>
                  <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                    Create the certificate
                  </p>
                  <Field
                    name="certificate.type"
                    label="Type"
                    component={CertifySelect}
                    options={certificateTypes}
                  />
                  <Field
                    name="certificate.reason"
                    as={TextField}
                    multiline={true}
                    rows={5}
                    label="Reason"
                    variant="outlined"
                    color="primary"
                    InputProps={{ className: textfieldStyles.input }}
                  />
                  <Field
                    name="certificate.remarks"
                    as={TextField}
                    multiline={true}
                    rows={5}
                    label="Remarks"
                    variant="outlined"
                    color="primary"
                    InputProps={{ className: textfieldStyles.input }}
                  />
                </MyBox>
              </MyStep>
            </MyStepper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCertificate;

const MyStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
  const buttonStyles = useButtonStyles();
  const childrenArr = React.Children.toArray(
    children
  ) as React.ReactElement<MyStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArr[step];
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  function isLastStep() {
    return step === childrenArr.length - 1;
  }

  // console.log(currentChild);
  console.log(currentChild.props.validationSchema);

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={(values, helpers) => {
        if (isLastStep()) {
          console.log("here");
          props.onSubmit(values, helpers);
        } else {
          setStep(step + 1);
        }
      }}
    >
      <Form autoComplete="off">
        <Stepper activeStep={step} style={{ backgroundColor: "transparent" }}>
          {childrenArr.map((child, index) => {
            return (
              <Step key={index}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {currentChild}
        <div style={{ display: "flex", gap: "0.5em", marginTop: "1em" }}>
          {step !== 0 ? (
            <Button
              className={buttonStyles.standardBtn}
              disabled={loading}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          ) : null}

          <Button
            className={buttonStyles.standardBtn}
            startIcon={
              loading ? (
                <CircularProgress size="1rem" color="secondary" />
              ) : null
            }
            disabled={loading}
            type="submit"
          >
            {isLastStep() ? (loading ? "Submitting" : "Submit") : "Next"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

interface MyStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

const MyStep = ({ children }: MyStepProps) => {
  return <>{children}</>;
};

const MyBox: React.FC<ReactNode> = ({ children }) => {
  return (
    <Box
      bgcolor={colors.secondaryBgClr}
      padding={3}
      display="flex"
      flexDirection="column"
      borderRadius="1em"
      gridGap={10}
    >
      {children}
    </Box>
  );
};
