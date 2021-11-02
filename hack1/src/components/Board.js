/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        const board_from_create = createBoard(boardSize,mineNum)
        setBoard(board_from_create.board)
        setMineLocations(board_from_create.mineLocations)        
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        const cell = board[x][y]
        var newBoard = []
        for(let X = 0; X < boardSize; X++){
            let subCol = [];
            for(let Y = 0; Y < boardSize; Y++){
                subCol.push(board[X][Y])
            }
            newBoard.push(subCol)
        }
        if (cell.revealed=== false && !gameOver &&!win){
            if (cell.flagged === true){
                setRemainFlagNum(remainFlagNum-1)
                cell.flagged = !cell.flagged
            }else{
                setRemainFlagNum(remainFlagNum+1)
                cell.flagged = !cell.flagged
            }
            
        }
        
        setBoard(newBoard)
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        const cell = board[x][y]
        var newBoard = []
        for(let X = 0; X < boardSize; X++){
            let subCol = [];
            for(let Y = 0; Y < boardSize; Y++){
                subCol.push(board[X][Y])
            }
            newBoard.push(subCol)
        }
        if (cell.revealed === false && cell.flagged === false && !win && !gameOver){
            
            if (cell.value === '💣'){
                for(let X = 0; X < boardSize; X++){
                    for(let Y = 0; Y < boardSize; Y++){
                        if (newBoard[X][Y].value === '💣'){
                            newBoard[X][Y].revealed = true
                        }
                    }
                }
                setGameOver(true)    
            }else{
                const result = revealed(board, x, y, nonMineCount)
                newBoard = result.board
                var {newNonMinesCount} = result
                newBoard[x][y].revealed=true
                if (newNonMinesCount === boardSize*boardSize-mineNum){
                    setWin(true)
                }
                setNonMineCount(newNonMinesCount)
            }
            setBoard(newBoard)
        }
    };

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >            
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            <div className = "boardWrapper">
                {/* <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> */}
                <div className = "boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                    {
                        board.map((row)=>{
                            return <div id={`row${row[0].x}`} style={{display:"flex"}}>
                                {row.map((cell)=>{
                                    return <Cell rowIdx={cell.x} colIdx={cell.y} detail={cell} updateFlag={updateFlag} revealCell={revealCell} />
                                })}
                            </div>
                        }
                            
                        )
                    }
                </div>
            </div>
            </div>
        </div>
    ); 

    

}

export default Board