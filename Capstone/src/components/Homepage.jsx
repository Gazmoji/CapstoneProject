import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const newGame = () => {
    navigate("/newgame");
  };

  useEffect(() => {
    const audio = new Audio("/Homepage.mp3");
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  const exitGame = () => {
    window.close();
  };

  return (
    <>
      <div className="placementTitle">
        <h2 className="title">Filler Title</h2>
      </div>
      <div className="placement">
        <button className="button" onClick={newGame}>
          New Game
        </button>
      </div>
      <div className="placement">
        <button className="button">View Leaderboard</button>
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
