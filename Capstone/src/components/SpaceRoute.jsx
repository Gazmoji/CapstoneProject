import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpaceRoute() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

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
    }, 30);
  };

  useEffect(() => {
    const audio = new Audio(new URL("./Suspense.mp3", import.meta.url));
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
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const next = () => {
    navigate("/lights");
  };

  return (
    <div
      className={`container${isFading ? " fade-out" : ""}`}
      style={{
        backgroundImage: isImageFading
          ? "url(https://64.media.tumblr.com/37cf2ac7916149ddad066f0923561d2d/tumblr_pn6uaw7Aq81up139zo1_640.gif)" // Replace with the path to your new image
          : "url(https://64.media.tumblr.com/b65eedc97eb1027416bed49e6084ac27/458ad748cd699f0d-14/s1280x1920/adc3bee361684e42df06c46c5eb12733747cf170.gif)", // Replace with the path to your original image
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
      {showButton && (
        <button className="nextButton" onClick={next}>
          Next
        </button>
      )}
    </div>
  );
}

export default SpaceRoute;
