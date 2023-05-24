import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BeginGame() {
  const navigate = useNavigate();

  const [lineIndex, setLineIndex] = useState(0);
  const [generatedText, setGeneratedText] = useState("");

  const beginGame = () => {
    navigate("/first-stage");
  };

  const linesOfText = [
    "You awaken in a mysterious forest unsure of how you arrived there, scared and lost.",
    "You are extremely confused, as you don't recognize anything around you.",
    "You feel uneasy and unsafe, all around you are strange noises.",
    "So, pushing past your fear, you stand up determined to find your way out.",
  ];

  const secondLinesOfText = [
    "As you continue to walk, you can see a cabin a little off the path to the right.",
    "Your intuition tells you to ignore it and stay on the path into the forest.",
    "But there could also be people in there that could help you figure out what's going on...",
    "You need to make a choice, go into the cabin or continue on the path...",
  ];

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
    "The door was locked...It looks like you're stuck in here...",
  ];

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

  const hospitalEnding = [
    "After coming to the notion that it would be absurd to sneak into the space station, you make your way to the hospital.",
    "Showing the nurses your injuries from the cave, they lie you down into a bed and provide painkillers.",
    "Knowing that all your hardships are over, you are able to doze off.",
    "...until you suddenly get the feeling of being watched again.",
    "That's when it happened, in the corner of your eye you could see a man with a knife approach you and...",
    "*STAB*",
  ];

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
    if (lineIndex < linesOfText.length - 1) {
      setLineIndex(lineIndex + 1);
      setGeneratedText("");
    } else {
      beginGame();
    }
  };

  useEffect(() => {
    if (lineIndex < linesOfText.length) {
      setGeneratedText("");
      generateText(linesOfText[lineIndex]);
    }
  }, [lineIndex]);

  return (
    <div className="container">
      <div className="dialogBox">
        <p className="animatedText" onClick={handleClick}>
          {lineIndex > 0
            ? linesOfText[lineIndex].slice(0, generatedText.length)
            : generatedText}
        </p>
      </div>
      {lineIndex === linesOfText.length - 1 && (
        <button className="nextButton" onClick={beginGame}>
          Begin
        </button>
      )}
    </div>
  );
}

export default BeginGame;
