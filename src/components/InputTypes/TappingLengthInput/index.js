import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ErrorText from "../ErrorText";
import { TextInput, Label } from "./styled";

const TappingLengthInput = ({
  id,
  label,
  value,
  touched,
  error,
  placeholder,
  handleChange,
  handleBlur
}) => (
  <Fragment>
    <Label htmlFor={id}>
      {label}
      <TextInput
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Label>
    {error && touched && <ErrorText>{error}</ErrorText>}
  </Fragment>
);

TappingLengthInput.defaultProps = {
  placeholder: "",
  label: "",
  id: "",
  touched: false,
  error: "",
  value: "1"
};

TappingLengthInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};

export default TappingLengthInput;
