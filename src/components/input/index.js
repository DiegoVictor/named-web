import React from "react";

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

export default Input;
