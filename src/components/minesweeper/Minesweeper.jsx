import React, { useState, createContext } from "react";
import Board from "./Board";
import Counters from "./Counters";
import "./minesweeper.css";
import DifficultyChooser, { availableDifficulties } from "./DifficultyChooser";

export const MinesweeperContext = createContext({
  chosenDifficulty: {},
  setChosenDificulty: () => {},
  gameStart: "",
  setGameStart: () => {},
  playerBoard: [],
  setPlayerBoard: () => {},
  createEmptyBoard: () => {},
});

function Minesweeper() {
  const [chosenDifficulty, setChosenDifficulty] = useState(
    availableDifficulties.intermediate
  );
  const [playerBoard, setPlayerBoard] = useState(() =>
    createEmptyBoard(chosenDifficulty.boardSize)
  );
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
    setGameStart(true);
  }

  return (
    <MinesweeperContext.Provider
      value={{
        chosenDifficulty,
        setChosenDifficulty,
        playerBoard,
        setPlayerBoard,
        createEmptyBoard,
      }}
    >
      <DifficultyChooser />
      <Counters />
      <Board />
    </MinesweeperContext.Provider>
  );
}

export default Minesweeper;
