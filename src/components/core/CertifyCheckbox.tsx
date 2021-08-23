import { Checkbox } from "@material-ui/core";
import { FieldProps } from "formik";
import React from "react";

const CertifyCheckbox: React.FC<FieldProps & { label?: string }> = ({
  label,
  field,
  form,
  ...props
}) => {
  return (
    <div>
      <Checkbox color="primary" {...field} {...props} />
      {label}
    </div>
  );
};

export default CertifyCheckbox;
