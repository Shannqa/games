import React from "react";
import Board from "./Board";
import "./minesweeper.css";

function Minesweeper() {
  const difficultyLevels = [
    {
      level: "beginner",
      boardSize: 9,
      mineAmount: 20,
    },
  ];

  return <Board />;
}

export default Minesweeper;
