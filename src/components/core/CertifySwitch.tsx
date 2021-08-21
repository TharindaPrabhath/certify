import { Switch } from "@material-ui/core";
import { FieldProps } from "formik";
import React from "react";

const CertifySwitch: React.FC<FieldProps> = ({ field, form, ...props }) => {
  return <Switch color="primary" {...field} {...props}></Switch>;
};

export default CertifySwitch;
