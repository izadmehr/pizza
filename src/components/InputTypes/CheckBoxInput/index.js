import React from "react";
import PropTypes from "prop-types";

import Label from "../Label";
import ErrorText from "../ErrorText";
import { TextInput } from "./styled";

const CheckBoxInput = ({
  id,
  label,
  value,
  touched,
  error,
  placeholder,
  handleChange,
  handleBlur
}) => (
  <Label htmlFor={id}>
    <TextInput
      id={id}
      name={id}
      checked={value}
      type="checkbox"
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {label}
    {error && touched && <ErrorText>{error}</ErrorText>}
  </Label>
);

CheckBoxInput.defaultProps = {
  placeholder: "",
  label: "",
  id: "",
  touched: false,
  error: "",
};

CheckBoxInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.bool.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};

export default CheckBoxInput;
