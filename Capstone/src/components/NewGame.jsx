import { useNavigate } from "react-router-dom";

function NewGame() {
  const navigate = useNavigate();

  const returnBack = () => {
    navigate("/");
  };
  const beginAdventure = () => {
    navigate("/game");
  };
  return (
    <>
      <button className="button" onClick={returnBack}>
        Return
      </button>
      <div className="placementTitle">
        <h2 className="title">Create A Username</h2>
      </div>
      <div className="placement">
        <input
          id="userTextBox"
          type="text"
          name="Username"
          placeholder="Enter Username"
        />
      </div>
      <div className="placement">
        <button className="button" onClick={beginAdventure}>
          Begin Adventure
        </button>
      </div>
    </>
  );
}

export default NewGame;
