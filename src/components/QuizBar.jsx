import React from "react";
import styled from "styled-components";

const QuizBar = ({ quiz }) => {
  return (
    <BoxQuiz>
      <div className="bar-out">
        <div className="bar-in" style={{ width: `${quiz.length * 10}%` }}></div>
      </div>
      <p>Question: {quiz.length + 1} of 10</p>
    </BoxQuiz>
  );
};

export default QuizBar;

const BoxQuiz = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  .bar-out {
    height: 7px;
    border-radius: 4px;
    width: 350px;
    background: #80808042;

    .bar-in {
      height: 7px;
      border-radius: 4px;
      background: #ac92ec;
    }
  }

  p {
    margin-top: 20px;
  }
`;
