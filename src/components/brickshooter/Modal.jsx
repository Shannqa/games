import React, { useContext, useState } from "react";
import { AppContext } from "../root/Root.jsx";
import styles from "../../styles/brickshooter.module.css";
import { changeGameStage, resetStats } from "./stages.js";

function Modal({
  lives,
  score,
  gameState,
  setGameState,
  modal,
  setModal,
  setLevelSave,
}) {
  const { scoresBS, setScoresBS } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");

  function isHighscore() {
    // determine if it's a new highscore
    console.log(score, scoresBS[1].score);
    if (scoresBS && score > scoresBS[scoresBS.length - 1].score) {
      console.log("true");
      return true;
    } else {
      return false;
    }
  }

  function addScore(e) {
    e.preventDefault();
    const server = import.meta.env.VITE_SERVER;
    fetch(`${server}/api/scores`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game: "brickshooter",
        name: playerName,
        score: score,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
      })
      .finally(() => {
        setGameState("playAgain");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cancelScore(e) {
    e.preventDefault();
    setGameState("playAgain");
  }

  function startGame() {
    setGameState("startLevel");
    changeGameStage("playing");
    const canvas = document.getElementById("brickCanvas");
    canvas.scrollIntoView();
    setModal(false);
    // resetStats(setLevelSave);
  }

  function nextLevel() {
    setGameState("newLevel");
    changeGameStage("playing");
    setModal(false);
  }

  if (gameState === "loaded") {
    return (
      <div className={`${styles.modal}`}>
        <div>Click to begin!</div>
        <button onClick={() => startGame()}>Start game</button>
      </div>
    );
  }
  if (gameState === "nextLevel") {
    return (
      <div className={`${styles.modal} ${styles.win}`}>
        <div>Good job!</div>
        <div>Current score: {score}</div>
        <div>Lives left: {lives}</div>
        <button onClick={() => nextLevel()}>Continue</button>
      </div>
    );
  } else if (gameState === "gameWin") {
    <div className={`${styles.modal} ${styles.win}`}>
      <p>Congratulations, you beat all levels!</p>
      <div>Your earned {score} points.</div>
      {isHighscore() ? (
        <div>
          Enter the name you want to be remembered by:
          <input
            type="text"
            placeholder="Your name..."
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={addScore}>Save score</button>
        </div>
      ) : (
        <button onClick={() => startGame()}>Play again</button>
      )}
    </div>;
  } else if (gameState === "gameLoss") {
    return (
      <div className={`${styles.modal} ${styles.loss}`}>
        {isHighscore() ? (
          <div>
            <p>New highscore!</p>
            <div>You earned {score} points</div>
            <div>Enter your name:</div>
            <input
              type="text"
              placeholder="Your name..."
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <div className={styles.buttons}>
              <button onClick={(e) => addScore(e)}>Save score</button>
              <button onClick={(e) => cancelScore(e)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p>Game over</p>
            <div>You earned {score} points</div>
            <div>Would you like to try again?</div>
            <button onClick={() => startGame()}>Play again</button>
          </div>
        )}
      </div>
    );
  } else if (gameState === "playAgain") {
    return (
      <div className={`${styles.modal} ${styles.loss}`}>
        <div>Would you like to play again?</div>
        <button onClick={() => startGame()}>Play again</button>
      </div>
    );
  }
}

export default Modal;
