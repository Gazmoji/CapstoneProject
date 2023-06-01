import React, { useState, useEffect } from "react";

function HospitalRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);

  const hospitalEnding = [
    "After coming to the notion that it would be absurd to sneak into the space station, you make your way to the hospital.",
    "Showing the nurses your injuries from the cave, they lie you down into a bed and provide painkillers.",
    "Knowing that all your hardships are over, you are able to doze off.",
    "...until you suddenly get the feeling of being watched again.",
    "That's when it happened, in the corner of your eye you could see a man with a knife approach you and...",
    "*STAB*",
  ];

  useEffect(() => {
    generateText(hospitalEnding[lineIndex]);

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
    if (lineIndex < hospitalEnding.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    }
  };

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

export default HospitalRoute;
