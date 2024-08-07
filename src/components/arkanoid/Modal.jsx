import React, { useContext } from "react";
import styles from "../../styles/arkanoid.module.css";
import { ArkanoidContext } from "./Game";

function Modal({ restart }) {
  const { gameStage, score } = useContext(ArkanoidContext);
  
  if (gameStage === "win") {
    return (
      <div className={`${styles.modal} ${styles.win}`}>
        <div>Congratulations!</div>
        <div>Your score: {score}</div>
        <button onClick={restart}>Play again</button>
      </div>
    );
  } else if (gameStage === "loss") {
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
