import { useContext } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import Prepboard from "./Prepboard";
import ShipPlacer from "./ShipPlacer";
import StartButton from "./StartButton";
import RandomizeButton from "./RandomizeButton";
import ResetBoardButton from "./ResetBoardButton";
import PlacementError from "./PlacementError";
import styles from "./Battleships.module.css";
import getFullCoords from "./getFullCoords.js";

function Pregame({ createGrid }) {
  const { setStage, playerGrid, setPlayerGrid, computerGrid, setComputerGrid, playerShipList, setPlayerShipList, computerShipList, setComputerShipList, playerRandomizer, setPlayerRandomizer, placementError, setPlacementError } = useContext(BattleshipsContext);

  function onStartClick() {
    if (playerRandomizer) {
      // if the player chose a random ship placement
      getRandomComputerShips();
      setStage("playing");
    } else {
      // if the player placed the ships themselves
      const playerCheck = checkPlayerPlacements(playerShipList);
      if (playerCheck) {
        addToBoard(playerGrid, setPlayerGrid, playerShipList);
        getRandomComputerShips();
        setStage("playing");        
      } else {
        console.log("placement error");
        setPlacementError(true);
      }
    }
  }

  function getRandomPlayerShips() {
    // randomize the player's ship placements, show them on the board, disable drag&drop placement component
    let emptyGrid = createGrid();
    const randomShipList = getRandomPlacements();
    setPlayerShipList(randomShipList);
    setPlayerRandomizer(true);
    addToBoard(emptyGrid, setPlayerGrid, randomShipList);
    if (placementError) setPlacementError(false);
  }

  function resetPlayerBoard() {
    // reset button
    setPlayerShipList({});
    setPlayerGrid(() => createGrid());
    setPlayerRandomizer(false);
  }

  function getRandomComputerShips() {
    // randomize ship placements for the AI
    const randomShipList = getRandomPlacements();
      setComputerShipList(randomShipList);
      addToBoard(computerGrid, setComputerGrid, randomShipList);
  }

  function checkPlayerPlacements(shipList) {
    // check if there are any coordinate duplicates by flattening the playerShipList array and then seeing if any coordinate is the same as another one
    const coordinates = Object.values(shipList);
    const flatCoords = coordinates.flat(1);

    // if not all ships placed
    if (flatCoords.length !== 14) return false;

    const obj = {};    
    for (const item of flatCoords) {
      const key = JSON.stringify(item);
      obj[key] = (obj[key] || 0) + 1;
      if (obj[key] > 1) {
        return false;
      }
    }
    return true;
  }
  
  function addToBoard(grid, gridSetter, shipList) {
    // add coordinates from the ship list to the grid
    const keys = Object.keys(shipList);
    let newGrid = [...grid];

    keys.forEach((key) => {
      shipList[key].forEach((coord) => {
        const [r, c] = coord;
        newGrid[r][c] = parseInt(key);
      })
    })
    gridSetter(newGrid);
  }

function getRandomPlacements() {
  // randomize placements for all ship lengths one by one
  const lengths = [2, 3, 4, 5];
  let randomShipList = {};
  // eliminatedFields = coords already occupied + cells immediately adjacent to them
  let eliminatedFields = [];

  lengths.forEach((shipLength) => {
      let coords = getNewCoords(shipLength, eliminatedFields);
      randomShipList = {
        ...randomShipList,
        [shipLength]: coords
      }
    });

    return randomShipList;
  }

  function getNewCoords(shipLength, eliminatedFields) {
    // generate a random ship direction, random coordinates where the ship starts
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
    // get full coordinates for the new ship
    let fullCoords = getFullCoords(startCoord, shipLength, direction);
    
    // check if any of the full coordinates of the new ship are the same as ones on the eliminated list; if so, se recursion to run the function to randomize new coords
    for (const coord1 of eliminatedFields) {
      for (const coord2 of fullCoords) {
        if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
          console.log("duplicate");
          return getNewCoords(shipLength, eliminatedFields);
          } 
        }
      }  
    // adjacent cells are all cells immediately next to a ship cell
    let adjacentCells = [];
    fullCoords.forEach((coord) => {
      let [r, c] = coord;
      let newAdjacents = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
      adjacentCells.push(...newAdjacents);
    });
    
    eliminatedFields.push(...adjacentCells);
    return fullCoords;
  }
  
  return(
    <>
      <Prepboard owner="player" />
      <div className={styles.pregameInfo}>
        <p>Drag & drop the ships onto your board. Double-click a ship to rotate it. Alternatively, click the randomize ships button in order to generate a random placement of ships.</p>
        <p>Once you're happy with your set-up, click the start button to begin the game. Good luck!</p>
        {playerRandomizer ? null : <ShipPlacer />}
        <StartButton onClick={onStartClick} />
        <RandomizeButton onClick={getRandomPlayerShips} />
        <ResetBoardButton onClick={resetPlayerBoard} />
        {placementError ? <PlacementError /> : null}
      </div>
    </>
    
  )
}

export default Pregame