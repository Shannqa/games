import Prepboard from "./Prepboard";
import ShipPlacer from "./ShipPlacer";
import StartButton from "./StartButton";
import styles from "./Pregame.module.css";

function Pregame({ grid, prepShipList, setPrepShipList }) {
  
  function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  
  function dragEnd() {
    //areAllShipsPlaced();
  }
  

  
  function removeHoverClass() {
    // remove styling of cell(s) that are being hovered over once the event ends
    const hoveredCells = document.querySelectorAll(".dragover-ship");
    if (hoveredCells) {
      for (let cell of hoveredCells) {
        cell.classList.remove("dragover-ship");
      }
    }
  }
  
  function areWeReady() {
    const check = checkPlacements();
    if (check) {
      // add to the grid
    } else {
      // error placing ships
    }

  }
  function checkPlacements() {
    // check if there are any coordinate duplicates by flattening the prepShipList array and then seeing if any coordinate is the same as another one
    const check = Object.values(prepShipList);
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
  
  
  function addToBoard(grid, gridSetter) {
    const keys = Object.keys(prepShipList);
    let newGrid = [...grid];
    
    keys.forEach((key) => {
      prepShipList[key].forEach((coord) => {
        const [x, y] = coord;
        newGrid[x][y] = parseInt(key);
      })
    })
    
    gridSetter(newGrid);
  }
  
  


  //////////////

/*
  placeShip(length, coordsStart, coordsEnd) {
    const id = this.shipsList.length;
    const placedShip = new Ship(length, id);

    // if the ship's length > 2, mark the other squares too
    this.shipsList.push(placedShip);
    if (coordsStart[0] !== coordsEnd[0]) {
      for (let i = coordsStart[0]; i <= coordsEnd[0]; i++) {
        this.grid[i][coordsStart[1]] = id;
      }
    }
    if (coordsStart[1] !== coordsEnd[1]) {
      for (let i = coordsStart[1]; i <= coordsEnd[1]; i++) {
        this.grid[coordsStart[0]][i] = id;
      }
    }
    this.grid[coordsStart[0]][coordsStart[1]] = id;
    this.grid[coordsEnd[0]][coordsEnd[1]] = id;
  }
*/
  return(
    <div className={styles.pregame}>
      <p>Place all your ships on the board:</p>
      <Prepboard grid={grid} prepShipList={prepShipList} setPrepShipList={setPrepShipList} />
      <ShipPlacer grid={grid} prepShipList={prepShipList} setPrepShipList={setPrepShipList} />
      <StartButton onClick={checkPlacements} />
    </div>
  )
}

export default Pregame