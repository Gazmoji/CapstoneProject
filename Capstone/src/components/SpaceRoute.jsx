import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpaceRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [showButton, setShowButton] = useState(false)

  const navigate = useNavigate()

  const spaceEnding = [
    "Knowing that the sensation of being pursued held more substance than mere intuition, you decided to sneak into the space station.",
    "Managing to climb the fence and go into the restricted areas housing the spacecraft, you decide to take refuge.",
    "That's when you finally came to the realization that it wasn't just a hunch, there was a man in a black sweatshirt following you.",
    "and he was fast....and chasing you!",
    "Having no idea why you were being pursued, you panicked and jumped into one of the spacecrafts.",
    " However, to your dismay, it became evident that your pursuer knew you were inside. You started the spacecraft and revved the engine up.",
    "Ascending into the sky, you finally take a sigh of relief knowing that there was no way he could possibly chase you now.",
    "That's when you noticed there was a spaceship behind you. He was actually chasing you into space.",
  ];

  useEffect(() => {
    generateText(spaceEnding[lineIndex]);

    if (lineIndex >= 1) {
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
    }, 40);
  };

  useEffect(() => {
    const audio = new Audio(new URL("./ChasingMusic.mp3", import.meta.url));
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

  const handleClick = () => {
    if (lineIndex < spaceEnding.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
      setShowButton(false)
    } else {
      setShowButton(true)
    }
  };

  const next = () => {
    navigate('/lights')
  }

  return (
    <div
      className={`container${isFading ? " fade-out" : ""}`}
      style={{
        backgroundImage: isImageFading
          ? "url(https://preview.redd.it/6g0zbuqorrk11.jpg?auto=webp&s=4bd8eb886c689283603f412478ddf3384e8c3ef3)" // Replace with the path to your new image
          : "url(https://preview.redd.it/enchanted-forest-past-poem-and-prompt-in-comments-v0-7wj8gos7hv9a1.png?width=640&crop=smart&auto=webp&s=839fa1ee011c7bef845d0194af9bc71cf82b37e0)", // Replace with the path to your original image
      }}
    >
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

      <div>
        <div className="dialogBox">
          <p className="animatedText" onClick={handleClick}>
            {generatedText}
          </p>
        </div>
      </div>
        {showButton && <button className="nextButton" onClick = {next}>Next</button>}
    </div>
  );
}

export default SpaceRoute;
