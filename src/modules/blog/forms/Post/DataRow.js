import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Label from "components/InputTypes/Label";

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const Title = styled.p`
  margin: 0 0.5rem;
`;

const DataRow = ({ label, value }) => (
  <RowContainer>
    <Label>{`${label}: `}</Label>
    <Title>{value}</Title>
  </RowContainer>
);

DataRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default DataRow;
