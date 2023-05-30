import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function NewGame() {
  document.body.className = "background";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const returnBack = () => {
    navigate("/");
  };

  const beginAdventure = () => {
    if (username.trim() === "") {
      setErrorMessage("Please enter a username");
    } else {
      navigate("/game");
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage("");
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
          value={username}
          onChange={handleInputChange}
        />
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="placement">
        <button className="button" onClick={beginAdventure}>
          Begin Adventure
        </button>
      </div>
    </>
  );
}

export default NewGame;
