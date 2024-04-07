import { drop, onDragOver, onDragLeave } from "./dragAndDrop.js";

function Board({ grid }) {

  return(
    <div className="board">
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}  onDrop={drop} onDragOver={onDragOver} onDragLeave={onDragLeave}></div>))
      ))}
    </div>
  )
}

export default Board
