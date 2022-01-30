import { createGlobalStyle } from 'styled-components';

export const Styles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    font-family: Roboto, sans-serif;
    margin: 0px;
  }

  #root {
    align-items: center;
    background-color: #e5e6ed;
    display: flex;
    justify-content: center;
  }
`;
