import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ForestRoute() {
  const navigate = useNavigate();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);

  const option1 = "Option 1";
  const option2 = "Option 2";

  const handleOption1 = () => {
    navigate("/LeftRoute");
  };

  const handleOption2 = () => {
    navigate("/RightRoute");
  };

  const forestOption = [
    "There's no way going into that cabin is a good idea right...?",
    "After some pondering, you decide that staying on the forest path is not only safer but smarter.",
    "So you pressed on the same path.",
    "After what felt like a few hours, you stop in your tracks.",
    "You can see a crossroads directly in front of you.",
    "The left path feels much more secure, as it looks like the path you've been on",
    "Where as the right path seems to have a much different vibe",
    "Dead trees, withering foliage and what appears to be a thunderstorm right above it.",
    "It looks like it's time to make another choice, what should you pick?",
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
    }, 40); // Adjust the interval speed as needed
  };

  const handleClick = () => {
    if (lineIndex < forestOption.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    }
    if (lineIndex === forestOption.length - 1) {
      // Logic for handling the options
      if (generatedText === option1) {
        handleOption1();
      } else if (generatedText === option2) {
        handleOption2();
      }
    }
  };

  useEffect(() => {
    if (lineIndex < forestOption.length) {
      setGeneratedText("");

      generateText(forestOption[lineIndex]);
    }

    if (lineIndex === 3) {
      setIsImageFading(true);
    }
  }, [lineIndex]);

  useEffect(() => {
    const audio = new Audio(new URL("./EternaForest.mp3", import.meta.url));
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
          ? "url(https://preview.redd.it/enchanted-forest-past-poem-and-prompt-in-comments-v0-7wj8gos7hv9a1.png?width=640&crop=smart&auto=webp&s=839fa1ee011c7bef845d0194af9bc71cf82b37e0)" // Replace with the path to your new image
          : "url(https://media.tenor.com/9WBEzfL3eg4AAAAC/video-game-cabin.gif)", // Replace with the path to your original image
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

      {lineIndex === forestOption.length - 1 && (
        <>
          <div className="optionsContainer">
            <button className="nextButton" onClick={handleOption1}>
              Take the Safe Left Path
            </button>
          </div>
          <div className="optionsContainer">
            <button className="nextButton" onClick={handleOption2}>
              Take the Scary Right Path
            </button>
          </div>
        </>
      )}
      <div>
        <div className="dialogBox">
          <p className="animatedText" onClick={handleClick}>
            {generatedText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForestRoute;