import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


function BeginGame() {
  const navigate = useNavigate();

  const [lineIndex, setLineIndex] = useState(0)

  const beginGame = () => {
    navigate("/first-stage")
  }

  const linesOfText = [
    "You awaken in a mysterious forest unsure of how you arrived there, scared and lost.",
    "You are extremely confused, as you don't recognize anything around you.",
    "You feel uneasy and unsafe, all around you are strange noises.",
    "So, pushing past your fear, you stand up determined to find your way out.",
  ]

  const handleClick = () => {
    if (lineIndex < linesOfText.length - 1) {
      setLineIndex(lineIndex + 1)
    }
  }

  const showNextButton = lineIndex === linesOfText.length - 1

  return (
    <div className='container'>
      <div className='dialogBox'>
        <p 
          className='animatedText'
          onClick={handleClick}
        >
          {linesOfText[lineIndex]}
        </p>
      </div>
        {showNextButton && (
          <button className='nextButton' onClick={beginGame}>
            Begin
          </button>
        )}
    </div>
  )
}

export default BeginGame