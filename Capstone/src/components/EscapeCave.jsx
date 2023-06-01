import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EscapeCave() {
  const navigate = useNavigate();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const handleOption1 = () => {
    navigate("/SpaceRoute");
  };

  const handleOption2 = () => {
    navigate("/HospitalRoute");
  };

  const continueGame = () => {
    setIsFading(true);
    setIsImageFading(true);
    setTimeout(() => {
      setIsFading(false);
      setGeneratedText("");
      generateText(cityIntro[0]);
      setLineIndex(escapeCave.length);
    }, 1000); // Adjust the duration of the fade effect (in milliseconds)
  };

  useEffect(() => {
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

  const toggleAudio = () => {
    setAudioEnabled((prevEnabled) => !prevEnabled);
  };

  const escapeCave = [
    "As you fumble and fall through the cave, you could finally see a light at the end of the tunnel.",
    "Leaving the cave with your spine barely intact, you take a huge sigh of relief.",
    "As you gaze into the distance, a glimmer of hope emerges on the horizon.",
    "A sprawling metropolis comes into sight, and a surge of relief overwhelms you, nearly bringing tears to your eyes.",
    "With multiple fractures and undoubtedly a couple of broken bones, you persevere, determined to reach the city with a determined stride.",
  ];

  const cityIntro = [
    "Arriving in the city, you cannot help but feel exhaughted physically and mentally.",
    "Realizing the urgency of your injuries, you determine that seeking medical help at a hospital is the wisest course of action.",
    "However, as you're walking down the street, you get the omnious feeling again that somebody is watching you.",
    "Turning around, you see hundreds of civilians, surely you're just being paranoid, right?",
    "Down the road you could see the hospital, but you also notice a space research center on the same road.",
    "A thought enters your mind—what if you were to discreetly infiltrate the space station and test whether the persistent feeling of being trailed would dissipate?",
  ];

  const generateText = (line) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= line.length) {
        setGeneratedText(line.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (line === cityIntro[cityIntro.length - 1]) {
          setGeneratedText(line + "\n\n" + option1 + "\n\n" + option2);
        }
      }
    }, 40); // Adjust the interval speed as needed
  };

  const handleClick = () => {
    if (lineIndex < escapeCave.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    } else if (lineIndex === escapeCave.length - 1) {
      setGeneratedText("");
      generateText(cityIntro[0]);
      setLineIndex(lineIndex + 1);
    } else if (lineIndex === escapeCave.length) {
      if (lineIndex < escapeCave.length + cityIntro.length - 1) {
        setGeneratedText("");
        generateText(cityIntro[lineIndex - escapeCave.length]);
        setLineIndex(lineIndex + 1);
      } else {
        // Logic for handling the options
        if (lineIndex === escapeCave.length + cityIntro.length - 1) {
          // Logic for handling the options
          if (generatedText === option1) {
            handleOption1();
          } else if (generatedText === option2) {
            handleOption2();
          }
        }
      }
    } else if (
      lineIndex > escapeCave.length &&
      lineIndex < escapeCave.length + cityIntro.length - 1
    ) {
      setGeneratedText("");
      generateText(cityIntro[lineIndex - escapeCave.length]);
      setLineIndex(lineIndex + 1);
    } else {
      continueGame();
    }
  };

  useEffect(() => {
    if (lineIndex === escapeCave.length - 1) {
      setIsClickable(true);
    } else {
      setIsClickable(false);
    }
    if (lineIndex < escapeCave.length) {
      setGeneratedText("");
      generateText(escapeCave[lineIndex]);
    } else if (lineIndex === escapeCave.length) {
      setGeneratedText("");
      generateText(cityIntro[0]);
    } else if (
      lineIndex > escapeCave.length &&
      lineIndex < escapeCave.length + cityIntro.length
    ) {
      setGeneratedText("");
      generateText(cityIntro[lineIndex - escapeCave.length]);
    }
  }, [lineIndex]);

  return (
    <>
      <div
        className={`container${isFading ? " fade-out" : ""}`}
        style={{
          backgroundImage: isImageFading
            ? "url(https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/cle80k6ku000ijy08sf1r1oap_3/public)" // Replace with the path to your new image
            : "url(https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/cle95d7sr0001l708vzdeczos_1/public)", // Replace with the path to your original image
          backgroundSize: "cover", // This will make the background image cover the entire container
          backgroundPosition: "center", // This will center the background image within the container
          backgroundRepeat: "no-repeat",
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

        {lineIndex === escapeCave.length + cityIntro.length - 1 && (
          <>
            <div className="optionsContainer">
              <button className="nextButton" onClick={handleOption1}>
                Go To Space Station
              </button>
            </div>
            <div className="optionsContainer">
              <button className="nextButton" onClick={handleOption2}>
                Go To Hospital
              </button>
            </div>
          </>
        )}
        <div className="dialogBox">
          {lineIndex > 0 ? (
            <p
              className={`animatedText${
                lineIndex === escapeCave.length - 1 ||
                lineIndex === escapeCave.length + cityIntro.length - 1
                  ? " disable-click"
                  : ""
              }`}
              onClick={handleClick}
            >
              {lineIndex < escapeCave.length
                ? escapeCave[lineIndex].slice(0, generatedText.length)
                : cityIntro[lineIndex - escapeCave.length].slice(
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
        {lineIndex === escapeCave.length - 1 && (
          <button className="nextButton" onClick={continueGame}>
            Head to the City
          </button>
        )}
      </div>
    </>
  );
}

export default EscapeCave;
