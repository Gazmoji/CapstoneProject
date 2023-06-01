import React, { useState } from 'react'
import Cell from './Cell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import "../../styles/lg.css"
import { useNavigate } from 'react-router-dom'



function Board(props) {

    const navigate = useNavigate()

    const { size, chanceLightStartsOn } = props

    function randomLight() {
        return Math.random() > chanceLightStartsOn
    }

    const lightsGrid = Array.from({ length: size }).map(
        row => ( row =
            Array.from({ length: size }).map(
                cell => (cell = randomLight())
            )
        )

    )

    const [ board, setBoard ] = useState({ grid: lightsGrid, moves: 0 })

    const toggleLight = function(cellIndex) {
        let [ cellRowIndex, cellColIndex ] = cellIndex.split("")
        cellRowIndex = parseInt(cellRowIndex)
        cellColIndex = parseInt(cellColIndex)

        setBoard(currSt => (
            {   ...currSt,
                grid: currSt.grid.map(
                    (row, rowIndex) => ( rowIndex === cellRowIndex
                        ? row.map( (col, colIndex) => colIndex === cellColIndex ? !col : col)
                        : row
                        
                    )
                ),
                moves: currSt.moves + 1,
            }
        ))
    }

    function toggleAllLights(cellIndex){
        let [ cellRowIndex, cellColIndex ] = cellIndex.split("")
        cellRowIndex = parseInt(cellRowIndex)
        cellColIndex = parseInt(cellColIndex)

        toggleLight(cellIndex)
        toggleLight([cellRowIndex, cellColIndex + 1].join(""))
        toggleLight([cellRowIndex, cellColIndex - 1].join(""))
        toggleLight([cellRowIndex + 1, cellColIndex].join(""))
        toggleLight([cellRowIndex - 1, cellColIndex].join(""))

    }

    function hasWon() {
        return board.grid.every( row => row.every( cell => !cell ) )
    }

    const gridDisplay = board.grid.map( function (row, rowIndex) {
        return (
            <div className='Board-row' key={rowIndex}>
                {row.map((col, colIndex) => (
                    <Cell 
                        key={[rowIndex, colIndex].join("")}
                        cellIndex={[rowIndex, colIndex].join("")}
                        isOn={board.grid[rowIndex][colIndex]}
                        toggleLight={toggleAllLights}
                    />
                ))}
            </div>
        )
    })

    const finishGame = () => {
        navigate('/')
    }

  return (
    <div className='Board'>
        <h2 className="movesh2">Moves: {board.moves / 5}</h2>
        {hasWon() ? <div className='Board-hasWon'>
            <h1>Congratulations!</h1>
            <button className='escape' onClick = {finishGame} >
                Escape  
            <FontAwesomeIcon icon={faPersonRunning} />
            </button></div> : gridDisplay}
    </div>
  )
}

export default Board