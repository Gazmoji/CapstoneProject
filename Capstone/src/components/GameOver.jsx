import { useNavigate } from "react-router-dom";

function GameOver() {
  document.body.className = "gameOverBackground";

  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/");
  };
  return (
    <>
      <h1 className="GameOver">Game Over</h1>
      <div id="gameoverGif">
        <img src="https://64.media.tumblr.com/4eb0459581136fef8e14aa175d80b5d5/tumblr_o45fddGcHq1thw08io1_250.gif" />
      </div>
      <ul>
        <div className="placement2">Name: Filler</div>
        <div className="placement2">Ending: Probably Bad</div>
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

export default GameOver;
