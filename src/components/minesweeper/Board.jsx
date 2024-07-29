import React from "react";

function Board() {
  function createEmptyBoard(boardSize) {
    let board = [];
    for (let c = 0; c < boardSize; c++) {
      board.push([]);
      for (let r = 0; r < boardSize; r++) {
        board[c].push([]);
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
    let fullBoard = board;
    coordinateList.forEach((coord) => {
      fullBoard[coord[0]][coord[1]] = "x";
    });
    return fullBoard;
  }

  const coordinateList = generateMineList(9, 20);
  console.log(coordinateList);
  let emptyBoard = createEmptyBoard(9);
  console.log(emptyBoard);
  let fullBoard = placeMinesOnBoard(emptyBoard, coordinateList);
  console.log(fullBoard);
  return (
    <div className="board">
      {fullBoard.map((row, rindex) =>
        row.map((column, cindex) => <div className="box">{column}</div>)
      )}
    </div>
  );
}

export default Board;
