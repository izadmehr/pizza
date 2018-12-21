import React from "react";
import PropTypes from "prop-types";

import { Query } from "components";
import { ALL_PIZZAS } from "modules/gql";

import PizzaForm from "./PizzaForm";

const PostCreatePage = ({
  history: { push },
  match: {
    params: { pizzaId }
  }
}) => (
  <section>
    <Query query={ALL_PIZZAS}>
      {({ data: { pizzaSizes } }) => (
        <PizzaForm
          pizzaId={pizzaId}
          pizzaSizes={pizzaSizes}
          pushtoCartPage={() => push(`/cart`)}
        />
      )}
    </Query>
  </section>
);

PostCreatePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ pizzaId: PropTypes.string })
  }).isRequired
};

export default PostCreatePage;
