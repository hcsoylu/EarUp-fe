import axios from "axios";
import React, { useContext } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

const Navbar = () => {
  const { getLoggedIn, setUser, setShowSide } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    setUser({});

    history.push("/login");
  }

  return (
    <NavBox>
      <div className="wrapper">
        <Link className="logo" to="/">
          EarUp
        </Link>

        <ul>
          <NavLink
            activeStyle={{
              color: "#665df5",
            }}
            style={{
              textDecoration: "none",
              color: "#505050",
            }}
            to="/leaderboard"
          >
            Leaderboard
          </NavLink>
          <NavLink
            activeStyle={{
              color: "#665df5",
            }}
            style={{
              textDecoration: "none",
              color: "#505050",
              marginLeft: "15px",
            }}
            to="/pp"
          >
            Perfect Pitch
          </NavLink>
          <NavLink
            activeStyle={{
              color: "#665df5",
            }}
            style={{
              textDecoration: "none",
              marginLeft: "15px",
              color: "#505050",
            }}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <button className="logout" onClick={logOut}>
            Log out
          </button>
        </ul>
        <div className="hamburger-menu" onClick={() => setShowSide(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
      </div>
    </NavBox>
  );
};

export default Navbar;

const NavBox = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  box-shadow: 0 1px 2px rgb(16 16 17 / 2%), 0 3.4px 8px rgb(16 16 17 / 1%),
    0 12px 30px rgb(16 16 17 / 0%);

  .wrapper {
    display: flex;
    width: 80%;
    margin: 0 auto;

    @media (max-width: 440px) {
      width: 100%;
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .hamburger-menu {
      @media (min-width: 440px) {
        display: none;
      }

      svg {
        @media (max-width: 440px) {
          height: 30px;
          width: 30px;
        }
      }
    }

    .logo {
      color: #161617;
      font-weight: 900;
      font-size: 28px;
      cursor: pointer;
      text-decoration: none;

      @media (max-width: 440px) {
        width: 100%;
        font-size: 28px;
      }
    }

    ul {
      display: flex;
      align-items: center;
      margin-left: auto;

      @media (max-width: 440px) {
        display: none;
      }

      span {
        margin-right: 15px;
        margin-left: 15px;
      }

      .logout {
        background-color: #665df5;
        border: none;
        color: #fff;
        border-radius: 4px;
        padding: 7px 14px;
        margin-left: 15px;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
`;
