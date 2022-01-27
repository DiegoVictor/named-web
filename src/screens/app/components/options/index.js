import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Tag from "../../../../components/tag";
import { Container, Dataset, NotFound } from "./styles";

function Options({ open, data, onSelect }) {
  return (
    <Container open={uploading || open} data-testid="options">
      {data.map((option) => {
        return (
          <React.Fragment key={option.id}>
            <Dataset
              onClick={() => {
                onSelect(option);
              }}
              data-testid={`option-${option.id}`}
            >
              {option.category && (
                <Tag color={option.color}>{option.category}</Tag>
              )}
              {option.title}
            </Dataset>
          </React.Fragment>
        );
      })}
      {data.length === 0 && <NotFound>No datasets found</NotFound>}
    </Container>
  );
}

Options.propTypes = {
  open: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default Options;
