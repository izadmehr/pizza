import React from "react";
import PropTypes from "prop-types";

import Label from "../Label";
import ErrorText from "../ErrorText";
import { TextInput } from "./styled";

const CheckBoxInput = ({
  id,
  label,
  name,
  value,
  disabled,
  touched,
  error,
  type,
  placeholder,
  handleChange,
  handleBlur
}) => (
  <Label htmlFor={id}>
    <TextInput
      id={id}
      name={name || id}
      checked={!!value}
      disabled={disabled}
      type={type}
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
  name: "",
  touched: false,
  disabled: false,
  error: "",
  value: false,
  type: "checkbox"
};

CheckBoxInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};

export default CheckBoxInput;
