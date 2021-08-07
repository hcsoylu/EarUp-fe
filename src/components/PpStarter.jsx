import React, { useContext } from "react";
import Instructions from "./Instructions";
import AuthContext from "../context/AuthContext";

const PpStarter = ({ levelHandler, setLoading, setIsGameStarted }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="starter">
        <h4>{`Welcome ${user.name}!`}</h4>
        <Instructions />
        <div className="select-level">
          <label htmlFor="game-level">Choose a level :</label>

          <select onChange={levelHandler} id="game-level">
            <option value="easy">Easy (C,D,E)</option>
            <option value="normal">Normal (C,D,E,F,G)</option>
            <option value="hard">Hard (C,D,E,F,G,A,B)</option>
          </select>
        </div>
        <button
          className="btn-start"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setIsGameStarted(true);
            }, 1500);
          }}
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default PpStarter;
