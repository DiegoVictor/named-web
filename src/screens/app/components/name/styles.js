import styled from "styled-components";

export const Container = styled.div`
  > span {
    align-items: center;
    background-color: rgb(54, 55, 70);
    border-radius: 16px;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 17;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px 12px 5px 8px;

    > span {
      margin-left: 5px;
    }
  }
`;
