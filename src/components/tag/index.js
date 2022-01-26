import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

function Tag({ children, color }) {
  return <Container color={color}>{children}</Container>;
}

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Tag.defaultProps = {
  color: "",
};

export default Tag;
