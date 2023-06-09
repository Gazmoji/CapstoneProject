import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function Leaderboard() {
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/");
  };
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://helloworld-0zpo.onrender.com/leaderboard"
        );
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <button className="button" onClick={returnBack}>
        Return
      </button>
      <div className="placementTitle">
        <h3 className="title">Top Scores</h3>
      </div>
      <ul>
        <b>
          {leaderboard.map((item) => (
            <li key={item.id}>
              {item.name} - {item.ending} - {item.score}
            </li>
          ))}
        </b>
      </ul>
    </>
  );
}

export default Leaderboard;
