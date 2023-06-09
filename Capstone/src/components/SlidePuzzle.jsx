import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { upScore, setEnding } from "../store/slices/userSlice";
import "../styles/slider.css";

const getShuffledPuzzle = () => {
  document.body.className = "backgroundCabin";

  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const rowOne = [],
    rowTwo = [],
    rowThree = [];

  while (values.length) {
    const random = Math.floor(Math.random() * values.length);

    if (rowOne.length < 3) {
      rowOne.push(values.splice(random, 1)[0]);
    } else if (rowTwo.length < 3) {
      rowTwo.push(values.splice(random, 1)[0]);
    } else {
      rowThree.push(values.splice(random, 1)[0]);
    }
  }

  return [rowOne, rowTwo, rowThree];
};

const flattenArray = (arr) => {
  return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
};

const getInversionsCount = (arr) => {
  arr = flattenArray(arr).filter((n) => n !== 0);

  const inversions = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const currentValue = arr[i];
    const currentInversions = arr.filter(
      (val, j) => i < j && val < currentValue
    );
    inversions.push(currentInversions.length);
  }

  const inversionsCount = inversions.reduce((total, val) => total + val, 0);

  return inversionsCount;
};

const isSolvable = (puzzle) => {
  return getInversionsCount(puzzle) % 2 === 0;
};

const getPuzzle = () => {
  let puzzle = getShuffledPuzzle();

  while (!isSolvable(puzzle)) {
    puzzle = getShuffledPuzzle();
  }

  return puzzle;
};

export default function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [complete, setComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [sliderEnding, setSliderEnding] = useState("Died in Cabin");

  const dispatch = useDispatch();

  useEffect(() => {
    if (moves === 200) {
      dispatch(setEnding(sliderEnding))
      navigate('/GameOver')
    }
  });

  useEffect(() => {
    // Code related to audio playback
    const audio = new Audio(
      new URL("./Bouncy-Beanstalk-Walk.mp3", import.meta.url)
    );
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

  useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);

  const movePiece = (x, y) => {
    if (!complete) {
      if (checkNeighbours(x, y) || checkNeighbours(x, y, 2)) {
        const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

        const newPuzzle = puzzle.map((row) => row.slice());

        if (x === emptySlot.x && y < emptySlot.y) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y + 1];
          newPuzzle[x][y + 1] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        } else if (x === emptySlot.x && y > emptySlot.y) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y - 1];
          newPuzzle[x][y - 1] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        }

        if (y === emptySlot.y && x < emptySlot.x) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x + 1][y];
          newPuzzle[x + 1][y] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        } else if (y === emptySlot.y && x > emptySlot.x) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x - 1][y];
          newPuzzle[x - 1][y] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        }

        setPuzzle(newPuzzle);

        setMoves(moves + 1);

        checkCompletion(newPuzzle);
      }
    }
  };

  const checkCompletion = (puzzle) => {
    if (flattenArray(puzzle).join("") === "123456780") {
      setComplete(true);
      let score = 0;
      if (moves < 50) {
        score = 1000;
      } else if (moves < 100) {
        score = 750;
      } else if (moves < 150) {
        score = 500;
      } else if (moves < 200) {
        score = 250;
      }
      setScore(score);
    }
  };

  const checkNeighbours = (x, y, d = 1) => {
    const neighbours = [];

    if (puzzle[x][y] !== 0) {
      neighbours.push(
        puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y }
      );
      neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
      neighbours.push(
        puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y }
      );
      neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
    }

    const emptySlot = neighbours.find((el) => typeof el === "object");

    return emptySlot;
  };

  const navigate = useNavigate();

  const leaveCabin = () => {
    dispatch(setEnding(sliderEnding));
    dispatch(upScore(score));
    navigate("/ForestRoute");
  };

  // const resetPuzzle = () => {
  //   setComplete(false);
  //   setPuzzle(getPuzzle());
  //   setMoves(0);
  // };

  return (
    <div className="sliderWrapper">
      {<h3 className="moves">Moves: {moves}</h3>}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "darkgray",
          border: `5px solid ${complete ? "black" : "gray"}`,
          borderRadius: 5,
          padding: 5,
        }}
      >
        {puzzle.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
            }}
          >
            {row.map((col, j) => {
              const color = col === 0 ? "transparent" : "lightgray";
              return (
                <div
                  key={`${i}-${j}`}
                  onClick={() => movePiece(i, j)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 77,
                    height: 77,
                    margin: 2,
                    backgroundColor: color,
                    borderRadius: 5,
                    cursor: complete ? "not-allowed" : "pointer",
                    userSelect: "none",
                  }}
                >
                  <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {col !== 0 && col}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="placementButton2">
        <button
          className="buttonAudio"
          onClick={() => setAudioEnabled((prevEnabled) => !prevEnabled)}
        >
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
      <div className="dialogBox2">
        Instructions: Line up the tiles in numerical order to escape. But be
        warned, you only have 200 moves. You will gain more points the lower
        your move count is.
      </div>
      {complete && (
        <p>
          <button className="playButton" onClick={leaveCabin}>
            Leave Cabin
          </button>
        </p>
      )}
    </div>
  );
}
