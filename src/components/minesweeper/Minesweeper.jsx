import React, { useState, createContext } from "react";
import Board from "./Board";
import Counters from "./Counters";
import styles from "../../styles/minesweeper.module.css";
import DifficultyChooser, { availableDifficulties } from "./DifficultyChooser";
import Modal from "./Modal";

export const MinesweeperContext = createContext({
  chosenDifficulty: {},
  setChosenDificulty: () => {},
  gameStage: "",
  setGameStage: () => {},
  playerBoard: [],
  setPlayerBoard: () => {},
  createEmptyBoard: () => {},
  markCount: "",
  setMarkCount: () => {},
  getBoardsForSize: () => {},
  hiddenBoard: "",
});

function Minesweeper() {
  const [chosenDifficulty, setChosenDifficulty] = useState(
    availableDifficulties.intermediate
  );
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
  const [playerBoard, setPlayerBoard] = useState(() =>
    createEmptyBoard(chosenDifficulty.boardSize)
  );
  const [gameStage, setGameStage] = useState("ready");
  const [markCount, setMarkCount] = useState(chosenDifficulty.mines);
  console.log(playerBoard);

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

  function startGame() {
    setGameStage("playing");
  }

  function resetGame() {
    setGameStage("ready");
    setMarkCount(chosenDifficulty.mines);
    console.log("reset");
    getBoardsForSize(chosenDifficulty.boardSize, chosenDifficulty.mines);
  }

  function gameWin() {
    setGameStage("win");
    // showModal
  }

  function gameLoss() {
    setGameStage("loss");
    console.log("loss", gameStage);
    // showModal
  }

  function changeBoardSize() {
    setChosenDifficulty();
    // reset marks
    // reset timer
  }

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

  function getBoardsForSize(boardSize, mines) {
    const playerBoard = createEmptyBoard(boardSize);
    const emptyBoard = createEmptyBoard(boardSize);
    const mineList = generateMineList(boardSize, mines);
    const boardWithMines = placeMinesOnBoard(emptyBoard, mineList);
    const hiddenBoard = numberBoard(boardSize, boardWithMines);
    setPlayerBoard([...playerBoard]);
    console.log(playerBoard);
    setHiddenBoard([...hiddenBoard]);
  }

  return (
    <MinesweeperContext.Provider
      value={{
        chosenDifficulty,
        setChosenDifficulty,
        playerBoard,
        setPlayerBoard,
        createEmptyBoard,
        markCount,
        setMarkCount,
        gameStage,
        setGameStage,
        getBoardsForSize,
        hiddenBoard,
      }}
    >
      <div className={styles.gameWindow}>
        {/* <h2>Minesweeper</h2> */}
        <div className={styles.menus}>
          <DifficultyChooser />
          <Counters restart={resetGame} />
        </div>
        <Board handleLoss={gameLoss} handleWin={gameWin} />
        <Modal stage={gameStage} restart={resetGame} />
      </div>
    </MinesweeperContext.Provider>
  );
}

export default Minesweeper;
