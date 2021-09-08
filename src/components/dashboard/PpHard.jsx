import React, { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PpEasy = () => {
  const { user } = useContext(AuthContext);
  const [hardGame, setHardGame] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [enough, setEnough] = useState(null);
  const [pagi, setPagi] = useState(6);

  useEffect(() => {
    const getHardGame = async () => {
      try {
        const res = await axios.get(
          `https://earup.herokuapp.com/pp?userId=${user._id}&quizLevel=hard`
        );
        if (res.data.length > 6) {
          setEnough(true);
        }

        if (res.data.length > 11) {
          setEnough(res.data.length);
        }

        setHardGame(
          res.data
            .reverse()
            .slice(pagi - 6, pagi)
            .reverse()
        );
      } catch (error) {
        console.log(error);
      }
    };
    getHardGame();
  }, [user._id, pagi]);

  let allData = [];
  let data = {};

  for (let i = 0; i < hardGame.length; i++) {
    let id = "";
    let date = "";
    let quesC = 0;
    let quesD = 0;
    let quesE = 0;
    let quesF = 0;
    let quesG = 0;
    let quesA = 0;
    let quesB = 0;
    let trueC = 0;
    let trueD = 0;
    let trueE = 0;
    let trueF = 0;
    let trueG = 0;
    let trueA = 0;
    let trueB = 0;
    let result = 0;

    for (let j = 0; j < hardGame[i].questionsInfo.length; j++) {
      id = hardGame[i]._id;
      date = hardGame[i].createdAt;
      if (hardGame[i].questionsInfo[j].trueAnswer === "C") {
        quesC++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueC++;
        }
      }
      if (hardGame[i].questionsInfo[j].trueAnswer === "D") {
        quesD++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueD++;
        }
      }
      if (hardGame[i].questionsInfo[j].trueAnswer === "E") {
        quesE++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueE++;
        }
      }
      if (hardGame[i].questionsInfo[j].trueAnswer === "F") {
        quesF++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueF++;
        }
      }
      if (hardGame[i].questionsInfo[j].trueAnswer === "G") {
        quesG++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueG++;
        }
      }
      if (hardGame[i].questionsInfo[j].trueAnswer === "A") {
        quesA++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueA++;
        }
      }
      if (hardGame[i].questionsInfo[j].trueAnswer === "B") {
        quesB++;
        if (hardGame[i].questionsInfo[j].isCorrect) {
          trueB++;
        }
      }
    }

    result = (trueC + trueD + trueE + trueF + trueG + trueA + trueB) * 10;
    data = {
      id,
      date,
      result,
      quesC,
      quesD,
      quesE,
      quesF,
      quesG,
      quesA,
      quesB,
      trueC,
      trueD,
      trueE,
      trueF,
      trueG,
      trueA,
      trueB,
    };
    allData.push(data);
  }

  const percentC = ((100 / selectedData?.quesC) * selectedData?.trueC).toFixed(
    0
  );
  const percentD = ((100 / selectedData?.quesD) * selectedData?.trueD).toFixed(
    0
  );
  const percentE = ((100 / selectedData?.quesE) * selectedData?.trueE).toFixed(
    0
  );
  const percentF = ((100 / selectedData?.quesF) * selectedData?.trueF).toFixed(
    0
  );
  const percentG = ((100 / selectedData?.quesG) * selectedData?.trueG).toFixed(
    0
  );
  const percentA = ((100 / selectedData?.quesA) * selectedData?.trueA).toFixed(
    0
  );
  const percentB = ((100 / selectedData?.quesB) * selectedData?.trueB).toFixed(
    0
  );

  return (
    <UlBox>
      {showModal && (
        <div className="modal">
          <div className="percent-box">
            {selectedData?.quesC === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="one"
                  value={percentC}
                  text={`${percentC}%`}
                />
                <h4>C</h4>
              </div>
            )}
            {selectedData?.quesD === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="two"
                  value={percentD}
                  text={`${percentD}%`}
                />
                <h4>D</h4>
              </div>
            )}
            {selectedData?.quesE === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="three"
                  value={percentE}
                  text={`${percentE}%`}
                />
                <h4>E</h4>
              </div>
            )}
            {selectedData?.quesF === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="three"
                  value={percentF}
                  text={`${percentF}%`}
                />
                <h4>F</h4>
              </div>
            )}
            {selectedData?.quesG === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="three"
                  value={percentG}
                  text={`${percentG}%`}
                />
                <h4>G</h4>
              </div>
            )}
            {selectedData?.quesA === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="three"
                  value={percentA}
                  text={`${percentA}%`}
                />
                <h4>A</h4>
              </div>
            )}
            {selectedData?.quesB === 0 ? null : (
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  className="three"
                  value={percentB}
                  text={`${percentB}%`}
                />
                <h4>B</h4>
              </div>
            )}
          </div>
          <div
            className="close-icon"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      )}
      {allData.reverse().map((d) => (
        <li key={d.id}>
          <div className="out">
            <div
              className="in"
              style={{
                backgroundColor: "#20A39E",
                color: "#FBFFF1",
                width: `${d.result}%`,
              }}
            >
              {d.result}%
            </div>
          </div>
          <div className="game-date">{format(d.date)}</div>
          <div className="detail">
            <button
              onClick={() => {
                setShowModal(true);
                setSelectedData(d);
                console.log(d);
              }}
            >
              See Detail
            </button>
          </div>
        </li>
      ))}
      {enough && (
        <div className="pagi">
          <button
            className={pagi === 6 ? `disabled` : ""}
            style={{
              borderRight: "1px solid #DEDEDE",
              borderLeft: "1px solid #DEDEDE",
              borderTop: "1px solid #DEDEDE",
              borderBottom: "1px solid #DEDEDE",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
            disabled={pagi === 6}
            onClick={() => setPagi((p) => p - 6)}
          >
            Previous
          </button>
          <button
            className={pagi === 6 ? `six` : ""}
            style={{
              borderRight: "1px solid #DEDEDE",
              borderTop: "1px solid #DEDEDE",
              borderBottom: "1px solid #DEDEDE",
            }}
            onClick={() => setPagi(6)}
          >
            1
          </button>
          <button
            className={pagi === 12 && `twosix`}
            style={{
              borderRight: "1px solid #DEDEDE",
              borderTop: "1px solid #DEDEDE",
              borderBottom: "1px solid #DEDEDE",
            }}
            onClick={() => setPagi(12)}
          >
            2
          </button>
          <button
            className={pagi + 1 > enough ? `disabled` : ""}
            style={{
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
              borderRight: "1px solid #DEDEDE",
              borderTop: "1px solid #DEDEDE",
              borderBottom: "1px solid #DEDEDE",
            }}
            disabled={pagi + 1 > enough}
            onClick={() => setPagi((p) => p + 6)}
          >
            Later
          </button>
        </div>
      )}
    </UlBox>
  );
};

export default PpEasy;

const UlBox = styled.div`
  list-style-type: none;
  padding: 0;
  margin: 20px 30px 0 0;
  position: relative;

   .pagi{
    text-align: center;
    margin-top: 30px;

    @media (max-width: 440px) {
    margin-top: 15px  !important;
  }
  
    .disabled {
      cursor: not-allowed;
    }
    
    .six, .twosix, .big , .small  {
      background-color: #DEDEDE;   
    }

    

   button {
      background-color: #fff;
      color: #1E87F2;
      padding: 8px 15px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
   }

    span {
      margin-right: 20px;
    }
  }


  .modal {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    min-height: 400px;
    width: 105%;
    z-index: 100;
    background-color: #fff;
    border: 3px solid #bebebe;
    border-radius: 5px;
    margin-left: -13px;


    .one .CircularProgressbar-path {
      stroke : #FFA500
    }
    .two .CircularProgressbar-path {
      stroke : #4DD6B7
    }
    .three .CircularProgressbar-path {
      stroke : #3DC6FC
    }

    .percent-box {
      display: flex;

      h4 {
        font-size: 24px;
        font-weight: 600;
        margin-top: 20px;
        margin-left: 40px;
      }

      div {
        margin-right: auto;
        margin-left: auto;
        margin-top: 100px;
      }
    }     }

    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 10px;
      margin-right: 10px;

      svg {
        height: 30px;
        width: 30px;
        cursor: pointer;
      }
    }
  }

  li {
    border: 1px solid #ddd;
    margin-top: -1px;
    background-color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .out {
      flex: 7;
      display: flex;
      align-items: center;

      background-color: #80808042;
      margin-left: 20px;
      width: 100%;
      height: 18px;
      border-radius: 8px;
      border: none;
    }

    .in {
      font-size: 14px;
      font-weight: 600;
      padding-left: 20px;
      height: 18px;
      border-radius: 8px;
      border: none;
    }

    .game-date {
      flex: 3;
      display: flex;
      justify-content: center;
    }

    .detail {
      flex: 2;

      button {
        background-color: #FF6584;
        padding: 8px;
        border: none;
        font-size: 13px;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
      }
    }
  
`;
