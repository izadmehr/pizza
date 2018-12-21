import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Cart from "components/icons/Cart/Cart-icon";

import { numberOfPizzas as numberOfPizzasSelector } from "../../redux/modules/cart";

const CartContainer = styled.div`
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -4px;
  color: red;
  font-weight: bold;
`;
const CartButton = ({ numberOfPizzas }) => (
  <CartContainer>
    <Cart />
    {!!numberOfPizzas && <CartCount> {numberOfPizzas}</CartCount>}
  </CartContainer>
);

CartButton.propTypes = {
  numberOfPizzas: PropTypes.number.isRequired
};

const mapStateToProps = ({ cart }) => ({
  numberOfPizzas: numberOfPizzasSelector(cart)
});

export default connect(mapStateToProps)(CartButton);
