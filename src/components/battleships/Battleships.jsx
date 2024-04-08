import { useState } from "react";
import styles from "./Battleships.module.css";
import Pregame from "./Pregame";
import Game from "./Game";

function Battleships() {
  
  const [stage, setStage] = useState("preparing");
  const [prepGrid, setPrepGrid] = useState(() => createGrid());
  const [playerGrid, setPlayerGrid] = useState(() => createGrid());
  const [computerGrid, setComputerGrid] = useState(() => createGrid());
  const [prepShipList, setPrepShipList] = useState({
    2: [],
    3: [],
    4: [],
    5: []
  }) 
  function createGrid() {
    const gridSize = 10;
    let gridArray = [];
    for (let y = 0; y < gridSize; y++) {
      gridArray.push([]);
      for (let x = 0; x < gridSize; x++) {
        gridArray[y].push(null);
      }
    }
    return gridArray;
  }

  return(
    <div className={styles.gameWindow}>
    {stage === "preparing" ? <Pregame grid={prepGrid} prepShipList={prepShipList} setPrepShipList={setPrepShipList} /> : <Game />}
    </div>
  )
  
  
}

export default Battleships