import React from "react";
import styles from "../../styles/arkanoid.module.css";
import { nextLevel } from "./stages";

function Modal({ restart, lives, score, gameStageSave }) {
  if (gameStageSave === "modd") {
    return (
      <div className={`${styles.modal} ${styles.win}`}>
        <div>Good job!</div>
        <div>Current score: {score}</div>
        <div>Lives left: {lives}</div>
        <button onClick={() => nextLevel()}>Continue</button>
      </div>
    );
  } else if (gameStageSave === "gameLoss") {
    return (
      <div className={`${styles.modal} ${styles.loss}`}>
        <div>No lives left!</div>
        <div>Your score: {score}</div>
        <div>Would you like to try again?</div>
        <button onClick={restart}>Play again</button>
      </div>
    );
  }
}

export default Modal;
