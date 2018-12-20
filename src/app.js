import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { renderRoutes } from "react-router-config";

import { Content, Navbar } from "components";
import Cart from "components/icons/Cart/Cart-icon";

const NAV_LINKS = [
  { id: 1, to: "/pizza", label: "Create Pizza" },
  { id: 2, to: "/cart", label: <Cart /> }
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const App = ({ route, location: { pathname } }) => (
  <Container>
    <Navbar links={NAV_LINKS} activeRoute={pathname} />
    <Content>{renderRoutes(route.routes)}</Content>
  </Container>
);

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
