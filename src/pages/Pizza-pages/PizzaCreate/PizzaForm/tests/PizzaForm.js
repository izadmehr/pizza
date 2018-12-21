import React from "react";
import { shallow } from "enzyme";

import { PizzaForm } from "../index";

describe("PizzaForm Component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<PizzaForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
