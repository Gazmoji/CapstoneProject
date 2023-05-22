import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [audioEnabled, setAudioEnabled] = useState(false);

  const newGame = () => {
    navigate("/newgame");
  };

  const leaderBoard = () => {
    navigate("/leaderboard");
  };

  useEffect(() => {
    const audio = new Audio(new URL("./Homepage.mp3", import.meta.url));
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

  const toggleAudio = () => {
    setAudioEnabled((prevEnabled) => !prevEnabled);
  };

  const exitGame = () => {
    window.close();
  };

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
      <div className="placementTitle">
        <h2 className="title">Hello World</h2>
      </div>
      <div className="placement">
        <button className="button" onClick={newGame}>
          New Game
        </button>
      </div>
      <div className="placement">
        <button className="button" onClick={leaderBoard}>
          View Leaderboard
        </button>
      </div>
      <div className="placement">
        <button className="button" onClick={exitGame}>
          Exit
        </button>
      </div>
    </>
  );
}

export default Homepage;
