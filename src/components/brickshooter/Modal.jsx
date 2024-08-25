import React from "react";
import styles from "../../styles/brickshooter.module.css";

function Modal({ restart, lives, score, gameStageSave, setGameStageSave }) {
  function startGame() {
    setGameStageSave("startLevel");
    const canvas = document.getElementById("brickCanvas");
    canvas.scrollIntoView();
  }

  function nextLevel() {
    setGameStageSave("newLevel");
  }

  if (gameStageSave === "loaded") {
    return (
      <div className={`${styles.modal}`}>
        <div>Click to begin!</div>
        <button onClick={() => startGame()}>Start game</button>
      </div>
    );
  }
  if (gameStageSave === "modalNextLevel") {
    return (
      <div className={`${styles.modal} ${styles.win}`}>
        <div>Good job!</div>
        <div>Current score: {score}</div>
        <div>Lives left: {lives}</div>
        <button onClick={() => nextLevel()}>Continue</button>
      </div>
    );
  } else if (gameStageSave === "modalGameWin") {
    <div className={`${styles.modal} ${styles.win}`}>
      <div>Congratulations! </div>
      <div>You beat all levels!</div>
      <div>Your final score: {score}</div>
      <button onClick={() => restart()}>Play again</button>
    </div>;
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
