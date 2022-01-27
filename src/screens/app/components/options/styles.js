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

export const File = styled.div`
  background-color: #ddd;
  border-radius: 8px;
  color: #888;
  margin-bottom: 5px;
  opacity: 0.5;
  position: relative;
  width: 100%;

  > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 8px 15px 8px 10px;

    > div {
      align-items: center;
      display: flex;
    }

    span {
      margin-left: 8px;
    }

    a,
    a:visited {
      color: rgb(0, 102, 204);
      font-size: 14px;
      position: absolute;
      right: 15px;
      top: 11px;
    }
  }

  input {
    border-radius: 8px;
    cursor: pointer;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    width: 100%;
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
