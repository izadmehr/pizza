import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { connect } from "react-redux";
import { uniqueId } from "lodash";

import { CheckBoxInput } from "components/InputTypes";
import { Button } from "components";

import { H3 } from "../../../../components/Typography";
import DataRow from "./DataRow";
import TappingLengthInput from "../../../../components/InputTypes/TappingLengthInput";
import { addToCart } from "../../../../redux/modules/cart";

const Toppings = styled(H3)`
  margin-top: 1rem;
`;

const TappingContainer = styled.div`
  margin-top: 0.5rem;
`;

const PostForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  selectedItem
}) => (
  <form onSubmit={handleSubmit}>
    <DataRow label="Base Price" value={selectedItem.basePrice} />
    <DataRow
      label="Max Toppings"
      value={selectedItem.maxToppings || "Unlimited Toppings!"}
    />
    <Toppings>Toppings:</Toppings>
    {selectedItem.toppings.map(({ defaultSelected, topping }, index) => (
      <TappingContainer key={index}>
        <CheckBoxInput
          id={topping.name}
          label={`${topping.name}: $${topping.price}`}
          value={values[topping.name] || defaultSelected}
          touched={touched[topping.name]}
          error={errors[topping.name]}
          handleChange={handleChange}
          handleBlur={handleBlur}
          defaultSelected={defaultSelected}
        />
        {selectedItem.maxToppings === null && (
          <TappingLengthInput
            id={`${topping.name}-length`}
            label="Number of topping:"
            value={values[`${topping.name}-length`]}
            touched={touched[`${topping.name}-length`]}
            error={errors[`${topping.name}-length`]}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
      </TappingContainer>
    ))}
    <DataRow
      label="Total Price"
      value={selectedItem.toppings.reduce(
        (accumulator, { defaultSelected, topping }) =>
          accumulator +
          (values[topping.name] || defaultSelected
            ? topping.price * (values[`${topping.name}-length`] || 1)
            : 0),
        selectedItem.basePrice
      )}
    />

    <Button type="submit" style={{ marginTop: "1rem" }}>
      Add To Cart
    </Button>
  </form>
);

PostForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired
};

const EnhancedForm = withFormik({
  mapPropsToValues: props => {
    if (!props.initialValues) {
      return {};
    }
    return { title: props.initialValues.title, text: props.initialValues.text };
  },
  validationSchema: Yup.lazy(value => {
    const tappingInputs = Object.keys(value)
      .filter(key => key.endsWith("-length"))
      .reduce(
        (o, key) => ({
          ...o,
          [key]: Yup.number()
            .typeError("Number of topping should be a number.")
            .integer()
            .positive("Number of topping should be more than zero.")
        }),
        {}
      );
    return Yup.object().shape(tappingInputs);
  }),
  handleSubmit: (values, other) => {
    const id = other.props.initialValues
      ? other.props.initialValues.id
      : uniqueId();
    other.props.addToCart({
      ...values,
      id
    });
  },
  displayName: "PostForm"
})(PostForm);

export default connect(
  null,
  {
    addToCart
  }
)(EnhancedForm);
