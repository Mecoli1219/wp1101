/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import Board from "../components/Board";

export const revealed = (board, x, y, newNonMinesCount) => {
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the cell is already revealed, do nothing. */}
    {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */}
    // 

    if(board[x][y].value !== 0){
      if (board[x][y].revealed !== true){
        board[x][y].revealed = true
        newNonMinesCount += 1
      }
    }

    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */}
    {/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */}
    if(board[x][y].value === 0){
      if (board[x][y].revealed !== true){
        board[x][y].revealed = true
        newNonMinesCount += 1
      }

      for(let i=x-1; i<x+2; i++){
        for (let j=y-1; j<y+2; j++){
          if (!(i<0 || i>=board.length ||j<0||j>=board.length)){
            if ((i!==x || j!==y) && board[i][j].revealed===false){
              board[i][j].revealed = true
              newNonMinesCount += 1
              const result = revealed(board, i, j, newNonMinesCount)
              board = result.board
              newNonMinesCount =result.newNonMinesCount
            }
          }
        }
      }

    }
    
    return {board, newNonMinesCount};
};
