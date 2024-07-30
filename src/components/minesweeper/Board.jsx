import React from "react";

function Board() {
  
  const availableDifficulties = [
    {
      level: "beginner",
      boardSize: 9,
      mineAmount: 16,
    },
    {
      level: "intermediate",
      boardSize: 16,
      mineAmount: 40
    },
    {
      level: "expert",
      boardSize: 28,
      mineAmount: 99
    }
  ]
  
  let chosenDifficulty = availableDifficulties[0];
  
  const boardSize = chosenDifficulty.boardSize;
  const mineAmount = chosenDifficulty.mineAmount;
  
  
  function createEmptyBoard(boardSize) {
    let board = [];
    for (let c = 0; c < boardSize; c++) {
      board.push([]);
      for (let r = 0; r < boardSize; r++) {
        board[c].push(0);
      }
    }
    return board;
  }

  // generate a list of unique coordinates where mines will be placed
  function generateMineList(boardSize, mineAmount, coordinateList = []) {
    // base case
    if (coordinateList.length === mineAmount) return coordinateList;

    let row = Math.floor(Math.random() * boardSize);
    let col = Math.floor(Math.random() * boardSize);

    if (!coordinateList.some((coord) => coord[0] === row && coord[1] === col)) {
      //coordinate is unique
      coordinateList.push([row, col]);
    } else {
      console.log("duplicate", [row, col]);
    }
    return generateMineList(boardSize, mineAmount, coordinateList);
  }

  function placeMinesOnBoard(board, coordinateList) {
    let fullBoard = [...board];
    coordinateList.forEach((coord) => {
      fullBoard[coord[0]][coord[1]] = 100;
    });
    return fullBoard;
  }

  
  // full hidden matrix with mines and numbers signifying proximity
  function numberBoard(boardSize, boardWithMines) {
    let board = [...boardWithMines];
    
    
    const adjacentCells = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]];

for (let row = 0; row < boardSize; row++) {
  for (let col = 0; col < boardSize; col++) {
  // check cell
  adjacentCells.forEach(cell => {
    let x = row + cell[0];
    let y = col + cell[1]
    
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
      // exists on the board
      if (board[x][y] === 100 && board[row][col] !== 100) {
        // adjacentc cell is a mine, and current cell is not a mine
        console.log("adj");
       board[row][col] += 1;
      }
    }
  })
}}
console.log(board)
    return board;
  }
    
    
    /*
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        
        if (boardWithMines[i][j] !== 100) {*/
          /*
          if (i < boardSize - 1) {
            if (boardWithMines[i + 1][j] === 100) {
              boardWithMines[i][j] = 1;
            }
          } else if (i < boardSize - 1 && j < boardSize - 1) {
            if (boardWithMines[i + 1][j + 1] === 100) {
              boardWithMines[i + 1][j + 1] = 1;
            }
          }*//*
          switch (true) {
            case (i < boardSize - 1 && j < boardSize - 1):
              if (boardWithMines[i + 1][j + 1] === 100) {
                boardWithMines[i + 1][j + 1] = 1;
              }
              break;
            case (i < boardSize - 1):
              if (boardWithMines[i + 1][j] === 100) {
                boardWithMines[i][j] = 1;
              }
            case (j < boardSize - 1):
            case (i > 1 && j > 1):
            case (i > 1):
            case (j > 1):
            case (i < boardSize - 1 && j > 1):
            case (j < boardSize - 1 && i > 1):
              console.log("kk");*/
          
        
      
    
    
  /*
  const adjacentCells = [[1, 0], [-1, 0]]

for (let row = 0; row < boardSize; row++) {
  for (let col = 0; col < boardSize; col++)
  // check cell
  adjacentCells.forEach(cell => {
    let x = row + cell[0];
    let y = col + cell[1]
    
    if (x > 0 && x < boardSize + 1 && y > 0 && y < boardSize + 1) {
      // exists on the board
      if (numberBoard[x][y] === 100) {
        // adjacent is mine
        numberBoard[row][col] += 1;
      }
    }
  })
}
}*/

const coordinateList = generateMineList(boardSize, mineAmount);
  console.log("coord", coordinateList);
  let emptyBoard = createEmptyBoard(boardSize);
  
  let fullBoard = placeMinesOnBoard(emptyBoard, coordinateList);
  

console.log(fullBoard);
const ready = numberBoard(boardSize, fullBoard)

console.log("r", ready);
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(9, 40px)"}}>
      {ready.map((row, rindex) =>
        row.map((column, cindex) => <div style={{border: "1px black solid"}}>{column}</div>)
      )}
    </div>
  );
}

export default Board;

