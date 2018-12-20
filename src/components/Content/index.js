import styled from "styled-components";

import { mediaQueries } from "styles";

const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px auto;

  ${mediaQueries.md} {
    padding: 25px 25px;
    max-width: ${props => props.theme.layout.maxWidth};
  }
`;

export default Content;
