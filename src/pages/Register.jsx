import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        name,
        surname,
        email,
        password,
      };

      await axios.post(
        "https://earup.herokuapp.com/auth/register",
        registerData
      );
      history.push("/login");
    } catch (err) {
      console.log("error login", err.response);
      setErrorMsg(err.response.data.errorMessage);
    }
  }

  return (
    <RegBox>
      <div className="register">
        <h4>Create your account</h4>
        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
              setErrorMsg("");
            }}
            value={name}
          />
          <input
            type="text"
            placeholder="Surname"
            onChange={(e) => {
              setSurname(e.target.value);
              setErrorMsg("");
            }}
            value={surname}
          />
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
            disabled={!email || !password || !name || !surname}
            style={{
              backgroundColor:
                !email || !password || !name || !surname
                  ? "#665df599"
                  : "#665df5",
              cursor:
                !email || !password || !name || !surname
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Sign Up
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
              to="/"
            >
              Already a member?
              <span
                style={{
                  borderBottom: "2px solid #ff6584",
                  marginLeft: "5px",
                }}
              >
                Log In
              </span>
            </Link>
          </div>
        </form>
      </div>
    </RegBox>
  );
};

export default Register;

const RegBox = styled.div`
  display: flex;
  height: 100vh;

  color: #161617;

  .register {
    margin: 120px auto;
    height: 440px;
    width: 320px;
    padding: 25px;

    .navigation {
      margin-top: 20px;
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
      font-size: 23px;
      font-weight: 600;
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
