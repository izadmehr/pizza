const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return { ...state, [action.newPizza.id]: action.newPizza };
    }
    case REMOVE_FROM_CART: {
      const { [action.id]: removedPizza, ...withoutSecond } = state;
      return withoutSecond;
    }
    default:
      return state;
  }
}

export const numberOfPizzas = state => Object.keys(state).length;

export function addToCart(newPizza) {
  return {
    type: ADD_TO_CART,
    newPizza
  };
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    id
  };
}
