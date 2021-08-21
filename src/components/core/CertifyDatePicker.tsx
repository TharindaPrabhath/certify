import { TextField } from "@material-ui/core";
import { FieldProps } from "formik";
import React from "react";
import { useTextfieldStyles } from "../../data/styles";

const CertifyDatePicker: React.FC<FieldProps> = ({ field, form, ...props }) => {
  const styles = useTextfieldStyles();

  return (
    <TextField
      variant="outlined"
      color="primary"
      type="date"
      InputLabelProps={{
        className: styles.input,
        shrink: true,
      }}
      {...field}
      {...props}
    ></TextField>
  );
};

export default CertifyDatePicker;
