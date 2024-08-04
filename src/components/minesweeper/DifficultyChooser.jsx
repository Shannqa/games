import React, { useContext, useState } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
export { availableDifficulties };
import styles from "../../styles/minesweeper.module.css";

const availableDifficulties = {
  beginner: {
    name: "beginner",
    boardSize: 9,
    mines: 16,
  },
  intermediate: {
    name: "intermediate",
    boardSize: 14,
    mines: 40,
  },
  expert: {
    name: "expert",
    boardSize: 20,
    mines: 99,
  },
};

function DifficultyChooser() {
  const { chosenDifficulty, setChosenDifficulty, getBoardsForSize } =
    useContext(MinesweeperContext);

  function handleRadioSelect(e) {
    console.log(e.target.value);
    if (e.target.value === "beginner") {
      setChosenDifficulty(availableDifficulties.beginner);
      getBoardsForSize(
        availableDifficulties.beginner.boardSize,
        availableDifficulties.beginner.mines
      );
    } else if (e.target.value === "intermediate") {
      setChosenDifficulty(availableDifficulties.intermediate);
      getBoardsForSize(
        availableDifficulties.intermediate.boardSize,
        availableDifficulties.intermediate.mines
      );
    } else if (e.target.value === "expert") {
      setChosenDifficulty(availableDifficulties.expert);
      getBoardsForSize(
        availableDifficulties.expert.boardSize,
        availableDifficulties.expert.mines
      );
    }
  }

  return (
    <form className={styles.difficultyChooser}>
      <legend>Choose difficulty</legend>
      <label htmlFor="beginner">
        <input
          type="radio"
          name="difficulty"
          value="beginner"
          onChange={handleRadioSelect}
          id="beginner"
          checked={chosenDifficulty.name === "beginner"}
        />
        Beginner
      </label>
      <label htmlFor="intermediate">
        <input
          type="radio"
          name="difficulty"
          value="intermediate"
          onChange={handleRadioSelect}
          id="intermediate"
          checked={chosenDifficulty.name === "intermediate"}
        />
        Intermediate
      </label>
      <label htmlFor="expert">
        <input
          type="radio"
          name="difficulty"
          value="expert"
          onChange={handleRadioSelect}
          id="expert"
          checked={chosenDifficulty.name === "expert"}
        />
        Expert
      </label>
    </form>
  );
}

export default DifficultyChooser;
