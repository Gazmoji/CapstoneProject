import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BeginGame() {
  const navigate = useNavigate();

  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const option1 = "Option 1";
  const option2 = "Option 2";

  const handleOption1 = () => {
    navigate("/ForestRoute");
  };

  const handleOption2 = () => {
    navigate("/CabinRoute");
  };

  useEffect(() => {
    const audio = new Audio(new URL("./Forest.mp3", import.meta.url));
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

  const toggleAudio = () => {
    setAudioEnabled((prevEnabled) => !prevEnabled);
  };

  const beginGame = () => {
    setIsFading(true);
    setIsImageFading(true);
    setTimeout(() => {
      setIsFading(false);
      setGeneratedText("");
      generateText(secondLinesOfText[0]);
      setLineIndex(linesOfText.length); // Start at the index where secondLinesOfText begins
    }, 1000); // Adjust the duration of the fade effect (in milliseconds)
  };

  const linesOfText = [
    "You awaken in a mysterious forest unsure of how you arrived there, scared and lost.",
    "You are extremely confused, as you don't recognize anything around you.",
    "You feel uneasy and unsafe, all around you are strange noises.",
    "So, pushing past your fear, you stand up determined to find your way out.",
  ];

  const secondLinesOfText = [
    "As you continue to walk, you can see a cabin a little off the path to the right.",
    "Your intuition tells you to ignore it and stay on the path into the forest.",
    "But there could also be people in there that could help you figure out what's going on...",
    "You need to make a choice, go into the cabin or continue on the path...",
  ];

  const generateText = (line) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= line.length) {
        setGeneratedText(line.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (line === secondLinesOfText[secondLinesOfText.length - 1]) {
          setGeneratedText(line + "\n\n" + option1 + "\n\n" + option2);
        }
      }
    }, 30); // Adjust the interval speed as needed
  };

  const handleClick = () => {
    if (lineIndex < linesOfText.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    } else if (lineIndex === linesOfText.length - 1) {
      setGeneratedText("");
      generateText(secondLinesOfText[0]);
      setLineIndex(lineIndex + 1);
    } else if (lineIndex === linesOfText.length) {
      if (lineIndex < linesOfText.length + secondLinesOfText.length - 1) {
        setGeneratedText("");
        generateText(secondLinesOfText[lineIndex - linesOfText.length]);
        setLineIndex(lineIndex + 1);
      } else {
        // Logic for handling the options
        if (lineIndex === linesOfText.length + secondLinesOfText.length - 1) {
          // Logic for handling the options
          if (generatedText === option1) {
            handleOption1();
          } else if (generatedText === option2) {
            handleOption2();
          }
        }
      }
    } else if (
      lineIndex > linesOfText.length &&
      lineIndex < linesOfText.length + secondLinesOfText.length - 1
    ) {
      setGeneratedText("");
      generateText(secondLinesOfText[lineIndex - linesOfText.length]);
      setLineIndex(lineIndex + 1);
    } else {
      beginGame();
    }
  };

  useEffect(() => {
    if (lineIndex === linesOfText.length - 1) {
      setIsClickable(true);
    } else {
      setIsClickable(false);
    }
    if (lineIndex < linesOfText.length) {
      setGeneratedText("");
      generateText(linesOfText[lineIndex]);
    } else if (lineIndex === linesOfText.length) {
      setGeneratedText("");
      generateText(secondLinesOfText[0]);
    } else if (
      lineIndex > linesOfText.length &&
      lineIndex < linesOfText.length + secondLinesOfText.length
    ) {
      setGeneratedText("");
      generateText(secondLinesOfText[lineIndex - linesOfText.length]);
    }
  }, [lineIndex]);

  return (
    <>
      <div
        className={`container${isFading ? " fade-out" : ""}`}
        style={{
          backgroundImage: isImageFading
            ? "url(https://media.tenor.com/9WBEzfL3eg4AAAAC/video-game-cabin.gif)" // Replace with the path to your new image
            : "none", // Replace with the path to your original image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="placementButton2">
          <button className="buttonAudio" onClick={toggleAudio}>
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

        {lineIndex === linesOfText.length + secondLinesOfText.length - 1 && (
          <>
            <div className="optionsContainer">
              <button className="nextButton" onClick={handleOption1}>
                Continue into the Forest
              </button>
            </div>
            <div className="optionsContainer">
              <button className="nextButton" onClick={handleOption2}>
                Check Out the Cabin
              </button>
            </div>
          </>
        )}
        <div className="dialogBox">
          {lineIndex > 0 ? (
            <p
              className={`animatedText${
                lineIndex === linesOfText.length - 1 ||
                lineIndex === linesOfText.length + secondLinesOfText.length - 1
                  ? " disable-click"
                  : ""
              }`}
              onClick={handleClick}
            >
              {lineIndex < linesOfText.length
                ? linesOfText[lineIndex].slice(0, generatedText.length)
                : secondLinesOfText[lineIndex - linesOfText.length].slice(
                    0,
                    generatedText.length
                  )}
            </p>
          ) : (
            <p className="animatedText" onClick={handleClick}>
              {generatedText}
            </p>
          )}
        </div>
        {lineIndex === linesOfText.length - 1 && (
          <button className="nextButton" onClick={beginGame}>
            Begin
          </button>
        )}
      </div>
    </>
  );
}

export default BeginGame;
