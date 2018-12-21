import NotFound from "pages/NotFound";
import { PizzaCreate, CartPage } from "pages/Pizza-pages";

import App from "./app";

export default [
  {
    component: App,
    routes: [
      {
        path: "/pizza/:pizzaId?",
        component: PizzaCreate
      },
      {
        path: "/cart",
        component: CartPage
      },
      {
        path: "*",
        component: NotFound
      }
    ]
  }
];
