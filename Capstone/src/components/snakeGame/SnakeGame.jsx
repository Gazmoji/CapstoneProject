import React, { useState, useRef, useEffect } from "react";
import "../../styles/snake.css";
import { useInterval } from "./useInterval";
import { useNavigate } from "react-router-dom";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";

function SnakeGame() {
  document.body.className = "backgroundCave";
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [applesCollected, setApplesCollected] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true)
  const [attempts, setAttempts] = useState(3)
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Code related to audio playback
    const audio = new Audio(new URL("./CaveGame.mp3", import.meta.url));
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

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
    setApplesCollected(0)
    setScore(0)

  }
  
  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
    setAttempts(prevAttempts => prevAttempts - 1)
  }
  
  useEffect(() => {
    if (attempts === 0) {
      navigate('/game-over')
    } else if (attempts <= 2) {
      setFirstAttempt(false)
    }
  }, [attempts])

  const moveSnake = ({ keyCode }) => keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])
  
  const createApple = () => 
    apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i]) / SCALE));
  
  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setApplesCollected((prev) => prev + 1);
      setScore((prev) => prev + 100);
      if (applesCollected === 19) {
        setGameWon(true);
      }
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);

    if (applesCollected === 20) {
      endGame();
    }
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = "#45a049";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useInterval(() => gameLoop(), speed);

  const leaveCave = () => {
    navigate("/");
  };

  return (
    <div
      className="canvasWrapper"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => moveSnake(e)}
    >
      <div className="score">Score: {score}</div>
      <canvas
        style={{ border: "3px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
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
        Instructions: Gather your belongings (The Red Dots) without hitting the
        wall or yourself (The Green Line) Reach a score of 2000 to proceed. But
        be warned, you only have 3 attempts.
      </div>
      {gameOver && !gameWon && <div className="gameOver">GAME OVER</div>}
      {gameWon && (
        <div className="gameWon">
          <p>Congratulations!</p>
          <button className="nextButton" onClick={leaveCave}>
            Leave The Cave
          </button>
        </div>
      )}
      {firstAttempt ? (
        <button className='snakeButton' onClick={startGame}>Start Game</button>
      ) : (
        <button className='snakeButton' onClick={startGame}>Try Again</button>
      )}
    </div>
  );
}

export default SnakeGame;
