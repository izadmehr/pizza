import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;
export const TextInput = styled.input`
  border: solid 1px ${props => props.theme.color.lightGrey};
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
export const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0.5rem 0 0.5rem 1rem;
  justify-content: space-between;

  input,
  textarea {
    margin-left: 0.5rem;
  }
`;
