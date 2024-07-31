import React, { useState, createContext } from "react";
import Board from "./Board";
import "./minesweeper.css";

export const MinesweeperContext = createContext({
  chosenDifficulty: {},
  setChosenDificulty: () => {},
  gameStart: "",
  setGameStart: () => {}
})

function Minesweeper() {
  const [chosenDifficulty, setChosenDificulty] = useState(availableDifficulties.intermediate);
  
  function startGame() {
    setGameStart(true);
  }
  
  
  return <BattleshipsContext.Provider
  value = {{
    chosenDifficulty,
    setChosenDificulty
  }}
  >
  <Counters />
  <Board />
  </BattleshipsContext.Provider>
}

export default Minesweeper;
