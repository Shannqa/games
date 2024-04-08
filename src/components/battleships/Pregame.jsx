import { useContext } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import Prepboard from "./Prepboard";
import ShipPlacer from "./ShipPlacer";
import StartButton from "./StartButton";
import RandomizeButton from "./RandomizeButton";
import styles from "./Battleships.module.css";
import getFullCoords from "./getFullCoords.js";

function Pregame() {
  const { setStage, playerGrid, setPlayerGrid, computerGrid, setComputerGrid, playerShipList, setPlayerShipList, computerShipList, setComputerShipList } = useContext(BattleshipsContext);

  function areWeReady() {
    console.log(playerGrid);
    const playerCheck = checkPlacements(playerShipList);
    if (playerCheck) {
      addToBoard(playerGrid, setPlayerGrid, playerShipList);
      generateComputerShips();
      setStage("playing");
    } else {
      console.log("error") 
    }
  }

  function generateComputerShips() {
    const newShipList = getRandomPlacements();
    console.log("newcomp" + newShipList);
    checkPlacements(newShipList);
    if (checkPlacements) {
      setComputerShipList(newShipList);
      addToBoard(computerGrid, setComputerGrid, newShipList);
      return;
    } else {
      generateComputerShips();
    }
  }

  function checkPlacements(shipList) {
    // check if there are any coordinate duplicates by flattening the playerShipList array and then seeing if any coordinate is the same as another one
    const check = Object.values(shipList);
    const flat = check.flat(1);
    console.log(flat);
    if (flat.length !== 14) return false;

    const obj = {};    
    for (const item of flat) {
      const key = JSON.stringify(item);
      obj[key] = (obj[key] || 0) + 1;
      if (obj[key] > 1) {
        console.log(false);
        return false;
      }
    }
    console.log(true);
    return true;
  }
  
  function addToBoard(grid, gridSetter, shipList) {
    const keys = Object.keys(shipList);

    let newGrid = [...grid];
    console.log(newGrid);
    // bug - adds sometimes more grid fields for some reason. maybe a problem with the difference between vertical and horizontal, x and y
    keys.forEach((key) => {
      shipList[key].forEach((coord) => {
        const [r, c] = coord;
        newGrid[r][c] = parseInt(key);
      })
    })
    console.log(newGrid);
    gridSetter(newGrid);
  }
  

  /* randomize placement of ships */
  function getRandomPlacements() {
    const lengths = [2, 3, 4, 5];
    let randomShipList = {};
    lengths.forEach((shipLength) => {
      let coords = getNewCoords(shipLength);
      randomShipList = {
        ...randomShipList,
        [shipLength]: coords
      }
    });
    
    return randomShipList;
  }
  
  function getNewCoords(shipLength) {
    //randomize - horizontal or vertical
    let direction;
    let startCoord = [];
    let random1 = Math.floor(Math.random() * 10);
    let random2 = Math.floor(Math.random() * (10 - shipLength)); 
    let chance = Math.random() * 1;
    if (chance < 0.5) {
      direction = "vertical";
      startCoord = [random2, random1];
    } else {
      direction = "horizontal";
      startCoord = [random1, random2]
    }
    let fullCoords = getFullCoords(startCoord, shipLength, direction);
    return fullCoords;
  }

  return(
    <div className={styles.pregame}>
      <p>Place all your ships on the board:</p>
      <Prepboard owner="player" />
      <ShipPlacer />
      <StartButton onClick={areWeReady} />
      <RandomizeButton onClick={getRandomPlacements} />
    </div>
  )
}

export default Pregame