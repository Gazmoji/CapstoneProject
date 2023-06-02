import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HospitalRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const navigate = useNavigate();

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

  const gameOver = () => {
    navigate("/GameOver");
  };

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

  useEffect(() => {
    const audio = new Audio(new URL("./HospitalRoute.mp3", import.meta.url));
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
          ? "url(https://rare-gallery.com/mocahbig/429744-pixel-art-artwork-hospital-night-bed-dark-blue.png)" // Replace with the path to your new image
          : "url(https://64.media.tumblr.com/b65eedc97eb1027416bed49e6084ac27/458ad748cd699f0d-14/s1280x1920/adc3bee361684e42df06c46c5eb12733747cf170.gif)", // Replace with the path to your original image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
      {lineIndex === hospitalEnding.length - 1 && (
        <button className="nextButton" onClick={gameOver}>
          Bleed Out
        </button>
      )}
    </div>
  );
}

export default HospitalRoute;
