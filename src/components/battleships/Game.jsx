import Board from "./Board";

function Game({ playerGrid, computerGrid, prepShipList, computerShipList }) {
  
  return(
    <div>
      <h2>Player:</h2>
      <Board grid={playerGrid} shipList={prepShipList} />
      <h2>Computer:</h2>
      <Board grid={computerGrid} shipList={computerShipList} />
    </div>
  )
}

export default Game