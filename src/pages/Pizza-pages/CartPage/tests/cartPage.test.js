import React from "react";
import { shallow } from "enzyme";

import { CartPage } from "../index";

describe("CartPage Component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<CartPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
