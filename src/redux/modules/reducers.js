import { combineReducers } from "redux";

import cart from "./cart";

// combine reducers -> createStore reducer
const reducers = combineReducers({
  cart
});

export default reducers;
