import React, { useState, useEffect, useContext } from "react";
import { MinesweeperContext } from "./Minesweeper.jsx";
import styles from "../../styles/minesweeper.module.css";

function Counters() {
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
    }
    return () => clearInterval(timerId);
  }, [gameStage]);

  return (
    <div className={styles.counters}>
      <div>
        <span>Marks left</span>
        <div>{markCount}</div>
      </div>
      <div>
        <span>Time elapsed</span>
        <div>{timeCounter}</div>
      </div>
    </div>
  );
}

export default Counters;
