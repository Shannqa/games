import React from "react";
import styles from "./Battleships.module.css";

function PlacementError() {
  return (
    <div className={styles.placementError}>
      <p>
        Oh no! Some ships don't fit on the board or overlap. Use drag & drop to
        move them or double click to rotate them before you can begin the game.{" "}
      </p>
    </div>
  );
}

export default PlacementError;
