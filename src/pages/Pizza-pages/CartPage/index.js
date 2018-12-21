import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { map } from "lodash";

import { H1, H2, P } from "components/Typography";
import { Button, Link } from "components";

import {
  numberOfPizzas,
  removeFromCart as removeFromCartAction
} from "../../../redux/modules/cart";

const PostContainer = styled.div`
  margin-bottom: 25px;
  max-width: 40rem;
`;

const ActionsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const CartPage = ({ cart, noPizza, removeFromCart }) => (
  <section>
    {noPizza ? (
      <H1>Let's Make Some Pizza!</H1>
    ) : (
      map(cart, pizza => (
        <PostContainer key={pizza.id}>
          <H2>
            <b>Pizza Size: </b>
            {pizza.name}
          </H2>
          <P>
            <b>Pizza Price: </b>
            {pizza.pizzaPrice}
          </P>
          <P>
            <b>Toppings: </b>
            {pizza.toppings
              .map(
                ({ name: toppingName, toppingNumber }) =>
                  `${toppingName} ${toppingNumber ? `(${toppingNumber})` : ""}`
              )
              .join(", ")}
          </P>
          <ActionsContainer>
            <Link to={`/pizza/${pizza.id}`}>
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={() => {
                removeFromCart(pizza.id);
              }}
              bgType="error"
            >
              Delete
            </Button>
          </ActionsContainer>
        </PostContainer>
      ))
    )}
  </section>
);
CartPage.propTypes = {
  cart: PropTypes.object,
  noPizza: PropTypes.bool,
  removeFromCart: PropTypes.func
};

CartPage.defaultProps = {
  cart: {},
  noPizza: true,
  removeFromCart: () => {}
};

const mapStateToProps = ({ cart }) => ({
  cart,
  noPizza: numberOfPizzas(cart) === 0
});

export default connect(
  mapStateToProps,
  { removeFromCart: removeFromCartAction }
)(CartPage);
