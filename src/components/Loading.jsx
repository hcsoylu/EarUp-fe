import React from "react";
import HomePageSvg from "../components/HomePageSvg";
import styled from "styled-components";

const Loading = () => {
  return (
    <Div>
      <HomePageSvg />
      <p> Loading... </p>
    </Div>
  );
};

export default Loading;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);

  p {
    margin-top: 20px;
    font-size: 24px;
  }

  svg {
    height: 300px;
    width: 300px;

    #Vector_2 {
      display: none;
    }
  }
`;
