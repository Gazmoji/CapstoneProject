import React from "react";
import Board from "./Board";
import { useState, useEffect } from "react";
import "../../styles/lg.css";

function LightsGame() {
  document.body.className = "backgroundSpace";
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    // Code related to audio playback
    const audio = new Audio(new URL("./SpaceRoute.mp3", import.meta.url));
    audio.loop = true;

    if (audioEnabled) {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [audioEnabled]);

  return (
    <div className="lg">
      <div className="placementButton2">
        <button
          className="buttonAudio"
          onClick={() => setAudioEnabled((prevEnabled) => !prevEnabled)}
        >
          {audioEnabled ? (
            <img
              src="https://www.freeiconspng.com/uploads/sound-off-button-icon-17.png"
              alt="Disable Audio"
              width="42px"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/17/17533.png"
              alt="Enable Audio"
              width="42px"
            />
          )}
        </button>
      </div>
      <h1 className="lg-h1">
        <span className="lg-orange">LIGHTS</span>{" "}
        <span className="lg-blue">OUT</span>
      </h1>
      <Board size={5} chanceLightStartsOn={0.25} />
      <div className="dialogBox2">
        You need to escape your persuer, but you dont know how to fly the ship,
        try to turn off all the lights to activate the jump and get out of
        there!
      </div>
    </div>
  );
}

export default LightsGame;
