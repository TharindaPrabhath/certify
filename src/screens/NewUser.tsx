import React, { useEffect } from "react";

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
import * as yup from "yup";
import { addUser } from "../utils/requestHelper";
import { getUserDto } from "../utils/mapper";
import { useSnackbar } from "notistack";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

const NewUser = () => {
  const buttonStyles = useButtonStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  useEffect(() => {
    setLoading(false);
  }, []);

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
    setLoading(true);
    const user: any = {
      fname: values.fName,
      lname: values.lName,
      email: values.email,
      emailVerified: values.emailVerified,
      certified: false,
      numCertificates: 0,
      phone: values.phone,
      role: values.role,
      birthday: values.birthday,
      address: values.address,
      description: values.description,
      admin: {
        id: parseInt(localStorage.getItem("currentAdminId")!),
      },
    };
    addUser(getUserDto(user))
      .then(() => {
        enqueueSnackbar("Successfully added the user", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`${err} .Could not add the user.Try again later.`, {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
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
              submit(values);
            }}
          >
            <Form>
              <div className="left-col">
                <Field
                  label="First Name"
                  name="fName"
                  autoFocus
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
                  <Button
                    className={buttonStyles.standardBtn}
                    type="submit"
                    disabled={loading}
                  >
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
