import { useState, createContext } from "react";
import styles from "./Battleships.module.css";
import Pregame from "./Pregame";
import Game from "./Game";
import PlacementError from "./PlacementError";


export const BattleshipsContext = createContext({
  stage: "",
  setStage: () => {},
  playerGrid: [],
  setPlayerGrid: () => {},
  computerGrid: [],
  setComputerGrid: () => {},
  playerShipList: {},
  setPlayerShipList: () => {},
  computerShipList: {},
  setComputerShipList: () => {},
  playerRandomizer: "",
  setPlayerRandomizer: () => {},
  placementError: "",
  setPlacementError: () => {},
  currentMove: "", 
  setCurrentMove: () => {}
});

function Battleships() {
  const [stage, setStage] = useState("preparing");
  const [playerGrid, setPlayerGrid] = useState(() => createGrid());
  const [computerGrid, setComputerGrid] = useState(() => createGrid());
  const [playerShipList, setPlayerShipList] = useState({
    2: [],
    3: [],
    4: [],
    5: []
  });
  const [computerShipList, setComputerShipList] = useState();
  const [playerRandomizer, setPlayerRandomizer] = useState(false);
  const [placementError, setPlacementError] = useState(false);
  const [currentMove, setCurrentMove] = useState(null);

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
    <BattleshipsContext.Provider value={{
      stage,
      setStage,
      playerGrid,
      setPlayerGrid,
      computerGrid,
      setComputerGrid,
      playerShipList,
      setPlayerShipList,
      computerShipList,
      setComputerShipList,
      playerRandomizer,
      setPlayerRandomizer,
      placementError,
      setPlacementError,
      currentMove,
      setCurrentMove
    }}>
      <div className={styles.gameWindow}>
        {stage === "preparing" ? <Pregame createGrid={createGrid} /> : <Game />}
      </div>
    </BattleshipsContext.Provider>
  )
  
  
}

export default Battleships