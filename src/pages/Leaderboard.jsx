import React, { useEffect, useState } from "react";
import styled from "styled-components";
import crowns from "../assests/crowns.svg";
import podium from "../assests/podium.svg";
import axios from "axios";
const LeaderBoard = () => {
  const [data, setData] = useState();

  const [show, setShow] = useState("easy");

  useEffect(() => {
    const getList = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/auth/leaderboard/${show}`
      );

      setData(data);
    };

    getList();
  }, [show]);

  return (
    <BoxLb>
      <div className="left">
        <div className="img-container">
          <div className="w-3">
            <img className="three" src={data && data[2].avatar} alt="" />
          </div>
          <div className="w-1">
            <span>
              <img
                src={crowns}
                alt=""
                style={{ height: "30px", width: "30px" }}
              />
            </span>
            <img className="one" src={data && data[0].avatar} alt="" />
          </div>
          <div className="w-2">
            <img className="two" src={data && data[1].avatar} alt="" />
          </div>
        </div>
        <div className="podium">
          <img
            src={podium}
            alt=""
            style={{ height: "260px", marginTop: "90px", width: "320px" }}
          />
        </div>
      </div>
      <div className="right">
        <div
          style={{
            border: "2px solid pink",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <span
            style={{ marginRight: "20px", cursor: "pointer" }}
            className={show === "easy" ? `border-bottom` : null}
            onClick={() => setShow("easy")}
          >
            EASY
          </span>
          <span
            style={{ marginRight: "20px", cursor: "pointer" }}
            onClick={() => setShow("normal")}
            className={show === "normal" ? `border-bottom` : null}
          >
            NORMAL
          </span>
          <span
            style={{ marginRight: "20px", cursor: "pointer" }}
            onClick={() => setShow("hard")}
            className={show === "hard" ? `border-bottom` : null}
          >
            HARD
          </span>
        </div>
        <div className="table">
          <div className="title">
            <div className="lb">Leaderboard</div>
            <div className="top">TOP 5</div>
          </div>
          {data &&
            data.map((d, i) => {
              return (
                <div className="list-item" key={i}>
                  <div className="index">{i + 1}</div>
                  <div className="avatar">
                    <img
                      src={d.avatar}
                      alt=""
                      style={{
                        height: "36px",
                        width: "36px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <span className="name-surname">
                    {d.name} {d.surname}
                  </span>
                  <div className="point">
                    {show === "easy" && `%${d.easyAvg.toFixed(0)}`}
                    {show === "normal" && `%${d.normalAvg.toFixed(0)}`}
                    {show === "hard" && `%${d.hardAvg.toFixed(0)}`}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </BoxLb>
  );
};

export default LeaderBoard;

const BoxLb = styled.div`
  text-align: center;
  height: calc(100vh - 60px);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  display: flex;

  @media (max-width: 440px) {
    flex-direction: column;
    margin: 0;
    padding: 30px;
    width: 100%;
  }

  .left {
    flex: 0.8;
    display: flex;
    flex-direction: column;
    margin-right: 40px;
    margin-top: 5px;

    @media (max-width: 440px) {
      margin: 0;
    }

    .podium {
      @media (max-width: 440px) {
        margin-bottom: 80px;
      }
    }

    .img-container {
      display: flex;
      justify-content: space-around;
      padding-top: 50px;
      width: 100%;

      @media (max-width: 440px) {
        padding-top: 0;
      }

      .w-1 {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;

        .king {
          height: 30px;
          width: 30px;
        }
      }

      img {
        border-radius: 50%;
      }

      .one {
        height: 120px;
        width: 120px;
        border: 4px solid orange;
      }

      .two {
        border: 4px solid #3dc6fc;
        margin-left: 20px;
      }

      .three {
        border: 4px solid #4dd6b7;
        margin-right: 20px;
      }

      .two,
      .three {
        height: 100px;
        width: 100px;
        margin-top: 50px;
      }
    }
  }

  .right {
    flex: 1.2;

    .border-bottom {
      border-bottom: 3px solid #000000;
      padding-bottom: 10px;
      font-weight: 600;
    }

    .table {
      display: flex;
      flex-direction: column;
      padding-top: 30px;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 33px;

        .lb {
          font-size: 20px;
          font-weight: 500;
          padding-bottom: 5px;
        }

        .top {
          background-color: #ff6584;
          color: white;
          height: 35px;
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          border-radius: 4px;
        }
      }

      .list-item {
        display: flex;
        align-items: center;
        margin-top: 40px;
        height: 50px;
        border-bottom: 1px solid black;
        padding-bottom: 20px;

        .index {
          flex: 1;
          font-size: 18px;
          font-weight: 600;
        }

        .avatar {
          flex: 1;
        }

        .name-surname {
          flex: 3;
          font-size: 16px;
          font-weight: 600;
        }

        .point {
          flex: 1;
          font-weight: 600;
        }
      }
    }
  }
`;
