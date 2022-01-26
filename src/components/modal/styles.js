import styled from "styled-components";

export const Modal = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 8px #888;
  min-width: 600px;
  max-width: 600px;
  overflow: hidden;
  width: 100%;

  @media (max-width: 630px) {
    margin: 0px 15px;
    min-width: auto;
    max-width: auto;
    width: calc(100% - 30px);
  }
`;
