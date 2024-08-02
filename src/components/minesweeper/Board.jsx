import React, { useContext, useState } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
import styles from "../../styles/minesweeper.module.css";

function Board() {
  const { chosenDifficulty, playerBoard, setPlayerBoard, markCount, setMarkCount, gameStart, setGameStart } =
    useContext(MinesweeperContext);
  const [emptyBoard, setEmptyBoard] = useState(() =>
    createEmptyBoard(chosenDifficulty.boardSize)
  );
  const [coordinateList, setCoordinateList] = useState(() =>
    generateMineList(chosenDifficulty.boardSize, chosenDifficulty.mines)
  );
  const [minesBoard, setMinesBoard] = useState(() =>
    placeMinesOnBoard(emptyBoard, coordinateList)
  );
  const [hiddenBoard, setHiddenBoard] = useState(() =>
    numberBoard(chosenDifficulty.boardSize, minesBoard)
  );

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
      // console.log("duplicate", [row, col]);
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

    const adjacentCells = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        // check cell
        adjacentCells.forEach((cell) => {
          let x = row + cell[0];
          let y = col + cell[1];

          if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
            // exists on the board
            if (board[x][y] === 100 && board[row][col] !== 100) {
              // adjacentc cell is a mine, and current cell is not a mine
              console.log("adj");
              board[row][col] += 1;
            }
          }
        });
      }
    }
    // console.log(board);
    return board;
  }

  const classStyle = {
    100: `${styles.box} ${styles.mine}`,
    8: `${styles.box} ${styles.darkred}`,
    7: `${styles.box} ${styles.darkred}`,
    6: `${styles.box} ${styles.red}`,
    5: `${styles.box} ${styles.darkpurple}`,
    4: `${styles.box} ${styles.purple}`,
    3: `${styles.box} ${styles.darkblue}`,
    2: `${styles.box} ${styles.blue}`,
    1: `${styles.box} ${styles.lightblue}`,
    0: `${styles.box} ${styles.green}`,
  };

  const boardStyles = {
    beginner: `${styles.board} ${styles.beginner}`,
    intermediate: `${styles.board} ${styles.intermediate}`,
    expert: `${styles.board} ${styles.expert}`,
  };

  console.log(boardStyles.beginner);

  // clicks

  function handleTileClick(e, row, column) {
    
    if (!gameStart) {
      setGameStart(true);
    }
    let board = [...playerBoard];
    if (e.type === "contextmenu") {
      // right click
      
      if (board[row][column] === "x") {
        // tile already revealed, do nothing
      } else if (board[row][column] === "o") {
        // remove mark
        board[row][column] = "0";
        setMarkCount(markCount + 1);
      } else {
        // add mark
        if (markCount < 1) return;
        board[row][column] = "o";
        setMarkCount(markCount - 1);
      }
    } else {
      // left click
      let boardSize = chosenDifficulty.boardSize;
    if (hiddenBoard[row][column] === 100) {
      // clicked on a mine, game over
      board[row][column] = "x";
    } else if (board[row][column] === "x") {
      // already clicked here, do nothing
      return;
    } else if (hiddenBoard[row][column] > 0 && hiddenBoard[row][column] <= 8) {
      // clicked on a tile which is adjacent to a mine - open only this tile
      board[row][column] = "x";
    } else if (hiddenBoard[row][column] === 0) {
      // clicked on a tile which is not adjacent to a mine, open surrounding tiles
      let queue = [];
      queue.push([row, column]);
      function openAdjacents(queue) {
        if (queue.length === 0) {
          return;
        }
        console.log(queue);
        let [row, column] = queue.pop();
        console.log(row, column);
        //open clicked on tile
        board[row][column] = "x";

        const adjacentCells = [
          [1, 0],
          [-1, 0],
          [0, -1],
          [0, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1],
        ];

        adjacentCells.forEach((cell) => {
          let x = row + cell[0];
          let y = column + cell[1];

          if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
            // if cell [x, y] exists on the board
            if (
              queue.length === 0 ||
              (queue.length > 0 && !queue.includes([x, y]))
            ) {
              // if it's not in the queue already
              if (board[x][y] !== "x") {
                //if its not already revealed
                if (hiddenBoard[x][y] === 0) {
                  queue.push([x, y]);
                } else {
                  // reveal the tile if its between 1 and 8
                  board[x][y] = "x";
                }
              }
            }
          }
        });
        openAdjacents(queue);
      }
      openAdjacents(queue);
    }
    }
    
    setPlayerBoard([...board]);
  }
  console.log(playerBoard);
  return (
    <>
      <div className={boardStyles[chosenDifficulty.name]}>
        {playerBoard.map((row, rindex) =>
          row.map((column, cindex) => (
            <div
              key={`${rindex}-${cindex}`}
              className={classStyle[column]}
              onClick={(e) => handleTileClick(e, rindex, cindex)}  onContextMenu={(e) => handleTileClick(e, rindex, cindex)}
            >
              {playerBoard[rindex][cindex] === "x"
                ? `${hiddenBoard[rindex][cindex]}`
                : column}
            </div>
          ))
        )}
      </div>
      <hr />
      <div className={boardStyles[chosenDifficulty.name]}>
        {hiddenBoard.map((row, rindex) =>
          row.map((column, cindex) => (
            <div key={`${rindex}-${cindex}`} className={classStyle[column]}>
              {column}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Board;
