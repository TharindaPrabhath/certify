import React, { useEffect } from "react";

import {
  Breadcrumbs,
  Button,
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
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
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

const NewCertificate = () => {
  const [openUserSelectBox, setOpenUserSelectBox] = useState<boolean>(false);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [suggestionUsers, setSuggestionUsers] = useState<UserDto[]>([]);
  const [searchedUser, setSearchedUser] = useState<string>("");
  const [searchedUserId, setSearchedUserId] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const buttonStyles = useButtonStyles();
  const styles = useTextfieldStyles();
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  useEffect(() => {
    setLoading(false);
    if (openUserSelectBox) {
      fetchUsers()
        .then((res) => setUsers(toUserDtos(res.data)))
        .catch((err) => console.error(err));
    }
  }, [openUserSelectBox]);

  const initialValues = {
    reciever: searchedUser,
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

  const handleUserSelectBoxClose = () => {
    setOpenUserSelectBox(false);
  };

  const handleSuggestedUserClick = (searchedUser: UserDto) => {
    setSearchedUser(searchedUser.fname + " " + searchedUser.lname);
    setSearchedUserId(searchedUser.id);
    setOpenUserSelectBox(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: certificateValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const res = addCertificate({
        ...values,
        user: {
          uid: searchedUserId,
        },
        admin: {
          id: parseInt(localStorage.getItem("currentAdminId")!),
        },
      });
      res
        .then(() => {
          enqueueSnackbar(
            `Successfully issued the certificate to ${values.reciever}`,
            {
              variant: "success",
            }
          );
          formik.resetForm();
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
    },
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
        </div>

        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="left-col">
              <TextField
                id="reciever"
                name="reciever"
                type="text"
                label="Reciever"
                autoFocus
                value={formik.values.reciever}
                onClick={() => setOpenUserSelectBox(true)}
                onChange={formik.handleChange}
                error={!!formik.errors.reciever}
                helperText={formik.errors.reciever}
                variant="outlined"
                required={true}
                InputProps={{ className: styles.input }}
              />
              <FormControl variant="outlined">
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  name="type"
                  label="Type"
                  color="primary"
                  variant="outlined"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={!!formik.errors.type}
                >
                  {["Participation", "Content Creation", "Other"].map(
                    (option, index) => {
                      return (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
              <div className="email-verified">
                <Switch
                  color="primary"
                  name="defaultEmail"
                  value={formik.values.defaultEmail}
                  checked={formik.values.defaultEmail}
                  onChange={formik.handleChange}
                />
                <div className="right-col">
                  <label>Send to reciever's default email</label>
                  <p>
                    Disabling this will send the issued certificate to the
                    custom email
                  </p>
                </div>
              </div>
              {!formik.values.defaultEmail && (
                <TextField
                  id="customEmail"
                  name="customEmail"
                  type="email"
                  label="Email"
                  value={formik.values.customEmail}
                  onChange={formik.handleChange}
                  error={!!formik.errors.customEmail}
                  helperText={formik.errors.customEmail}
                  variant="outlined"
                  required={true}
                  InputProps={{ className: styles.input }}
                />
              )}
            </div>
            <div className="right-col">
              <TextField
                id="reason"
                name="reason"
                type="text"
                label="Reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={!!formik.errors.reason}
                helperText={formik.errors.reason}
                variant="outlined"
                required={true}
                InputProps={{ className: styles.input }}
                multiline={true}
                rows={5}
              />
              <TextField
                id="remarks"
                name="remarks"
                type="text"
                label="Remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                error={!!formik.errors.remarks}
                helperText={formik.errors.remarks}
                variant="outlined"
                required={true}
                InputProps={{ className: styles.input }}
                multiline={true}
                rows={5}
              />
              <div className="submit-btn">
                <Button
                  className={buttonStyles.standardBtn}
                  type="submit"
                  disabled={loading}
                >
                  Create Certificate
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Dialog
        open={openUserSelectBox}
        aria-labelledby="Confirm"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "20em",
            }}
          >
            Select the reciever
            <TextField
              label="Search the reciever"
              variant="outlined"
              value={searchedUser}
              onChange={(e) => {
                const text = e.target.value;
                setSearchedUser(text);

                const regex = new RegExp(`^${text}`, `i`);
                setSuggestionUsers(
                  users
                    .sort()
                    .filter((u) => regex.test(u.fname) || regex.test(u.lname))
                );
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <List style={{ height: "20em", maxHeight: "25em" }}>
              {suggestionUsers.map((user) => {
                return (
                  <ListItem
                    button
                    onClick={() => handleSuggestedUserClick(user)}
                    key={user.id}
                  >
                    {`${user.fname} ${user.lname}`}
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserSelectBoxClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewCertificate;
