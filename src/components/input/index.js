import React from "react";
import PropTypes from "prop-types";

import { Container, Icon } from "./styles";

function Input({ value, onChange, left, right, ...props }) {
  return (
    <Container leftIcon={!!left}>
      {left && <Icon left>{left}</Icon>}
      <input
        type="text"
        {...props}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {right && <Icon right>{right}</Icon>}
    </Container>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
};

Input.defaultProps = {
  left: null,
  right: null,
};

export default Input;
