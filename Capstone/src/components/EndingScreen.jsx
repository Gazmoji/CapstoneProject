import { useNavigate } from "react-router-dom";
import "../styles/GameOver.css";

function EndingScreen({ username }) {
  document.body.className = "gameOverBackground";

  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/");
  };
  return (
    <>
      <h1 className="Victory">Victory</h1>
      <div id="gameoverGif">
        <img src="https://media.tenor.com/XtXXwFol9tIAAAAM/twitch-happy.gif" />
      </div>
      <ul>
        <div className="placement2">Name: {username}</div>
        <div className="placement2">Ending: Good!</div>
        <div className="placement2">Score: 200</div>
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
