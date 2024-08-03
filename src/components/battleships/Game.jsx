import React, { useContext } from "react";
import { BattleshipsContext } from "./Battleships.jsx";
import Board from "./Board";
import styles from "../../styles/Battleships.module.css";

function Game() {
  const { playerGrid, computerGrid, currentMove, setCurrentMove } =
    useContext(BattleshipsContext);

  return (
    <>
      <div>
        <h3>Enemy board:</h3>
        <Board grid={computerGrid} owner="enemy" />
      </div>
      <div>
        <h3>Your board:</h3>
        <Board grid={playerGrid} owner="player" />
      </div>
    </>
  );
}

export default Game;
