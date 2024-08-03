import React from "react";
import styles from "../../styles/Battleships.module.css";

function PlayAgainButon({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      Play again
    </button>
  );
}

export default PlayAgainButon;
