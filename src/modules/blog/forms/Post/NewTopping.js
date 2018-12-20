import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";

import { Query } from "components";
import PostForm from "modules/blog/forms/Post";
import { ALL_PIZZAS } from "modules/blog/gql";
import { TextInput } from "components/InputTypes/CheckBoxInput/styled";
import Label from "components/InputTypes/Label";

import {
  ResultsContainer,
  PizzaSizeSelector,
  InputContainer,
  ResultItem
} from "./styles";

export class NewTopping extends React.Component {
  state = { selectedItem: undefined };

  onChange = selectedItem => this.setState({ selectedItem });
  render() {
    const { toppings } = this.props;
    const { selectedItem } = this.state;
    return (
      <Downshift
        onChange={this.onChange}
        itemToString={item => (item ? item.name : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          toggleMenu,
          getRootProps
        }) => (
          <PizzaSizeSelector
            {...getRootProps({
              refKey: "ref"
            })}
          >
            <Label {...getLabelProps()}>Select pizza size:</Label>
            <InputContainer>
              <TextInput
                {...getInputProps({
                  onClick: toggleMenu,
                  placeholder: "Type pizza size..."
                })}
              />
              {isOpen && (
                <ResultsContainer {...getMenuProps()}>
                  {toppings
                    .filter(
                      item => !inputValue || item.name.includes(inputValue)
                    )
                    .map((item, index) => (
                      <ResultItem
                        {...getItemProps({
                          key: item.name,
                          index,
                          item,
                          highlighted: highlightedIndex === index,
                          selected: selectedItem === item
                        })}
                      >
                        {item.name}
                      </ResultItem>
                    ))}
                </ResultsContainer>
              )}
            </InputContainer>
          </PizzaSizeSelector>
        )}
      </Downshift>
    );
  }
}

NewTopping.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default NewTopping;
