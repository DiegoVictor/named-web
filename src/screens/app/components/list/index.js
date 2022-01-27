import React from "react";

import Name from "../name";
import { Container } from "./styles";

function List({ data, onFeedback }) {
  return (
    <Container>
      {data.map((item, index) => {
        return (
          <Name
            key={`${item.name}${index}`}
            value={item.name}
            onFeedback={(value) => {
              const updatedNames = [...data];
              const index = updatedNames.findIndex(
                ({ name }) => name === item.name
              );

              updatedNames.splice(index, 1, {
                ...item,
                value,
              });
              onFeedback(updatedNames);
            }}
          />
        );
      })}
    </Container>
  );
}

export default List;
