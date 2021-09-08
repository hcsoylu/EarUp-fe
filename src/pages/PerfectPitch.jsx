import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Gif from "../components/Gif";
import Loading from "../components/Loading";
import QuizBar from "../components/QuizBar";
import PpStarter from "../components/PpStarter";
import BoomBox from "../components/BoomBox";
import ButtonGenerator from "../components/ButtonGenerator";

const PerfectPitch = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [lastNote, setLastNote] = useState("");
  const [clickedNote, setClickedNote] = useState("");
  const [answered, setAnswered] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [gameLevel, setGameLevel] = useState(["C", "D", "E"]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [showImg, setShowImg] = useState(null);

  const { user } = useContext(AuthContext);

  async function sendQuizData() {
    try {
      const quizData = {
        quizLevel,
        userId: user._id,
        questionsInfo: quiz,
        score: score,
      };

      await axios.post("https://earup.herokuapp.com/pp", quizData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (quiz.length === 10) {
      sendQuizData();
    }
  }, [quiz.length]);

  const levelHandler = (e) => {
    if (e.target.value === "easy") {
      setGameLevel(["C", "D", "E"]);
    }
    if (e.target.value === "normal") {
      setGameLevel(["C", "D", "E", "F", "G"]);
    }
    if (e.target.value === "hard") {
      setGameLevel(["C", "D", "E", "F", "G", "A", "B"]);
    }
  };

  const noteHandler = (e) => {
    setClickedNote(e.target.value);
    setAnswered(true);

    const answer = {
      trueAnswer: lastNote,
      userAnswer: e.target.value,
    };
    if (lastNote === e.target.value) {
      answer["isCorrect"] = true;
      setQuiz([...quiz, answer]);
      setScore((p) => p + 10);
    } else {
      answer["isCorrect"] = false;
      setQuiz([...quiz, answer]);
    }
  };

  const resultHandler = () => {
    setIsGameStarted(false);
    setLastNote("");
    setClickedNote("");
    setAnswered(false);
    setQuiz([]);
    setGameLevel(["C", "D", "E"]);
    setScore(0);
  };

  let quizLevel = "";
  if (gameLevel.length === 3) quizLevel = "easy";
  if (gameLevel.length === 5) quizLevel = "normal";
  if (gameLevel.length === 7) quizLevel = "hard";

  return (
    <BoxPerfectPitch>
      {!isGameStarted && !loading && (
        <PpStarter
          levelHandler={levelHandler}
          setLoading={setLoading}
          setIsGameStarted={setIsGameStarted}
        />
      )}
      {quiz.length === 10 ? (
        <div className="showResult">
          <p>Your score is {score}</p>
          <Gif score={score} />
          <div>
            <button onClick={resultHandler}>Play Again!</button>
          </div>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        isGameStarted && (
          <div className="big-wrapper">
            <div className="questions">
              <div className="quiz-top">
                <BoomBox
                  setAnswered={setAnswered}
                  setClickedNote={setClickedNote}
                  setIsShown={setIsShown}
                  setLastNote={setLastNote}
                  gameLevel={gameLevel}
                />
              </div>
            </div>

            {lastNote && (
              <div className="button-box">
                {!answered && (
                  <ButtonGenerator
                    setShowImg={setShowImg}
                    setIsShown={setIsShown}
                    gameLevel={gameLevel}
                    noteHandler={noteHandler}
                  />
                )}
                {isShown && !answered && (
                  <img
                    style={{ width: "200px", marginTop: "30px" }}
                    src={showImg}
                    alt="different notes"
                  />
                )}
              </div>
            )}
            {(answered || (!lastNote && !clickedNote)) && (
              <div className="test-break">
                <span>
                  Click boombox <br /> for random note
                </span>
              </div>
            )}
            <QuizBar quiz={quiz} />
          </div>
        )
      )}
    </BoxPerfectPitch>
  );
};

export default PerfectPitch;

const BoxPerfectPitch = styled.div`
  text-align: center;
  height: calc(100vh - 60px);
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  .big-wrapper {
    position: relative;
    height: calc(100vh - 60px);
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .button-wrapper {
    margin-top: 60px;
    margin-bottom: 30px;

    .each-button {
      background-color: #fece54;
      font-size: 20px;
      font-weight: 600;
      color: white;
      padding: 10px 18px;
      border: none;
      border-radius: 4px;

      &:hover {
        cursor: pointer;
        background-color: #ac92ec;
      }
    }
  }

  .starter {
    .btn-start {
      background-color: #665df5;
      border: none;
      color: #fff;
      border-radius: 4px;
      padding: 9px 14px;
      cursor: pointer;
      font-size: 14px;
    }

    h4 {
      font-size: 23px;
      font-weight: 600;
      padding: 40px 0;
    }

    .select-level {
      margin: 40px 0;

      @media (max-width: 440px) {
        margin: 50px 0;
      }

      label {
        font-size: 18px;
        font-weight: 500;
        margin-right: 15px;
      }

      select {
        padding: 4px;
        border: 2px solid rgb(63 61 86);
        border-radius: 5px;
        width: 210px;
        outline: none;
        @media (max-width: 440px) {
          margin-top: 15px;
        }
      }
    }
  }

  .test-break {
    margin-top: 80px;
    font-size: 32px;
    font-weight: 500;
  }

  .questions {
    padding-top: 50px;
  }

  .showResult {
    padding-top: 40px;

    p {
      color: #161617;
      font-size: 23px;
      font-weight: 600;
      margin-bottom: 30px;
    }

    button {
      background-color: #665df5;
      border: none;
      color: #fff;
      border-radius: 4px;
      padding: 9px 14px;
      cursor: pointer;
      font-size: 14px;
    }
  }

  .button-box {
    margin-top: 30px;

    button {
      padding: 10px 20px;
      margin: 10px;
    }
  }
`;
