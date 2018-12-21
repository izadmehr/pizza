import React from "react";
import PropTypes from "prop-types";

import { Query } from "components";
import PostForm from "modules/blog/forms/Post";
import { ALL_PIZZAS } from "modules/blog/gql";

const PostCreatePage = ({
  history: { push },
  match: {
    params: { pizzaId }
  }
}) => (
  <section>
    <Query query={ALL_PIZZAS}>
      {({ data: { pizzaSizes } }) => (
        <PostForm
          pizzaId={pizzaId}
          pizzaSizes={pizzaSizes}
          pushtoCartPage={() => push(`/cart`)}
        />
      )}
    </Query>
  </section>
);

PostCreatePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ pizzaId: PropTypes.string })
  }).isRequired
};

export default PostCreatePage;
