import { TextField } from "@material-ui/core";
import { FieldProps, getIn } from "formik";
import React from "react";
import { useTextfieldStyles } from "../../data/styles";

const CertifyTextField: React.FC<
  FieldProps & { textArea?: boolean; required?: boolean }
> = ({ field, form, textArea, required, ...props }) => {
  const error =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  const styles = useTextfieldStyles();

  return (
    <TextField
      variant="outlined"
      color="primary"
      required={required}
      error={!!error}
      helperText={error}
      multiline={textArea}
      rows={textArea ? 5 : 1}
      InputProps={{ className: styles.input }}
      {...field}
      {...props}
    ></TextField>
  );
};

export default CertifyTextField;
