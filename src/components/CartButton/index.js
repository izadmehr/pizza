import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Cart from "components/icons/Cart/Cart-icon";

import { numberOfPizzas } from "../../redux/modules/cart";

const CartContainer = styled.div`
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -4px;
  color: red;
  font-weight: bold;
`;
const CartButton = ({ numberOFPizzas }) => (
  <CartContainer>
    <Cart />
    <CartCount> {numberOFPizzas}</CartCount>
  </CartContainer>
);

const mapStateToProps = ({ cart }) => ({
  numberOFPizzas: numberOfPizzas(cart)
});

export default connect(mapStateToProps)(CartButton);
