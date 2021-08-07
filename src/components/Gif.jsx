import React from "react";

const Gif = ({ score }) => {
  let resultGif = "";

  if (score === 100) {
    resultGif = (
      <img
        style={{ height: "320px", width: "500px", marginBottom: "30px" }}
        src="https://media.giphy.com/media/GStLeae4F7VIs/giphy.gif"
        alt="100"
      />
    );
  }

  if (score === 80 || score === 90) {
    resultGif = (
      <img
        style={{ height: "320px", width: "500px", marginBottom: "30px" }}
        src="https://media.giphy.com/media/G22vVm4jcPeco/giphy.gif"
        alt="80-90"
      />
    );
  }

  if (score === 70 || score === 60) {
    resultGif = (
      <img
        style={{ height: "320px", width: "500px", marginBottom: "30px" }}
        src="https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif"
        alt="70-60"
      />
    );
  }

  if (score === 50 || score === 40) {
    resultGif = (
      <img
        style={{ height: "320px", width: "500px", marginBottom: "30px" }}
        src="https://media.giphy.com/media/xT39CQytimVHdjQlXO/giphy.gif"
        alt="50-40"
      />
    );
  }
  if (score < 40) {
    resultGif = (
      <img
        style={{ height: "320px", width: "500px", marginBottom: "30px" }}
        src="https://media.giphy.com/media/hpRuXgGR5RORZjsLq0/giphy.gif"
        alt="else"
      />
    );
  }

  return <>{resultGif}</>;
};

export default Gif;
