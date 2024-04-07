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
  

  
  
  
  function addToBoard(fullCoords, id, grid, gridSetter, coord) {
    // add a single ship cell to the board
    const [x, y] = coord;
    gridSetter(
      grid.map((column, colIndex) => {
        if (colIndex === y) {
          column.map((row, rowIndex) => {
            if (rowIndex === x) {
              row = id;
            }
          });
        }
      })
    );
  }
  

  return(
    <div className={styles.pregame}>
      <p>Place all your ships on the board:</p>
      <Prepboard grid={grid} prepShipList={prepShipList} setPrepShipList={setPrepShipList} />
      <ShipPlacer grid={grid} prepShipList={prepShipList} setPrepShipList={setPrepShipList} />
      <StartButton />
    </div>
  )
}

export default Pregame