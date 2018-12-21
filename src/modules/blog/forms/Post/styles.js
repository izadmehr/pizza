import styled from "styled-components";

import { H3 } from "../../../../components/Typography";

export const PizzaSizeSelector = styled.div`
  padding: 0 1rem;
  display: flex;
  position: relative;
  align-items: center;
  height: 2.5rem;
  border: solid 1px ${props => props.theme.color.lightGrey};
  :focus-within {
    border: solid 1px ${props => props.theme.color.primary};
  }
  width: 400px;
`;

export const InputContainer = styled.div`
  flex: 1;
`;
export const ResultsContainer = styled.ul`
  position: absolute;
  margin-top: 0.4rem;
  box-shadow: -1px 0 10px 0 rgba(0, 0, 0, 0.1), 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 0;
  background: white;
  list-style-type: none;
`;

export const ResultItem = styled.li`
  padding: 1rem 2rem;
  background: ${({ highlighted }) =>
    highlighted ? "rgba(0,0,0,.03)" : "white"};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

export const PizzaSizesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Toppings = styled(H3)`
  margin-top: 1rem;
`;

export const TappingContainer = styled.div`
  margin-top: 0.5rem;
`;
