function Board({ grid, shipList }) {

  return(
    <div className="board">
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}>{column}</div>))
      ))}
    </div>
  )
}

export default Board
