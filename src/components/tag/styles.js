import styled from "styled-components";

export const Container = styled.div`
  color: #fff;
  background-color: ${(props) => props.color && props.color};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-right: 10px;
  padding: 5px 5px;
  text-transform: uppercase;
`;
