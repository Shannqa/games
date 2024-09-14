import React from "react";
import styles from "../../styles/brickshooter.module.css";
import { paused, changePaused } from "./pause";
function MobileButtons() {
  return (
    <div className={styles.mobilebuttons}>
      <div>
        {paused ? (
          <img src="play_circle_24dp_000_FILL0_wght400_GRAD0_opsz24.svg" />
        ) : (
          <img
            src="/pause_circle_24dp_000_FILL0_wght400_GRAD0_opsz24.svg"
            onClick={changePaused}
          />
        )}
      </div>
    </div>
  );
}

export default MobileButtons;
