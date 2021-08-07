import React from "react";
import styled, { keyframes } from "styled-components";
import * as Tone from "tone";
import boombox from "../assests/boombox.png";

const BoomBox = ({
  setAnswered,
  setClickedNote,
  setIsShown,
  setLastNote,
  gameLevel,
}) => {
  const synth = new Tone.Synth().toDestination();

  const randomNoteGenarator = () => {
    let notes = gameLevel;
    let randomNote = notes[Math.floor(Math.random() * notes.length)];
    return randomNote;
  };

  function playNote(note) {
    synth.triggerAttackRelease(`${note}4`, "4n");
    setLastNote(note);
  }

  return (
    <BoxBoom>
      <img
        disabled
        className="boombox"
        src={boombox}
        onClick={() => {
          playNote(randomNoteGenarator());
          setAnswered(false);
          setClickedNote(false);
          setIsShown(false);
        }}
        alt="boombox for music note"
      />
    </BoxBoom>
  );
};

export default BoomBox;

const shake = keyframes`
  0% { transform: translate(1px, 1px) scale(1.3) rotate(0deg);  }
  10% { transform: translate(-1px, -2px) scale(1.3) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) scale(1.3) rotate(1deg); }
  30% { transform: translate(3px, 2px) scale(1.3) rotate(0deg); }
  40% { transform: translate(1px, -1px) scale(1.3) rotate(1deg); }
  50% { transform: translate(-1px, 2px) scale(1.3) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) scale(1.3) rotate(0deg); }
  70% { transform: translate(3px, 1px) scale(1.3) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) scale(1.3) rotate(1deg); }
  90% { transform: translate(1px, 2px) scale(1.3) rotate(0deg); }
  100% { transform: translate(1px, -2px) scale(1.3) rotate(-1deg); }
`;

const BoxBoom = styled.div`
  .boombox {
    height: 150px;
    width: 150px;
    cursor: pointer;

    &:hover {
      animation: ${shake} 1s;
      animation-iteration-count: infinite;
    }
  }
`;
