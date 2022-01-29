import React from "react";

import Name from "../name";
import { Container } from "./styles";

function List({ data, onFeedback }) {
  return (
    <Container>
      {data.map((item) => {
        return (
          <Name
            key={`${item.name}`}
            value={item.name}
            onFeedback={(value) => {
              const updatedNames = [...data];
              const nameIndex = updatedNames.findIndex(
                ({ name }) => name === item.name
              );

              updatedNames.splice(nameIndex, 1, {
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
