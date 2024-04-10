import { useContext } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import Board from "./Board";

function Game() {
  const { playerGrid, computerGrid } = useContext(BattleshipsContext);
  
  return(
    <>
      <div>
        <h2>Player:</h2>
        <Board grid={playerGrid} owner="player" />
      </div>
      <div>
        <h2>Computer:</h2>
        <Board grid={computerGrid} owner="enemy"/>
      </div>
    </>
  )
}

export default Game