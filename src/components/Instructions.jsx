import React from "react";
import musicNote from "../assests/music-note.svg";
import styled from "styled-components";

const Instructions = () => {
  return (
    <BoxIns>
      <h5>Instructions</h5>
      <div className="instruction">
        <img src={musicNote} alt="svg for Instructions" />
        <p>
          In this exercise, you will hear a single note randomly. Your goal is
          to identify the name of the note.
        </p>
      </div>
      <div className="instruction">
        <img src={musicNote} alt="svg for Instructions" />
        <p>
          This quiz consists of 10 questions and each question is worth 10
          points.
        </p>
      </div>
    </BoxIns>
  );
};

export default Instructions;

const BoxIns = styled.div`
  width: 520px;
  height: 200px;
  padding: 20px;
  background-color: #e6e6e6;
  border: 3px solid #3f3d56;
  border-radius: 15px;
  margin: 0 auto;

  @media (max-width: 650px) {
    width: 100%;
  }

  h5 {
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    padding-left: 25px;
    margin-bottom: 10px;
  }

  .instruction {
    display: flex;
    align-items: center;
    text-align: left;
    padding: 15px 0;

    img {
      height: 20px;
      width: 20px;
    }

    p {
      font-size: 14px;
      padding-left: 5px;
      font-weight: 600;
      line-height: 18px;
    }
  }
`;
