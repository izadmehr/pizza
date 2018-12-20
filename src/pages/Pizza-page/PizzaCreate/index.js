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

export class PostCreatePage extends React.Component {
  state = { selectedItem: undefined };

  onChange = selectedItem => this.setState({ selectedItem });
  render() {
    const { selectedItem } = this.state;
    return (
      <section>
        <Query query={ALL_PIZZAS}>
          {({ data: { pizzaSizes } }) => (
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
                        {pizzaSizes
                          .filter(
                            item =>
                              !inputValue || item.name.includes(inputValue)
                          )
                          .map((item, index) => (
                            <ResultItem
                              {...getItemProps({
                                key: item.name,
                                index,
                                item,
                                highlighted: highlightedIndex === index,
                                selected: selectedItem === item
                                // style: {
                                //   backgroundColor:
                                //     highlightedIndex === index
                                //       ? theme.color.lightGrey
                                //       : "white",
                                //   fontWeight:
                                //     selectedItem === item ? "bold" : "normal"
                                // }
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
          )}
        </Query>
        {selectedItem && (
          <PostForm
            selectedItem={selectedItem}
            submit={values => mutate({ variables: values })}
          />
        )}
      </section>
    );
  }
}

PostCreatePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default PostCreatePage;
