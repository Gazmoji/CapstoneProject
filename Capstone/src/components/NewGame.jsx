import { useNavigate } from "react-router-dom";

function NewGame() {
  const navigate = useNavigate();

  const returnBack = () => {
    navigate("/");
  };
  return (
    <>
      <button className="button" onClick={returnBack}>
        Return
      </button>
      <h2 className="title">Create A Username</h2>
    </>
  );
}

export default NewGame;
