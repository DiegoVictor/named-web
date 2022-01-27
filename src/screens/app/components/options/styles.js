import styled, { css } from "styled-components";

export const Container = styled.div`
  border-top: 1px solid #eee;
  padding: 0px 10px 0px;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.5s;

  ${(props) =>
    props.open &&
    css`
      padding: 10px 10px 15px;
      max-height: 300px;
      height: auto;
    `}

  p {
    color: #babcc6;
    font-size: 14px;
    margin-bottom: 5px;
    padding-left: 5px;
  }
`;


export const Dataset = styled.div`
  align-items: center;
  background-color: ${(props) => (props.selected ? "#eaecf0" : "#fff")};
  border-radius: 8px;
  color: rgb(54, 55, 70);
  cursor: pointer;
  display: flex;
  font-family: Roboto, sans-serif;
  padding: 6px 5px;

  & + p {
    margin-top: 20px;
  }

  &: hover {
    background-color: #eaecf0;
  }

  & + & {
    margin-top: 3px;
  }
`;

export const NotFound = styled.div`
  color: rgba(54, 55, 70, 0.5);
  padding: 6px 5px;
`;
