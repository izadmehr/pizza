import { createStore } from "redux";

import reducer from "../modules/reducers";

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState);
  if (module.hot) {
    module.hot.accept("../modules/reducers", () =>
      store.replaceReducer(require("../modules/reducers").default)
    );
  }

  return store;
}
