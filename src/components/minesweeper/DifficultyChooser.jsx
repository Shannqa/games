import React, { useContext, useState } from "react";
import { MinesweeperContext } from "./Battleships.jsx";

function DifficultyChooser() {
  const {
    chosenDifficulty, 
    setChosenDifficulty
  } = useContext(MinesweeperContext)
  
  const availableDifficulties = {
    beginner: {
      boardSize: 9,
      mines: 16
    },
    intermediate: {
      boardSize: 16,
      mines: 40
    },
    expert: {
      boardSize: 28,
      mines: 99
    }
  }
  
  function handleRadioSelect(e) {
    switch (e.target.value) {
      case "beginner":
        setChosenDifficulty(availableDifficulties.beginner);
      case "intermediate":
        setChosenDifficulty(availableDifficulties.intermediate);
      case "expert":
        setChosenDifficulty(availableDifficulties.expert);
    }
  }
  
  return(
  <div>
  <form>
    <legend>Choose difficulty</legend>
    <label htmlFor="beginner">Beginner</label>
      <input type="radio" name="difficulty" value="beginner" />
      <label htmlFor="intermediate">Intermediate</label>
      <input type="radio" name="difficulty" value="intermediate" onChange={handleRadioSelect} checked>Intermediate</input>
        <label htmlFor="expert">Expert</label>
        <input type="radio" name="difficulty" value="expert" onChange={handleRadioSelect}>Expert</input>
  </form>
  </div>)
}

export default DifficultyChooser;