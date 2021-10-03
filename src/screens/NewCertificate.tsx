import React, { ReactNode } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Radio,
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
  fetchSuggestionUsers,
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
import CertifyCheckbox from "../components/core/CertifyCheckbox";
import { Autocomplete } from "@material-ui/lab";
import useLocalStorage from "../utils/useLocalStorage";

//const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const NewCertificate = () => {
  const [memberCertificate, setMemberCertificate] = useState(true);
  const [memberDefaultEmail, setMemeberDefaultEmail] = useState(true);
  const certificateTypes = ["Participation", "Content Creation", "Other"];
  const thirdPartRoles = ["Student", "Graduate", "Undergraduate", "Other"];
  const [suggestions, setSuggestions] = useState<any[] | undefined[]>([]);
  const { getAdmin } = useLocalStorage();

  //  based on auto complete trash
  const [reciever, setReciever] = useState("");
  const [recieverId, setRecieverId] = useState(0);
  const [inputValue, setInputValue] = useState("");
  //--------------------------------------------------

  const { enqueueSnackbar } = useSnackbar();
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
        defaultEmail: boolean().required(),
        customEmail: string().when("member.defaultEmail", {
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
        email: string().email("Invalid email").required("Email is required"),
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

  // const validationSchema = object({
  //   member: object({
  //     reciever: mixed().when("memberCertificate", {
  //       is: true,
  //       then: string().required("Reciever is required"),
  //       otherwise: string().optional(),
  //     }),
  //     customEmail: mixed().when("defaultEmail", {
  //       is: false,
  //       then: string()
  //         .email("Invalid email")
  //         .required("Custom email is required"),
  //       otherwise: string().email().optional(),
  //     }),
  //   }),

  //   thirdPartyUser: object({
  //     firstName: mixed().when("memberCertificate", {
  //       is: false,
  //       then: string().required("First Name is required"),
  //       otherwise: string().optional(),
  //     }),
  //     lastName: mixed().when("memberCertificate", {
  //       is: false,
  //       then: string().required("Last Name is required"),
  //       otherwise: string().optional(),
  //     }),
  //     email: mixed().when("memberCertificate", {
  //       is: false,
  //       then: string().email().required("Email is required"),
  //       otherwise: string().email().optional(),
  //     }),
  //     phone: mixed().when("memberCertificate", {
  //       is: false,
  //       then: string().required("Phone is required"),
  //       otherwise: string().optional(),
  //     }),
  //     role: mixed().when("memberCertificate", {
  //       is: false,
  //       then: string().required("Role is required"),
  //       otherwise: string().optional(),
  //     }),
  //   }),

  //   certificate: object({
  //     type: string().required("Certificate type is required"),
  //     reason: string().required("Reason is required"),
  //     remarks: string().required("Remarks are required"),
  //   }),
  // });

  const handleSubmit = async (values: any) => {
    const currAdminId = getAdmin().id;
    if (values.memberCertificate === "true") {
      const certificate: any = {
        type: values.certificate.type,
        reason: values.certificate.reason,
        remarks: values.certificate.remarks,
        user: {
          uid: recieverId,
        },
        admin: {
          id: parseInt(currAdminId!),
        },
      };

      const res = addCertificate(certificate);
      res
        .then(() => {
          enqueueSnackbar(
            `Successfully issued the certificate to ${recieverId}`,
            {
              variant: "success",
            }
          );
        })
        .catch((err) => {
          enqueueSnackbar(
            `${err} .Could not issue the certificate.Try again later.`,
            {
              variant: "error",
            }
          );
        })
        .finally(() => setLoading(false));
    } else {
      const thirdPartyCertificate: any = {
        user: {
          fname: values.thirdPartyUser.firstName,
          lname: values.thirdPartyUser.lastName,
          email: values.thirdPartyUser.email,
          phone: values.thirdPartyUser.phone,
          role: values.thirdPartyUser.role,
          member: false,
          address: values.thirdPartyUser.address,
          description: values.thirdPartyUser.description,
          emailVerified: false,
          certified: true,
          numCertificates: 0,
          admin: {
            id: parseInt(currAdminId!),
          },
        },
        certificate: {
          type: values.certificate.type,
          reason: values.certificate.reason,
          remarks: values.certificate.remarks,
          admin: {
            id: parseInt(currAdminId!),
          },
        },
      };

      addThirdPartyCertificate(thirdPartyCertificate)
        .then((res) => {
          enqueueSnackbar(
            `Successfully issued the third party certificate to ${recieverId}`,
            {
              variant: "success",
            }
          );
        })
        .catch((err) => {
          enqueueSnackbar(
            `${err} .Could not issue the third party certificate.Try again later.`,
            {
              variant: "error",
            }
          );
        })
        .finally(() => setLoading(false));
    }
  };

  const handleOnChange = (query: string) => {
    setInputValue(query);
    if (query !== "" && query.length !== 1) {
      fetchSuggestionUsers(query)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => console.error(err));
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

                    <Autocomplete
                      id="combo-box-demo"
                      value={reciever}
                      onChange={(e, newValue) => {
                        setReciever(newValue);
                        if (newValue !== null && newValue.uid !== null)
                          setRecieverId(newValue.uid);
                      }}
                      inputValue={inputValue}
                      onInputChange={(e, newInputValue) => {
                        handleOnChange(newInputValue);
                      }}
                      options={suggestions}
                      getOptionLabel={(option) =>
                        option.fname === undefined && option.lname === undefined
                          ? ""
                          : option.fname + " " + option.lname
                      }
                      style={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          color="primary"
                          required={true}
                          label="Reciever"
                          //onChange={(e) => handleOnChange(e.target.value)}
                        />
                      )}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Field
                        name="member.defaultEmail"
                        as={CertifyCheckbox}
                        checked={memberDefaultEmail}
                        label="Send to reciever's default email"
                        onClick={() =>
                          setMemeberDefaultEmail(!memberDefaultEmail)
                        }
                      />
                      <p style={{ color: "grey" }}>
                        By disabling this will send the certificate to the
                        entered custom email
                      </p>
                    </div>
                    {!memberDefaultEmail && (
                      <Field
                        name="member.customEmail"
                        as={TextField}
                        type="email"
                        required={!memberDefaultEmail}
                        label="Custom Email"
                        variant="outlined"
                        color="primary"
                        InputProps={{ className: textfieldStyles.input }}
                      />
                    )}
                  </MyBox>
                ) : (
                  <MyBox>
                    <p style={{ fontSize: "1.1em", marginBottom: "1em" }}>
                      Create the third party reciever
                    </p>
                    <Field
                      name="thirdPartyUser.firstName"
                      component={CertifyTextField}
                      label="First Name"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.lastName"
                      component={CertifyTextField}
                      label="Last Name"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.email"
                      component={CertifyTextField}
                      label="Email"
                      variant="outlined"
                      color="primary"
                      InputProps={{ className: textfieldStyles.input }}
                    />
                    <Field
                      name="thirdPartyUser.phone"
                      component={CertifyTextField}
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
