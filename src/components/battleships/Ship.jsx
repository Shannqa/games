import React, { useContext } from "react";
import { BattleshipsContext } from "./Battleships.jsx";
import getFullCoords from "./getFullCoords.js";
import styles from "../../styles/Battleships.module.css";

function Ship({ size }) {
  const { playerGrid, playerShipList, setPlayerShipList } =
    useContext(BattleshipsContext);

  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(
      <div
        className={styles.cell}
        key={size + i}
        id={i}
        data-cell={i + 1}
        data-size={size}
      ></div>
    );
  }

  function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }

  function dragEnd() {
    //areAllShipsPlaced();
  }

  function doubleClick(ev) {
    const targetShip = ev.currentTarget;

    targetShip.classList.toggle(styles.flexToggle);
    const shipSize = parseInt(targetShip.id.slice(-1));
    const direction = targetShip.classList.contains(styles.flexToggle)
      ? "vertical"
      : "horizontal";
    const row = parseInt(targetShip.parentNode.dataset.row);
    const column = parseInt(targetShip.parentNode.dataset.column);

    // parent data-row, parent data-column
    const fullCoords = getFullCoords([row, column], shipSize, direction);
    setPlayerShipList({
      ...playerShipList,
      [shipSize]: fullCoords,
    });
  }

  return (
    <div
      className={styles.shipToPlace}
      id={"to-place-" + size}
      draggable="true"
      onDragStart={dragStart}
      onDoubleClick={doubleClick}
      onDragEnd={dragEnd}
    >
      {singleShip}
    </div>
  );
}

export default Ship;
