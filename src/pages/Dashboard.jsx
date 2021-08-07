import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import MajMin from "../components/dashboard/MajMin";
import PpEasy from "../components/dashboard/PpEasy";
import PpNormal from "../components/dashboard/PpNormal";
import PpHard from "../components/dashboard/PpHard";
import axios from "axios";

const typesEx = ["Perfect Pitch"];
const gameLevelPp = ["Easy", "Normal", "Hard"];

const Dashboard = () => {
  const { user, getUser } = useContext(AuthContext);
  const [activeEx, setActiveEx] = useState(typesEx[0]);
  const [activeLvl, setActiveLvl] = useState(gameLevelPp[0]);
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [avatar, setAvatar] = useState(null);

  console.log(name, surname);

  async function editUser(e) {
    e.preventDefault();

    if (name === "") setName(user.name);
    if (surname === "") setSurname(user.surname);

    const editUserData = {
      name,
      surname,
    };

    if (avatar) {
      const data = new FormData();
      data.append("image", avatar);
      editUserData.avatar = avatar;

      try {
        await axios.put("http://localhost:5000/auth/me", data);
        getUser();
        setEditProfile(false);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.put("http://localhost:5000/auth/me", editUserData);
      getUser();
      setEditProfile(false);
    } catch (err) {
      console.log("error login", err.response);
    }
  }

  return (
    <Dbox>
      <div className="wrapper">
        <div className="profile">
          <div className="profile-cart">
            <img src={user.avatar} alt="user info" />
            <p>{` ${user.name} ${user.surname}`}</p>
            {!editProfile ? (
              <button onClick={() => setEditProfile(true)}>Edit profile</button>
            ) : (
              <form
                onSubmit={editUser}
                className="edit-section"
                style={{ width: "200px" }}
              >
                <label
                  htmlFor="pic"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>Change profile photo:</span>
                  <span>
                    <svg
                      style={{
                        height: "30px",
                        width: "30px",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-camera"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                  </span>
                </label>

                <input
                  id="pic"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                />
                <label htmlFor="surname">Surname</label>
                <input
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                  id="surname"
                  type="text"
                  placeholder="Surname"
                />
                <div className="button-group">
                  <button type="submit" className="save">
                    Save
                  </button>
                  <button
                    onClick={() => setEditProfile(false)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="right-side">
          <div className="exercises">
            {typesEx.map((type, i) => (
              <Tab
                key={i}
                activeEx={activeEx === type}
                onClick={() => setActiveEx(type)}
              >
                {type}
              </Tab>
            ))}
          </div>
          <div className="game-results">
            {activeEx === typesEx[0] && (
              <div className="pp-results">
                {gameLevelPp.map((type, i) => (
                  <LevelPp
                    key={i}
                    activeLvl={activeLvl === type}
                    onClick={() => setActiveLvl(type)}
                  >
                    {type}
                  </LevelPp>
                ))}
                <div className="pp-gamelevel">
                  {activeLvl === "Easy" && <PpEasy />}
                  {activeLvl === "Normal" && <PpNormal />}
                  {activeLvl === "Hard" && <PpHard />}
                </div>
              </div>
            )}
            {activeEx === typesEx[1] && <MajMin />}
          </div>
        </div>
      </div>
    </Dbox>
  );
};

export default Dashboard;

const Tab = styled.button`
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  ${({ activeEx }) =>
    activeEx &&
    `
    border-bottom: 2px solid #ff6584;
    opacity: 1;
  `}
`;

const LevelPp = styled.button`
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  ${({ activeLvl }) =>
    activeLvl &&
    `
    border-bottom: 2px solid #665df5;
    opacity: 1;
  `}
`;

const Dbox = styled.div`
  margin: 0 auto;
  width: 80%;

  height: calc(100vh - 60px);

  .wrapper {
    padding-top: 10px;
    display: flex;

    .profile {
      flex: 3;
      display: flex;
      justify-content: center;

      .profile-cart {
        margin-top: 15px;
        height: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          margin-top: 30px;
          height: 200px;
          width: 200px;
          border-radius: 50%;
          object-fit: cover;
        }

        p {
          margin-top: 20px;
          color: #161617;
          font-weight: 600;
        }

        button {
          margin-top: 20px;
          width: 80%;
          padding: 5px;
          background-color: #1e87f2;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-section {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          width: 100%;

          .button-group {
            display: flex;
            width: 80%;
            button {
              margin-right: 10px;
            }

            .save {
              background-color: #2c974b;
            }

            .cancel {
              background-color: #f3f4f6;
              color: black;
              border: 1px solid grey;
            }
          }

          label,
          input {
            margin-top: 10px;
          }

          label {
            color: black;
            font-size: 14px;
            font-weight: 600;
          }

          input {
            padding: 5px 7px;
            border-radius: 5px;
            border: 1.5px solid #808080;
            font-size: 14px;

            &:focus {
              outline: none !important;
              border: 2px solid #665df5;
            }

            &::placeholder {
              color: grey;
              padding-left: 5px;
              font-size: 14px;
            }
          }
        }
      }
    }

    .right-side {
      flex: 9;
      margin-left: 20px;
      .exercises {
        margin-top: 15px;
        text-align: center;

        span {
          margin-right: 25px;
        }
      }

      .game-results {
        margin-top: 20px;

        .pp-results {
          .pp-gamelevel {
            margin-top: 15px;
          }
        }
      }
    }
  }
`;
