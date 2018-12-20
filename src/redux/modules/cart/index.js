const ADD_TO_CART = "ADD_TO_CART";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return { ...state, [action.newPizza.id]: action.newPizza };
    }
    default:
      return state;
  }
}

export function addToCart(newPizza) {
  return {
    type: ADD_TO_CART,
    newPizza
  };
}
