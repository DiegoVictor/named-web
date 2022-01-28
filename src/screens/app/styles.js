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
