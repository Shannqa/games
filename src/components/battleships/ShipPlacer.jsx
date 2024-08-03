import React from "react";
import Ship from "./Ship";
import styles from "../../styles/Battleships.module.css";

function ShipPlacer() {
  const shipSizes = [2, 3, 4, 5];

  return (
    <div className={styles.shipPlacer}>
      {shipSizes.map((item, index) => (
        <Ship key={index} size={shipSizes[index]} index={index} />
      ))}
    </div>
  );
}

export default ShipPlacer;
