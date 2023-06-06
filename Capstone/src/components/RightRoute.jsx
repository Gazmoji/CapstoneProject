import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RightRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const navigate = useNavigate();

  const rightPath = [
    "Throwing caution to the wind, you decide to go on the more dangerous looking path.",
    "Surely the path is not as dangerous as it looks....right? ",
    "As you continue down the path, it starts to rain...a lot.",
    "The wind picked up and you can see it heavily thunderstorming.",
    "You decide it's better to take up shelter in a nearby cave.",
    "Upon entering the cave, you notice it's very dark and having no source of light, you take careful steps.",
    "Until....",
    "*SLIP*",
  ];

  useEffect(() => {
    generateText(rightPath[lineIndex]);

    if (lineIndex >= rightPath.length - 1) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
    // Check if line index is greater than or equal to 8 and update the background image
    if (lineIndex >= 6) {
      setIsImageFading(true);
    }
  }, [lineIndex]);

  const generateText = (line) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= line.length) {
        setGeneratedText(line.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const handleClick = () => {
    if (lineIndex < rightPath.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    }
  };

  const toSnakeGame = () => {
    navigate("/snake");
  };

  useEffect(() => {
    const audio = new Audio(new URL("./ScaryForest.mp3", import.meta.url));
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

  return (
    <div
      className={`container${isFading ? " fade-out" : ""}`}
      style={{
        backgroundImage: isImageFading
          ? "url(https://img.itch.zone/aW1hZ2UvNjMxMzc0LzMzNzEyMDkucG5n/original/eyVjcs.png)" // Replace with the path to your new image
          : "url(https://cdna.artstation.com/p/assets/images/images/002/287/548/large/sandrine-pilloud-160404-i3gamejam-forest.jpg?1459797887)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        transition: isImageFading
          ? "background-image 0.0s ease-in-out"
          : "none",
      }}
    >
      <div className="placementButton2">
        <button
          className="buttonAudio"
          onClick={() => setAudioEnabled((prevEnabled) => !prevEnabled)}
          style={{ backgroundColor: "white" }}
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

      <div>
        <div className="dialogBox">
          <p className="animatedText" onClick={handleClick}>
            {generatedText}
          </p>
        </div>
      </div>
      <div className="nextButtonContainer">
        {showNextButton && (
          <button className="nextButton" onClick={toSnakeGame}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default RightRoute;
