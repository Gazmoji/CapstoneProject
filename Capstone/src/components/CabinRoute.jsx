import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CabinRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

  const unlockDoor = () => {
    navigate("/slider");
  };

  const cabinOption = [
    "You decide that going into the cabin couldn't hurt, there could be someone there to help.",
    "Or at the very least, maybe something useful you could grab for your adventure.",
    "As you walk in front, you start to feel a strong sense of unease. You brush it off and go in regardless...",
    "You open the door to find that all your worrying was pointless.",
    "It was just a cozy little cabin.",
    "You call out to see if anyone's around...",
    "No answer.",
    "As you walk deeper in the cabin, you notice that the door slammed behind you.",
    "'HELLO!? WHO'S THERE?' You shouted in a panicked tone.",
    "You rush to try and leave but your stomach drops as you touch the door handle.",
    "The door was locked... It looks like you're stuck in here...",
  ];

  const generateText = (line) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= line.length) {
        setGeneratedText(line.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust the interval speed as needed
  };

  const handleClick = () => {
    if (lineIndex < cabinOption.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  useEffect(() => {
    if (lineIndex < cabinOption.length) {
      setGeneratedText("");

      generateText(cabinOption[lineIndex]);
    }

    if (lineIndex === 3) {
      setIsImageFading(true);
    }
  }, [lineIndex]);

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

  return (
    <div
      className={`container${isFading ? " fade-out" : ""}`}
      style={{
        backgroundImage: isImageFading
          ? "url(https://as1.ftcdn.net/v2/jpg/05/50/46/44/1000_F_550464425_V6RGtdUQjCBNzj9tOyeBtx8dB1bEMIn8.jpg)" // Replace with the path to your new image
          : "url(https://media.tenor.com/9WBEzfL3eg4AAAAC/video-game-cabin.gif)", // Replace with the path to your original image
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

      {showButton && (
        <button className="nextButton" onClick={unlockDoor}>
          Try to Unlock Door
        </button>
      )}
    </div>
  );
}

export default CabinRoute;
