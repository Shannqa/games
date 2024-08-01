import React, { useContext, useState } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
export { availableDifficulties };

const availableDifficulties = {
  beginner: {
    name: "beginner",
    boardSize: 9,
    mines: 16,
  },
  intermediate: {
    name: "intermediate",
    boardSize: 9,
    mines: 16,
  },
  expert: {
    name: "expert",
    boardSize: 22,
    mines: 99,
  },
};

function DifficultyChooser() {
  const { chosenDifficulty, setChosenDifficulty } =
    useContext(MinesweeperContext);

  function handleRadioSelect(e) {
    console.log(e.target.value);
    if (e.target.value === "beginner") {
      setChosenDifficulty(availableDifficulties.beginner);
    } else if (e.target.value === "intermediate") {
      setChosenDifficulty(availableDifficulties.intermediate);
    } else if (e.target.value === "expert") {
      setChosenDifficulty(availableDifficulties.expert);
    }
  }

  return (
    <div>
      <form>
        <legend>Choose difficulty</legend>
        <input
          type="radio"
          name="difficulty"
          value="beginner"
          onChange={handleRadioSelect}
          id="beginner"
          checked={chosenDifficulty.name === "beginner"}
        />
        <label htmlFor="beginner">Beginner</label>
        <input
          type="radio"
          name="difficulty"
          value="intermediate"
          onChange={handleRadioSelect}
          id="intermediate"
          checked={chosenDifficulty.name === "intermediate"}
        />
        <label htmlFor="intermediate">Intermediate</label>
        <input
          type="radio"
          name="difficulty"
          value="expert"
          onChange={handleRadioSelect}
          id="expert"
          checked={chosenDifficulty.name === "expert"}
        />
        <label htmlFor="expert">Expert</label>
      </form>
    </div>
  );
}

export default DifficultyChooser;
