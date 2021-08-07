import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import HomePageSvg from "../components/HomePageSvg";

const Home = () => {
  return (
    <HomeBox>
      <div className="wrapper">
        <Navbar />
        <div className="main">
          <div className="main-info">
            <div className="text-info">
              Improve your ear fast and fun way with{" "}
              <span
                style={{
                  paddingBottom: "3px",
                  borderBottom: "3px solid #ff6584",
                }}
              >
                EarUp.{" "}
              </span>
            </div>
          </div>
          <div className="main-svg">
            <HomePageSvg />
          </div>
        </div>
        <div className="copy">
          © 2021 · Huseyin Can Soylu · All rights reserved
        </div>
      </div>
    </HomeBox>
  );
};

export default Home;

const HomeBox = styled.div`
  height: 100vh;

  .copy {
    width: 80%;
    text-align: center;
    margin: 0 auto;
    font-size: 14px;
    color: #505050;
  }

  .main {
    display: flex;
    width: 80%;
    margin: 50px auto;

    .main-info {
      flex: 0.8;
      display: flex;
      align-items: center;

      .text-info {
        font-size: 48px;
      }
    }

    .main-svg {
      flex: 1.2;
      display: flex;
      justify-content: center;
    }
  }
`;
