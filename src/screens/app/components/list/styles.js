import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 490px) {
    margin: 0px 10px;
    width: calc(100% - 20px);
  }
`;
