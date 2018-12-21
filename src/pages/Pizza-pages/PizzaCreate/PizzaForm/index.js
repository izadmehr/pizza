import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { uniqueId } from "lodash";

import { TappingLengthInput, CheckBoxInput } from "components/InputTypes";
import { Button } from "components";
import { P } from "components/Typography";

import DataRow from "./DataRow";
import { upsertToCart } from "../../../../redux/modules/cart";
import { PizzaSizesContainer, TappingContainer, Toppings } from "./styles";

function selectedPizzaSize(pizzaSizes, values) {
  return pizzaSizes.filter(
    ({ name: pizzaSize }) => values.pizzaSize === pizzaSize
  )[0];
}

function pizzaPrice(pizzaSizes, values) {
  const selectedItem = selectedPizzaSize(pizzaSizes, values);
  const floatPrice = selectedItem.toppings.reduce(
    (accumulator, { defaultSelected, topping }) =>
      accumulator +
      (values[topping.name] || defaultSelected
        ? topping.price * (values[`${topping.name}-length`] || 1)
        : 0),
    selectedItem.basePrice
  );
  return parseFloat(floatPrice).toFixed(2);
}

export const PizzaForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm,
  pizzaSizes,
  selectedPizza
}) => {
  const selectedItem = pizzaSizes.filter(
    ({ name: pizzaSize }) => values.pizzaSize === pizzaSize
  )[0];

  const numberOfSelectedTopping =
    selectedItem &&
    selectedItem.toppings.reduce((o, { topping, defaultSelected }) => {
      if (
        values[topping.name] ||
        (defaultSelected && values[topping.name] !== false)
      ) {
        return o + 1;
      }
      return o;
    }, 0);

  return (
    <form onSubmit={handleSubmit}>
      <PizzaSizesContainer>
        <P>Pizza size:</P>
        {pizzaSizes.map(({ name: pizzaSizeName }) => (
          <CheckBoxInput
            type="radio"
            id={pizzaSizeName}
            name="pizzaSize"
            key={pizzaSizeName}
            label={pizzaSizeName}
            value={values.pizzaSize === pizzaSizeName}
            touched={touched[pizzaSizeName]}
            error={errors[pizzaSizeName]}
            handleChange={() => resetForm({ pizzaSize: pizzaSizeName })}
            handleBlur={handleBlur}
          />
        ))}
      </PizzaSizesContainer>
      {selectedItem && (
        <Fragment>
          <DataRow label="Base Price" value={`$${selectedItem.basePrice}`} />
          <DataRow
            label="Max Toppings"
            value={selectedItem.maxToppings || "Unlimited Toppings!"}
          />
          <Toppings>Toppings:</Toppings>
          {selectedItem.toppings.map(({ defaultSelected, topping }, index) => {
            const toppingSelected =
              values[topping.name] ||
              (defaultSelected && values[topping.name] !== false);

            return (
              <TappingContainer key={index}>
                <CheckBoxInput
                  type="checkbox"
                  id={topping.name}
                  label={`${topping.name}: $${topping.price}`}
                  value={toppingSelected}
                  touched={touched[topping.name]}
                  error={errors[topping.name]}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  disabled={
                    selectedItem.maxToppings &&
                    !toppingSelected &&
                    numberOfSelectedTopping === selectedItem.maxToppings
                  }
                />
                {selectedItem.maxToppings === null && toppingSelected && (
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
            );
          })}
          <DataRow
            label="Total Price"
            value={`$${pizzaPrice(pizzaSizes, values)}`}
          />

          <Button type="submit" style={{ marginTop: "1rem", float: "right" }}>
            {selectedPizza ? "Update the pizza" : "Add To Cart"}
          </Button>
        </Fragment>
      )}
    </form>
  );
};

PizzaForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pizzaSizes: PropTypes.arrayOf(
    PropTypes.shape({
      maxToppings: PropTypes.number,
      name: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedPizza: PropTypes.shape({
    name: PropTypes.string
  })
};

PizzaForm.defaultProps = {
  selectedPizza: undefined
};

const EnhancedForm = withFormik({
  mapPropsToValues: props => {
    if (props.selectedPizza) {
      const pizzaSizeExist = props.pizzaSizes.some(
        ({ name: pizzaSize }) => props.selectedPizza.name === pizzaSize
      );
      if (pizzaSizeExist) {
        return {
          pizzaSize: props.selectedPizza.name,
          ...props.selectedPizza.toppings.reduce((o, topping) => {
            const tappingNumberValue = topping.toppingNumber
              ? { [`${topping.name}-length`]: topping.toppingNumber }
              : {};
            return {
              ...o,
              [topping.name]: true,
              ...tappingNumberValue
            };
          }, {})
        };
      }
    }
    return {};
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
  handleSubmit: (values, { props }) => {
    const id = props.selectedPizza ? props.selectedPizza.id : uniqueId();
    props.upsertToCart({
      values,
      name: values.pizzaSize,
      pizzaPrice: pizzaPrice(props.pizzaSizes, values),
      id,
      toppings: selectedPizzaSize(props.pizzaSizes, values)
        .toppings.filter(
          ({ defaultSelected, topping }) =>
            values[topping.name] ||
            (defaultSelected && values[topping.name] !== false)
        )
        .map(({ topping }) => ({
          ...topping,
          toppingNumber: values[`${topping.name}-length`]
        }))
    });
    if (props.selectedPizza) {
      props.pushtoCartPage();
    }
  },
  displayName: "PizzaForm"
})(PizzaForm);

const mapStateToProps = ({ cart }, { pizzaId }) => ({
  selectedPizza: cart[pizzaId]
});

export default connect(
  mapStateToProps,
  {
    upsertToCart
  }
)(EnhancedForm);
