import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  font-size: 20px;
  margin-top: 20px;
  max-width: 600px;

  p {
    color: #999;
    font-size: 19px;
    padding-left: 10px;

    @media (max-width: 455px) {
      margin: 0px 10px 20px;
      width: calc(100% - 20px);
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 40px 0px 20px;
  padding-right: 10px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button`
  align-items: center;
  background-color: #ddd;
  border: 0px;
  border-radius: 16px;
  color: #999;
  cursor: pointer;
  display: flex;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  height: 39px;
  margin-right: 10px;
  opacity: 0.8;
  padding: 10px 12px;

  > span {
    margin-right: 8px;
  }

  svg {
    margin-right: 5px;

    ${(props) =>
      props.$rotate &&
      css`
        animation: ${rotate} 1s linear infinite;
      `}

    path {
      stroke: #666;
    }
  }
`;
