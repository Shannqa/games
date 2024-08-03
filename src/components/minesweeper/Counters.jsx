import React, { useState, useEffect, useContext } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
import styles from "../../styles/minesweeper.module.css";

function Counters({ restart }) {
  const {
    chosenDifficulty,
    playerBoard,
    setPlayerBoard,
    markCount,
    setMarkCount,
    gameStage,
  } = useContext(MinesweeperContext);

  const [timeCounter, setTimeCounter] = useState(0);

  useEffect(() => {
    let timerId;
    if (gameStage === "playing") {
      timerId = setInterval(() => {
        setTimeCounter((c) => c + 1);
      }, 1000);
    } else if (gameStage === "ready") {
      setTimeCounter(0);
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [gameStage]);

  return (
    <div className={styles.counters}>
      <div>
        <span>Marks left</span>
        <div>{markCount}</div>
      </div>
      <div onClick={restart} className={styles.restart}>
        <img src="./replay_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" />
      </div>
      <div>
        <span>Time elapsed</span>
        <div>{timeCounter}</div>
      </div>
    </div>
  );
}

export default Counters;
