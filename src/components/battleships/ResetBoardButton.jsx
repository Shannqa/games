import React from "react";
import styles from "../../styles/Battleships.module.css";

function ResetBoardButton({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      Reset board
    </button>
  );
}

export default ResetBoardButton;
