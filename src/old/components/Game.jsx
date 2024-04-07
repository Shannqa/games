import React, { useState } from "react";
import Grid from "./Grid";
import ShipPlacer from "./ShipPlacer";
import Gameboards from "./Gameboards";
import createGrid from "../helpers/createGrid.js"
import "../styles/index.css"


function Game() {

// prepare || playing
const [gameState, setGameState] = useState("prepare");

const [boardHuman, setBoardHuman] = useState({
    owner: "human",
    grid: createGrid(),
    shipList: [],
    receivedHits: 0,
    lostGame: false,
    aiQueue: [],
    aiHits: []
  });
  
  const [boardAI, setBoardAI] = useState({
    owner: "AI",
    grid: createGrid(),
    shipList: [],
    receivedHits: 0,
    lostGame: false,
    aiQueue: [],
    aiHits: []
  });
  
  const [prepGrid, setPrepGrid] = useState(createGrid());
  
  const [boardPrep, setBoardPrep] = useState({
    owner: "prep",
    grid: createGrid(),
    shipList: [],
    receivedHits: 0,
    lostGame: false,
    aiQueue: [],
    aiHits: []
  });

  return(
    <div className="game">
      {gameState === "prepare" && <ShipPlacer setGameState={setGameState} grid={boardPrep.grid} />}
      {gameState === "playing" && <Gameboards gridHuman={boardHuman.grid} gridAI={boardAI.grid} />}
    </div>
  )
}

export default Game