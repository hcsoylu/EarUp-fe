import React from "react";
import C from "../assests/C.png";
import D from "../assests/D.png";
import E from "../assests/E.png";
import F from "../assests/F.png";
import G from "../assests/G.png";
import A from "../assests/A.png";
import B from "../assests/B.png";

const ButtonGenerator = ({
  setShowImg,
  setIsShown,
  gameLevel,
  noteHandler,
}) => {
  return (
    <div className="button-wrapper">
      {gameLevel.map((name, i) => {
        return (
          <button
            className="each-button"
            key={i}
            value={name}
            onClick={noteHandler}
            onMouseEnter={(e) => {
              setIsShown(true);
              if (name === "C") setShowImg(C);
              if (name === "D") setShowImg(D);
              if (name === "E") setShowImg(E);
              if (name === "F") setShowImg(F);
              if (name === "G") setShowImg(G);
              if (name === "A") setShowImg(A);
              if (name === "B") setShowImg(B);
            }}
            onMouseLeave={() => setIsShown(false)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGenerator;
