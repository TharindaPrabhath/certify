import {
  Breadcrumbs,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useButtonStyles, useTextfieldStyles } from "../data/styles";
import { useCreateNewUserForm } from "../utils/validation";

import "./NewUser.css";

const NewUser = () => {
  const { values, errors, handleChange } = useCreateNewUserForm();

  const textfieldStyles = useTextfieldStyles();
  const buttonStyles = useButtonStyles();

  const handleCreateNewUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Submitted!");
  };

  const handleChange2 = (e: any) => {
    console.log(e.target.name);
  };

  console.log(values.firstName);

  return (
    <div className="new-user">
      <div className="new-user__content">
        <div className="top">
          <h2 className="">Create a new User</h2>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user">User</Link>
            <Typography color="textPrimary">New User</Typography>
          </Breadcrumbs>
        </div>

        <div className="details">
          <form onSubmit={(e) => handleCreateNewUser(e)}>
            <div className="left-col">
              <TextField
                id="outlined-secondary"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={values.firstName}
                error={errors.firstName.length !== 0}
                helperText={errors.firstName}
                onChange={handleChange}
                // onInput={handleChange}
                // required
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
              ></TextField>

              <TextField
                id="outlined-secondary"
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                // required
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
              ></TextField>

              <TextField
                id="outlined-secondary"
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                // required
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
              ></TextField>
              <div className="email-verified">
                <Switch color="primary" />
                <div className="right-col">
                  <label>Email verified</label>
                  <p>
                    Disabling this will automatically send the user a
                    verification email
                  </p>
                </div>
              </div>

              <TextField
                id="outlined-secondary"
                label="Phone"
                variant="outlined"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
              ></TextField>
            </div>

            <div className="right-col">
              <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  // required
                  className={textfieldStyles.textField}
                  inputProps={{ className: textfieldStyles.input }}
                >
                  <MenuItem value={10}>Student</MenuItem>
                  <MenuItem value={20}>Undergraduate</MenuItem>
                  <MenuItem value={30}>Graduate</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-secondary"
                label="Birthday"
                type="date"
                variant="outlined"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>

              <TextField
                id="outlined-secondary"
                label="Address"
                variant="outlined"
                name="address"
                value={values.address}
                onChange={handleChange}
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
              ></TextField>
              <TextField
                id="outlined-secondary"
                label="Description"
                multiline
                rows={5}
                variant="outlined"
                name="description"
                value={values.description}
                onChange={handleChange}
                className={textfieldStyles.textField}
                InputProps={{ className: textfieldStyles.input }}
              ></TextField>
              <div className="submit-btn">
                <Button type="submit" className={buttonStyles.standardBtn}>
                  Create User
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
