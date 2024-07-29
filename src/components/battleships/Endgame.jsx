import React, { useContext, useState } from "react";
import { BattleshipsContext } from "./Battleships.jsx";
import styles from "./Battleships.module.css";
import PlayAgainButon from "./PlayAgainButton.jsx";

function Endgame() {
  const {
    setStage,
    setPlayerGrid,
    setComputerGrid,
    setCurrentMove,
    setComputerShipList,
    setPlayerShipList,
    winner,
    setWinner,
    setPlacementError,
    setPlayerRandomizer,
    createGrid,
  } = useContext(BattleshipsContext);

  function playAgain() {
    setStage("preparing");
    setPlayerShipList({
      2: [],
      3: [],
      4: [],
      5: [],
    });
    setComputerShipList({});
    setPlayerRandomizer(false);
    setPlacementError(false);
    setCurrentMove(null);
    setWinner(null);
    setPlayerGrid(() => createGrid());
    setComputerGrid(() => createGrid());
  }

  return (
    <div className={styles.endgame}>
      {winner === "player" ? (
        <p>Congratulations, you won!</p>
      ) : (
        <p>You lost, better luck next time!</p>
      )}
      <PlayAgainButon onClick={playAgain} />
    </div>
  );
}

export default Endgame;
