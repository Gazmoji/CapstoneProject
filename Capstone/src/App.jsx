import React, { useState, useEffect } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import NewGame from "./components/NewGame.jsx";
import "./App.css"; // Import the CSS file

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio("./components/Homepage.mp3");
    audio.loop = true;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    };

    const pauseAudio = () => {
      audio.pause();
    };

    if (audioEnabled) {
      playAudio();
    } else {
      pauseAudio();
    }

    return () => {
      pauseAudio();
    };
  }, [audioEnabled]);

  const toggleAudio = () => {
    setAudioEnabled((prevEnabled) => !prevEnabled);
  };

  const exitGame = () => {
    window.close();
  };

  useEffect(() => {
    if (
      location.pathname === "/leaderboard" ||
      location.pathname === "/newgame"
    ) {
      setAudioEnabled(true);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="placementButton">
        <button className="buttonAudio" onClick={toggleAudio}>
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
      <Route
        path="/"
        element={
          <Homepage
            toggleAudio={toggleAudio}
            exitGame={exitGame}
            audioEnabled={audioEnabled}
          />
        }
      />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/newgame" element={<NewGame />} />
    </>
  );
}

export default App;
