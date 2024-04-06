import { useState } from "react";
import styles from "./NameInput.css";

function NameInput() {
  const [playerName, setPlayerName] = useState("Player");
  const [showNameInput, setShowNameInput] = useState(true);
  
  function handleSubmit(e) {
    e.preventDefault();
    setShowNameInput(false);
  }
  
  if (showNameInput) {
    return(
      <div className={styles.nameInput}>
        <form id="set-player-name" onSubmit={handleSubmit}>
          <input id="name-input" type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>
          <button type="submit">OK</button>
        </form>
      </div>
    )
  }
}

export default NameInput