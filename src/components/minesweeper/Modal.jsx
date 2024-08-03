import React from "react";
import styles from "../../styles/minesweeper.module.css";

function Modal({ stage, restart }) {
  if (stage === "win") {
    return (
      <div className={`${styles.modal} ${styles.win}`}>
        <div>Congratulations!</div>
        <button onClick={restart}>Play again</button>
      </div>
    );
  } else if (stage === "loss") {
    return (
      <div className={`${styles.modal} ${styles.loss}`}>
        <div>Oh no! Would you like to try again?</div>
        <button onClick={restart}>Play again</button>
      </div>
    );
  }
}

export default Modal;
