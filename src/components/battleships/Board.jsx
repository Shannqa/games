function Board({ grid }) {
//onClick={owner === "AI" ? clickHandler : null} onDrop={drop} onDragOver={onDragOver} onDragLeave={onDragLeave}

  return(
    <div className="board">
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex} ></div>))
      ))}
    </div>
  )
}

export default Board
