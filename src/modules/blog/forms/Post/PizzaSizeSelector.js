import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";

import Label from "components/InputTypes/Label";

import {
  InputContainer,
  PizzaSizeSelectorContainer,
  ResultItem,
  ResultsContainer
} from "../../../../pages/Pizza-page/PizzaCreate/styles";
import { TextInput } from "../../../../components/InputTypes/CheckBoxInput/styled";

const PizzaSizeSelector = ({ onChange, pizzaSizes }) => (
  <Downshift onChange={onChange} itemToString={item => (item ? item.name : "")}>
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
      <PizzaSizeSelectorContainer
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
              {pizzaSizes
                .filter(item => !inputValue || item.name.includes(inputValue))
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
      </PizzaSizeSelectorContainer>
    )}
  </Downshift>
);

PizzaSizeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  pizzaSizes: PropTypes.array.isRequired
};

export default PizzaSizeSelector;
