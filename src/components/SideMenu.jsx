import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const SideMenu = () => {
  const { setShowSide, getLoggedIn, setUser } = useContext(AuthContext);
  const history = useHistory();

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    setUser({});

    history.push("/login");
    setShowSide(false);
  }

  return (
    <BoxSide>
      <div className="wrapper">
        <span onClick={() => setShowSide(false)}>
          <Link to="/">Home</Link>
        </span>
        <span onClick={() => setShowSide(false)}>
          <Link to="/leaderboard">Leaderboard</Link>
        </span>
        <span onClick={() => setShowSide(false)}>
          <Link to="/pp">Perfect Pitch</Link>
        </span>
        <span onClick={() => setShowSide(false)}>
          <Link to="/dashboard">Dashboard</Link>
        </span>
        <span onClick={logOut}>Logout</span>
      </div>
    </BoxSide>
  );
};

export default SideMenu;

const BoxSide = styled.div`
  z-index: 99;
  top: 0;
  right: 0;
  height: 100vh;
  width: 45%;
  background-color: #ff6584;
  position: fixed;
  color: white;
  @media (min-width: 440px) {
    display: none;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;

    span {
      margin-top: 30px;
      font-size: 18px;

      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;
