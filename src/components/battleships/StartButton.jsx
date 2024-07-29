import React from "react";
import styles from "./Battleships.module.css";

function StartButton({ onClick }) {
  return (
    <button className={`${styles.button} ${styles.start}`} onClick={onClick}>
      Start Game
    </button>
  );
}

export default StartButton;
