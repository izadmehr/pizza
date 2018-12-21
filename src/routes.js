import NotFound from "pages/NotFound";
import { PizzaCreate, CartPage } from "pages/Pizza-page";

import App from "./app";
import { PostDetail } from "./pages/Blog";

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
