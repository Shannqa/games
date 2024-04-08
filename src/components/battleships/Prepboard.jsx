import getFullCoords from "./getFullCoords.js";

function Prepboard({ grid, prepShipList, setPrepShipList  }) {

  function drop(ev) {
    // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
    try {
      ev.preventDefault();
      const shipID = ev.dataTransfer.getData("text");
      const draggedShip = document.querySelector(`#${shipID}`);
      const shipSize = parseInt(shipID.slice(-1));
      const targetR = parseInt(ev.target.dataset.row); 
      const targetC = parseInt(ev.target.dataset.column); 
      const direction = draggedShip.classList.contains("flex-toggle")
        ? "vertical"
        : "horizontal";
      const fullCoords = getFullCoords([targetR, targetC], shipSize, direction);
      // to add: need to list full coords when direction is toggled while on the board!
  
      // if the ship would be placed outside of the grid
      if (
        (direction === "horizontal" && shipSize + targetC > 10) ||
        (direction === "vertical" && shipSize + targetR > 10)
      ) {
        removeHoverClass();
        return;
      }
      draggedShip.classList.add("ship-on-board");
      ev.target.appendChild(draggedShip);
      setPrepShipList({
        ...prepShipList,
        [shipSize]: fullCoords
      })
    } catch {
      console.error("error - drag&drop");
      removeHoverClass();
      return;
    }
  }

  function onDragLeave(ev) {
    ev.preventDefault();
    removeHoverClass();
  }

  function onDragOver(ev) {
    // style cell that's being hovered over
    ev.preventDefault();
    ev.target.classList.add("dragover-ship");
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

  return(
    <div className="board">
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}  onDrop={drop} onDragOver={onDragOver} onDragLeave={onDragLeave}></div>))
      ))}
    </div>
  )
}

export default Prepboard
