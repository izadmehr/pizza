import React from "react";
import { mount } from "enzyme";

import { theme } from "styles";

import "jsdom-global/register";
import "jest-styled-components";
import { TextInput } from "../styles";

describe("StyledInput Component", () => {
  it("has correct default styles", () => {
    const wrapper = mount(<TextInput theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });
});
