import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/GameOver.css";

function EndingScreen() {
  const score = useSelector((state) => state.user.score);
  const ending = useSelector((state) => state.user.ending);
  const name = useSelector((state) => state.user.name);

  useEffect(() => {
    document.body.className = "gameOverBackground";
    return () => {
      document.body.className = "";
    };
  }, []);

  const navigate = useNavigate();
  const returnBack = async () => {
    const leaderboardData = {
      name: name,
      ending: ending,
      score: score,
    };
    try {
      const response = await fetch(
        "https://helloworld-0zpo.onrender.com/leaderboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaderboardData),
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
    navigate("/");
  };
  return (
    <>
      <h1 className="Victory">Victory</h1>
      <div id="gameoverGif">
        <img src="https://media.tenor.com/XtXXwFol9tIAAAAM/twitch-happy.gif" />
      </div>
      <ul>
        <div className="placement2">Name: {name}</div>
        <div className="placement2">Ending: {ending}</div>
        <div className="placement2">Score: {score}</div>
      </ul>
      <div id="buttonPlace">
        <button className="button" onClick={returnBack}>
          Return
        </button>
      </div>
    </>
  );
}

export default EndingScreen;
