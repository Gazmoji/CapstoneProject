import { useState, useEffect } from "react";

function LeftRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);

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

  useEffect(() => {
    generateText(leftPath[lineIndex]);

    // Check if line index is greater than or equal to 8 and update the background image
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
    }, 40);
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
    </div>
  );
}

export default LeftRoute;
