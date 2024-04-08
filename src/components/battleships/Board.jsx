function Board({ grid, owner }) {

  return(
    <div className={owner== "player" ? "board own-board" : " board enemy-board"}>
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}>{column}</div>))
      ))}
    </div>
  )
}

export default Board
