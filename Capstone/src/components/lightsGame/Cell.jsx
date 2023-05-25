import React from 'react'
import "../../styles/lg.css"






function Cell(props) {
    const { cellIndex, isOn, toggleLight } = props

    function handleToggleLight() {
        toggleLight(cellIndex)
    }

  return (
    <button
        className={isOn?"Cell-on":"Cell-off"}
        onClick={handleToggleLight}
    ></button>
  )
}

export default Cell