import Board from "./Board";
import ShipPlacer from "./ShipPlacer";

function Pregame({ grid }) {
  


  return(
    // <div className={styles.pregame}>
    <div>
      <p>Place all your ships on the board:</p>
      <Board grid={grid} />
      <ShipPlacer />
    </div>
  )
}

export default Pregame