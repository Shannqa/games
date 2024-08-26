import React, { useContext, useState } from "react";
import { AppContext } from "../root/Root.jsx";
import styles from "../../styles/brickshooter.module.css";

function Modal({ restart, lives, score, gameStageSave, setGameStageSave }) {
  const { scoresBS, setScoresBS } = useContext(AppContext);
  const { playerName, setPlayerName } = useState("");

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

    fetch("/api/scores", {
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
        setGameStageSave("playAgain");
      })

      .catch((err) => {
        console.log(err);
      });
  }

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
        <button onClick={() => restart()}>Play again</button>
      )}
    </div>;
  } else if (gameStageSave === "gameLoss") {
    return (
      <div className={`${styles.modal} ${styles.loss}`}>
        {isHighscore() ? (
          <div>
            <p>New highscore!</p>
            <div>Enter the name you want to be remembered by:</div>
            <input
              type="text"
              placeholder="Your name..."
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={addScore}>Save score</button>
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
  } else if (gameStageSave === "playAgain") {
    <div className={`${styles.modal} ${styles.loss}`}>
      <p>Highscore saved!</p>
      <div>Would you like to play again?</div>
      <button onClick={() => startGame()}>Play again</button>
    </div>;
  }
}

export default Modal;
