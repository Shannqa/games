import { dragStart, doubleClick, dragEnd } from "./dragAndDrop.js";
import getFullCoords from "./getFullCoords.js";

function Ship({ size }) {
  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(<div className="cell" key={size + i} id={i} data-cell={i + 1} data-size={size}></div>);
  }

  return(
    <div className="ship-to-place" id={"to-place-" + size} draggable="true" onDragStart={dragStart} onDoubleClick={doubleClick} onDragEnd={dragEnd}>
      {singleShip}
    </div>
  )
}

export default Ship