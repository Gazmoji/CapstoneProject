import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeftRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false); // New state variable
  const navigate = useNavigate();

  const leftPath = [
    "You decide to continue on the path that looks like your previous route.",
    "For a while, you feel pretty at ease, hearing the birds chirp and the wind blow.",
    "As you walk you can't help but feel like you're being watched...",
    "You turn around to look but don't see anything out of the ordinary...",
    "Due to the uneasiness, you decide to walk a bit faster.",
    "This turns into a speedwalk and before you knew it, you're full sprinting down the path!!",
    "You're pretty confident you can hear someone running behind you so you don't stop running!",
    "Until...",
    "You find yourself at the edge of a cliff.",
    "The drop is massive, at least a few thousand feet, and there doesn't seem to be a good way around it.",
    "You realize that there's nothing you can do but go back, but as you're about to turn around....",
    "*PUSH*",
    "Somebody shoves you off the cliff, leaving you to fall slowly to your demise...",
  ];

  const gameOver = () => {
    navigate("/GameOver");
  };

  useEffect(() => {
    generateText(leftPath[lineIndex]);

    if (lineIndex === 2) {
      // Start playing audio on line 3
      setShouldPlayAudio(true);
    }

    if (lineIndex >= 5) {
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
    if (lineIndex < leftPath.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    }
  };

  useEffect(() => {
    const audio = new Audio(new URL("./ChasingMusic.mp3", import.meta.url));
    audio.loop = true;

    if (shouldPlayAudio && audioEnabled) {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [shouldPlayAudio, audioEnabled]);

  return (
    <div
      className={`container${isFading ? " fade-out" : ""}`}
      style={{
        backgroundImage: isImageFading
          ? "url(https://24.media.tumblr.com/tumblr_m6fc6mFKsG1qbzzgco1_r1_1280.png)" // Replace with the path to your new image
          : "url(https://cdnb.artstation.com/p/assets/images/images/037/263/051/original/karina-formanova-rainforest-animation.gif?1619929364)", // Replace with the path to your original image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        transition: isImageFading
          ? "background-image 0.1s ease-in-out"
          : "none",
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
      {lineIndex === leftPath.length - 1 && (
        <button className="nextButton" onClick={gameOver}>
          Fall to Your Doom
        </button>
      )}
    </div>
  );
}

export default LeftRoute;
