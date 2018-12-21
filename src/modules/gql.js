import gql from "graphql-tag";

export const ALL_PIZZAS = gql`
  query pizzaSizes {
    pizzaSizes {
      maxToppings
      name
      basePrice
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
    }
  }
`;
