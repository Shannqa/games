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
});

function Minesweeper() {
  const [chosenDifficulty, setChosenDifficulty] = useState(
    availableDifficulties.intermediate
  );

  function startGame() {
    setGameStart(true);
  }

  return (
    <MinesweeperContext.Provider
      value={{
        chosenDifficulty,
        setChosenDifficulty,
      }}
    >
      <DifficultyChooser />
      <Counters />
      <Board />
    </MinesweeperContext.Provider>
  );
}

export default Minesweeper;
