import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import '../../styles/styles.css';
import { upScore } from '../../store/slices/userSlice';

const Board = () => {
    const [board, setBoard] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [moves, setMoves] = useState(0)
    const [score, setScore] = useState(0)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggle = (r, c) => {
        if (isInitialized && !gameOver) {
            setBoard(prevBoard => {
                const newBoard = prevBoard.map(row => [...row]);

                // Toggle self
                newBoard[r][c] = newBoard[r][c] === 0 ? 1 : 0;

                // Toggle up
                if (newBoard[r - 1] !== undefined) {
                    newBoard[r - 1][c] = newBoard[r - 1][c] === 0 ? 1 : 0;
                }

                // Toggle right
                if (newBoard[r][c + 1] !== undefined) {
                    newBoard[r][c + 1] = newBoard[r][c + 1] === 0 ? 1 : 0;
                }

                // Toggle down
                if (newBoard[r + 1] !== undefined) {
                    newBoard[r + 1][c] = newBoard[r + 1][c] === 0 ? 1 : 0;
                }

                // Toggle left
                if (newBoard[r][c - 1] !== undefined) {
                    newBoard[r][c - 1] = newBoard[r][c - 1] === 0 ? 1 : 0;
                }

                return newBoard;
            });

            setMoves((prevMoves) => prevMoves + 1)

            if (moves < 50) {
                setScore(1000)
            } else if (moves < 100) {
                setScore(750) 
            } else if (moves < 150) {
                setScore(500)
            } else if (moves < 200) {
                setScore(250)
            }
        } else {
            setMessage('Game over. Please start a new game.');
        }
    };

    const finishGame = () => {
        dispatch(upScore(score))
        navigate('/endingScreen');
    };

    // Check if board is complete (no zeroes)
    const boardComplete = () => {
        return board.every(row => row.every(cell => cell === 1));
    };

    useEffect(() => {
        if (!isInitialized) {
            const easyBoard = [
                [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
                [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
                [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]],
                [[1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 0, 1, 0, 1]],
                [[0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [0, 0, 1, 0, 0], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0]]
            ];

            const randomIndex = Math.floor(Math.random() * easyBoard.length);
            const randomBoard = easyBoard[randomIndex];

            setBoard(randomBoard);
            setDifficulty('easy');
            setGameOver(false);
            setMessage('');
            setIsInitialized(true);
        }
    }, [isInitialized]);

    useEffect(() => {
        if (board) {
            if (boardComplete()) {
                setGameOver(true);
                setMessage('You win!');
            }
        }
    }, [board]);

    return (
        <div>
            {board && (
                <>
                    <table>
                        <thead></thead>
                        <tbody>
                            {board.map((row, i) => (
                                <Row key={i} row={row} rowIndex={i} gameOver={gameOver} toggle={toggle} difficulty={difficulty} />
                                ))}
                        </tbody>
                    </table>
                    {gameOver && (
                        <div className='buttonDiv'>
                            <p className='message'>Congratulations!</p>
                            <button className="escape" onClick={finishGame}>
                                Escape
                                <FontAwesomeIcon icon={faPersonRunning} />
                            </button>
                        </div>
                    )}
                </>
            )}

            <p className='moves'>Moves: {moves}</p>
            <p className='dialogBox2'>The object of this game is to set the entire board to blue.</p>
        </div>
    );
};

const Row = ({ row, rowIndex, gameOver, toggle, difficulty }) => {
    return (
        <tr>
            {row.map((cell, i) => (
                <Cell key={i} rowIndex={rowIndex} columnIndex={i} cellValue={cell} gameOver={gameOver} toggle={toggle} difficulty={difficulty} />
            ))}
        </tr>
    );
};

const Cell = ({ rowIndex, columnIndex, cellValue, gameOver, toggle, difficulty }) => {
    let light;

    if (difficulty === 'easy') {
        light = !gameOver ? (cellValue === 1 ? 'easy on' : 'easy off') : 'easy done';
    } else if (difficulty === 'hard') {
        light = !gameOver ? (cellValue === 1 ? 'hard on' : 'hard off') : 'hard done';
    }

    return (
        <td>
            <div className={light} onClick={() => toggle(rowIndex, columnIndex)}></div>
        </td>
    );
};

export default Board;
