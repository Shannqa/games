import React, { useContext } from "react";
import { BattleshipsContext } from "./Battleships.jsx";
import getFullCoords from "./getFullCoords.js";
import styles from "../../styles/Battleships.module.css";

function Prepboard({ owner }) {
  const { playerGrid, playerShipList, setPlayerShipList } =
    useContext(BattleshipsContext);

  function drop(ev) {
    // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
    try {
      ev.preventDefault();
      const shipID = ev.dataTransfer.getData("text");
      const draggedShip = document.querySelector(`#${shipID}`);
      const shipSize = parseInt(shipID.slice(-1));
      const targetR = parseInt(ev.target.dataset.row);
      const targetC = parseInt(ev.target.dataset.column);
      const direction = draggedShip.classList.contains(styles.flexToggle)
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
      draggedShip.classList.add(styles.shipOnBoard);
      ev.target.appendChild(draggedShip);
      setPlayerShipList({
        ...playerShipList,
        [shipSize]: fullCoords,
      });
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
    ev.target.classList.add(styles.dragoverShip);
  }

  function removeHoverClass() {
    // remove styling of cell(s) that are being hovered over once the event ends
    const hoveredCells = document.querySelectorAll(`.${styles.dragoverShip}`);
    if (hoveredCells) {
      for (let cell of hoveredCells) {
        cell.classList.remove(styles.dragoverShip);
      }
    }
  }

  return (
    <div className={styles.boardContainer}>
      <h3>Your board</h3>
      <div
        className={
          owner === "player"
            ? `${styles.board} ${styles.ownBoard}`
            : `${styles.board} ${styles.enemyBoard}`
        }
      >
        {playerGrid.map((row, rindex) =>
          row.map((column, cindex) => (
            <div
              className={
                column === null
                  ? styles.cell
                  : `${styles.cell} ${styles.randomShipOnBoard}`
              }
              data-row={rindex}
              data-column={cindex}
              key={rindex + "-" + cindex}
              onDrop={drop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              {column}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Prepboard;
