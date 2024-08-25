import React from "react";
import styles from "../../styles/brickshooter.module.css";
import LevelChooser from "./LevelChooser";

function Controls({ setLevelSave, LEVEL, changeLevel }) {
  return (
    <div className={styles.controls}>
      <p>Choose a level (for testing):</p>
      <LevelChooser
        setLevelSave={setLevelSave}
        LEVEL={LEVEL}
        changeLevel={changeLevel}
      />
      <img
        src="stat_0_16dp_000_FILL0_wght400_GRAD0_opsz20.svg"
        className={styles.divider}
      />
      <p>Move the paddle:</p>
      <div className={styles.keys1}>
        <img src="/keyboard_arrow_left_24dp_000_FILL0_wght400_GRAD0_opsz24.svg" />
        <img src="/keyboard_arrow_right_24dp_000_FILL0_wght400_GRAD0_opsz24.svg" />
        <span>left arrow</span>
        <span>right arrow</span>
      </div>
      <img
        src="stat_0_16dp_000_FILL0_wght400_GRAD0_opsz20.svg"
        className={styles.divider}
      />
      <p>Shoot the ball:</p>
      <div className={styles.keys2}>
        <img src="/space_bar_24dp_000_FILL0_wght400_GRAD0_opsz24.svg" />
        <span>space bar</span>
      </div>
    </div>
  );
}

export default Controls;
