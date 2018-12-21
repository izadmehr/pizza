import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;
export const TextInput = styled.input`
  border: none;
  font-size: 1rem;
  padding: 0 5px;
  background-color: transparent;
  caret-color: ${props => props.theme.color.primary};

  ::-ms-clear {
    display: none;
  }

  ::-webkit-input-placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: #7f7f7f;
    font-family: Barlow, sans-serif;
  }

  ::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: #7f7f7f;
    font-family: Barlow, sans-serif;
  }
  :focus {
    outline: none;
  }
`;
