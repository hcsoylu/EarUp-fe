import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { getLoggedIn, getUser } = useContext(AuthContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("https://earup.herokuapp.com/auth/login", loginData);

      await getLoggedIn();

      await getUser();

      history.push("/home");
    } catch (err) {
      console.log("error login", err.response);
      setErrorMsg(err.response.data.errorMessage);
    }
  }

  return (
    <LogBox>
      <div className="login">
        <h4>Log in to EarUp</h4>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg("");
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg("");
            }}
            value={password}
          />
          <button
            type="submit"
            disabled={!email || !password}
            style={{
              backgroundColor: !email || !password ? "#665df599" : "#665df5",
              cursor: !email || !password ? "not-allowed" : "pointer",
            }}
          >
            Sign In
          </button>
          {errorMsg && (
            <small
              style={{
                color: "#ff0033",
                paddingTop: "10px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {errorMsg}
            </small>
          )}
          <div className="navigation">
            <Link
              style={{
                textDecoration: "none",
                color: "#161617",
                fontWeight: "500",
                width: "100%",
              }}
              to="/register"
            >
              Don't have an account yet?
              <span
                style={{
                  borderBottom: "2px solid #ff6584",
                  marginLeft: "5px",
                }}
              >
                Sign up
              </span>
            </Link>
          </div>
        </form>
      </div>
      <div></div>
    </LogBox>
  );
};

export default Login;

const LogBox = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
  color: #161617;

  .login {
    margin: 120px auto;
    height: 340px;
    width: 320px;
    padding: 25px;

    .navigation {
      margin-top: 25px;
      text-align: center;

      @media (max-width: 576px) {
        margin-top: 25px;
      }
    }

    small {
      @media (max-width: 576px) {
        margin-top: 15px;
        font-size: 15px;
      }
    }

    h4 {
      font-weight: 600;
      font-size: 31px;
    }

    @media (max-width: 576px) {
      margin: 0;
      height: 100vh;
      width: 100%;
      border-radius: 0;
      padding-top: 30%;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    input {
      margin-top: 20px;
      padding: 10px 10px;
      border-radius: 5px;
      border: 1.5px solid #808080;
      font-size: 14px;

      &:focus {
        outline: none !important;
        border: 2px solid #665df5;
      }

      &::placeholder {
        color: #161617;
        padding-left: 5px;
        font-size: 14px;
      }
    }

    button {
      margin-top: 20px;
      padding: 10px 0;
      border-radius: 5px;
      color: #fdfdfd;
      border: none;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
