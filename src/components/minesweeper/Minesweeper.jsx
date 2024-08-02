import React, { useState, createContext } from "react";
import Board from "./Board";
import Counters from "./Counters";
import "./minesweeper.css";
import DifficultyChooser, { availableDifficulties } from "./DifficultyChooser";

export const MinesweeperContext = createContext({
  chosenDifficulty: {},
  setChosenDificulty: () => {},
  gameStage: "",
  setGameStage: () => {},
  playerBoard: [],
  setPlayerBoard: () => {},
  createEmptyBoard: () => {},
  markCount: "",
  setMarkCount: () => {}
});

function Minesweeper() {
  const [chosenDifficulty, setChosenDifficulty] = useState(
    availableDifficulties.intermediate
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
  }
  
  function gameWin() {
    setGameStage("loss");
    // showModal
  }
  
  function gameLose() {
    setGameStage("win");
    // showModal
  }
  
  // states of the game:
  - loaded the page, counter not running, no moves made / reset the game after winning or losing
  - game is running, after the first click
  - clicked on a mine, game over,
  - clicked on every other tile except for the mines - game won
  
  gameStage: "ready", "playing", "win", "lose"

  return (
    <MinesweeperContext.Provider
      value={{
        chosenDifficulty,
        setChosenDifficulty,
        playerBoard,
        setPlayerBoard,
        createEmptyBoard,
        markCount,
        setMarkCount
      }}
    >
      <DifficultyChooser />
      <Counters />
      <Board />
    </MinesweeperContext.Provider>
  );
}

export default Minesweeper;
