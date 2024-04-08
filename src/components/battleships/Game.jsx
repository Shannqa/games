function Game({ playerGrid, setPlayerGrid, computerGrid, setComputerGrid }) {
  
  return(
    <div>
      <Board grid={playerGrid} />
      <Board grid={computerGrid} />
    </div>
  )
}

export default Game