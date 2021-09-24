import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { FieldProps, getIn } from "formik";
import React from "react";

const CertifySelect: React.FC<
  FieldProps & { label: string; options: string[] }
> = ({ field, form, label, options, ...props }) => {
  const error =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl variant="outlined" error={!!error}>
      <InputLabel id="certify-select">{label}</InputLabel>
      <Select
        labelId="certify-select"
        color="primary"
        variant="outlined"
        label={label}
        {...field}
        {...props}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default CertifySelect;
