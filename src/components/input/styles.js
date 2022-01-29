import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;

  input {
    border: 0px;
    border-radius: 8px;
    color: rgb(54, 55, 70);
    font-family: Roboto, sans-serif;
    font-size: 24px;
    padding: 20px 15px;
    width: 100%;

    &:focus {
      outline: none;
    }

    ${(props) =>
      props.leftIcon &&
      css`
        padding-left: 55px;
      `}

    &::placeholder {
      color: #d7d9db;
    }
  }

  button {
    background-color: transparent;
    border: 0px;
    cursor: pointer;
  }
`;

export const Icon = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0px;
  width: 55px;

  ${(props) =>
    props.left &&
    css`
      left: 0px;
    `}

  ${(props) =>
    props.right &&
    css`
      right: 0px;
    `}
`;
