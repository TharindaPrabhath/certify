import React, { ReactNode } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { Link } from "react-router-dom";
import { useButtonStyles, useTextfieldStyles } from "../data/styles";

import "./Page.css";
import colors from "../data/colors";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  addCertificate,
  addThirdPartyCertificate,
} from "../utils/requestHelper";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

import { object, string, boolean } from "yup";
import CertifyDatePicker from "../components/core/CertifyDatePicker";
import CertifySelect from "../components/core/CertifySelect";
import CertifyTextField from "../components/core/CertifyTextField";
import useLocalStorage from "../utils/useLocalStorage";

//const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const NewCertificate = () => {
  const certificateTypes = ["Participation", "Content Creation", "Other"];
  const { getAdmin } = useLocalStorage();

  //  based on auto complete trash
  const [reciever, setReciever] = useState("");
  //--------------------------------------------------

  const buttonStyles = useButtonStyles();
  const [newEvent, setNewEvent] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const textfieldStyles = useTextfieldStyles();
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const initialValues = {
    receiver: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },

    certificate: {
      type: "",
      reason: "",
      remarks: "",
    },

    event: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      thumbnailUrl: "",
    },
  };

  const step1ValidationSchema = object({
    event: object({
      name: string().required("Required"),
      description: string().optional(),
      startDate: string().optional(),
      endDate: string().optional(),
      thumbnailUrl: string().optional(),
    }),
  });

  const step2ValidationSchema = object({
    receiver: object({
      firstName: string().required("Required"),
      lastName: string().required("Required"),
      email: string().email("Invalid email").required("Required"),
      phone: string().min(9, "Invalid phone").optional(),
    }),
  });

  const step3ValidationSchema = object({
    certificate: object({
      type: string().required("Required"),
      reason: string().required("Required"),
      remarks: string().optional(),
    }),
  });

  const handleSubmit = async (values: any) => {
    const user = getAdmin();
    const certificate: any = {
      receiver: {
        firstName: values.receiver.firstName,
        lastName: values.receiver.lastName,
        email: values.receiver.email,
        phone: values.receiver.phone,
      },
      certificate: {
        type: values.certificate.type,
        reason: values.certificate.reason,
        remarks: values.certificate.remarks,
      },
      event: {
        id: "",
        name: values.event.name,
        description: values.event.description,
        startDate: values.event.startDate,
        endDate: values.event.endDate,
        thumbnailUrl: values.event.thumbnailUrl,
      },
      user: {
        id: user.id,
        email: "",
      },
    };

    if (values.memberCertificate === "true") {
      // const res = addCertificate(certificate);
      // res
      //   .then(() => {
      //     enqueueSnackbar(
      //       `Successfully issued the certificate to ${recieverId}`,
      //       {
      //         variant: "success",
      //       }
      //     );
      //   })
      //   .catch((err) => {
      //     enqueueSnackbar(
      //       `${err} .Could not issue the certificate.Try again later.`,
      //       {
      //         variant: "error",
      //       }
      //     );
      //   })
      //   .finally(() => setLoading(false));
    } else {
      // addThirdPartyCertificate(thirdPartyCertificate)
      //   .then((res) => {
      //     enqueueSnackbar(
      //       `Successfully issued the third party certificate to ${recieverId}`,
      //       {
      //         variant: "success",
      //       }
      //     );
      //   })
      //   .catch((err) => {
      //     enqueueSnackbar(
      //       `${err} .Could not issue the third party certificate.Try again later.`,
      //       {
      //         variant: "error",
      //       }
      //     );
      //   })
      //   .finally(() => setLoading(false));
    }
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

          <div>
            <MyStepper
              initialValues={initialValues}
              onSubmit={async (values) => {
                setLoading(true);
                //await sleep(2000);
                handleSubmit(values);
              }}
            >
              <MyStep label="Event" validationSchema={step1ValidationSchema}>
                <MyBox>
                  <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                    Enter the details about the related event
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                    }}
                  >
                    {newEvent ? (
                      <>
                        <Field
                          label="Name"
                          name="event.name"
                          component={CertifyTextField}
                          required
                        ></Field>
                        <Field
                          label="Thumbnail URL"
                          name="event.thumbnailUrl"
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
                        <h4 style={{ textAlign: "center" }}>or</h4>
                        <Button
                          className={buttonStyles.standardBtn}
                          onClick={() => setNewEvent(false)}
                        >
                          Select an existing event
                        </Button>
                      </>
                    ) : (
                      <>
                        <Field
                          label="Select Event"
                          name="event.name"
                          component={CertifySelect}
                          options={["Event 1", "Event 2", "Event 3"]}
                          required
                        ></Field>
                        <h4 style={{ textAlign: "center" }}>or</h4>
                        <Button
                          className={buttonStyles.standardBtn}
                          onClick={() => setNewEvent(true)}
                        >
                          Create a new Event
                        </Button>
                      </>
                    )}
                  </div>
                </MyBox>
              </MyStep>

              <MyStep label="Receiver" validationSchema={step2ValidationSchema}>
                <MyBox>
                  <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                    Enter the details about the receiver of the certificate
                  </p>
                  <Field
                    name="receiver.firstName"
                    component={CertifyTextField}
                    label="First Name"
                    variant="outlined"
                    color="primary"
                    InputProps={{ className: textfieldStyles.input }}
                  />
                  <Field
                    name="receiver.lastName"
                    component={CertifyTextField}
                    label="Last Name"
                    variant="outlined"
                    color="primary"
                    InputProps={{ className: textfieldStyles.input }}
                  />
                  <Field
                    name="receiver.email"
                    component={CertifyTextField}
                    label="Email"
                    variant="outlined"
                    color="primary"
                    InputProps={{ className: textfieldStyles.input }}
                  />
                  <Field
                    name="receiver.phone"
                    component={CertifyTextField}
                    label="Phone"
                    variant="outlined"
                    color="primary"
                    InputProps={{ className: textfieldStyles.input }}
                  />
                </MyBox>
              </MyStep>

              <MyStep
                label="Certificate"
                validationSchema={step3ValidationSchema}
              >
                <MyBox>
                  <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                    Enter the details about the certificate
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

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={(values, helpers) => {
        if (isLastStep()) {
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
