import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/");
  };
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8080/leaderboard");
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
      <h3 className="title">Top Scores</h3>
      <ul>
        {leaderboard.map((item) => (
          <li key={item.id}>
            {item.name} - {item.ending} - {item.score}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Leaderboard;
