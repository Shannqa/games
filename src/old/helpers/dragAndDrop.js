import getFullCoords from "../helpers/getFullCoords.js";

/* Drag and drop functions, used for placing ships on the board */

function dragStart(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragEnd() {
  //areAllShipsPlaced();
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

function onDragLeave(ev) {
  ev.preventDefault();
  removeHoverClass();
}

function drop(ev) {
  // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
  try {
    ev.preventDefault();
    const shipID = ev.dataTransfer.getData("text");
    const draggedShip = document.querySelector(`#${shipID}`);
    const shipSize = parseInt(shipID.slice(-1));
    const targetX = parseInt(ev.target.dataset.column); // horizontal
    const targetY = parseInt(ev.target.dataset.row); // vertical
    const direction = draggedShip.classList.contains("flex-toggle")
      ? "vertical"
      : "horizontal";
    const fullCoords = getFullCoords([targetX, targetY], shipSize, direction);
    // to add: need to list full coords when direction is toggled while on the board!

    // if the ship would be placed outside of the grid
    if (
      (direction === "horizontal" && shipSize + targetX > 10) ||
      (direction === "vertical" && shipSize + targetY > 10)
    ) {
      removeHoverClass();
      return;
    }
    draggedShip.classList.add("ship-on-board");
    ev.target.appendChild(draggedShip);
  } catch {
    console.error("error - drag&drop");
    removeHoverClass();
    return;
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

function doubleClick(ev) {
  ev.currentTarget.classList.toggle("flex-toggle");
}

export {
  dragStart,
  dragEnd,
  onDragOver,
  onDragLeave,
  drop,
  addToBoard,
  doubleClick,
};
