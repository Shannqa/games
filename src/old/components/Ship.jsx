import React, { useState } from "react";
import { dragStart, doubleClick, dragEnd } from "../helpers/dragAndDrop.js";
import getFullCoords from "../helpers/getFullCoords.js";

function Ship(props) {
  const size = parseInt(props.size);
  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(<div className="cell" key={size + i} id={i} data-cell={i + 1} data-size={size}></div>);
  }
  
  return(
    <div className="ship-to-place" id={"to-place-" + props.size} draggable="true" onDragStart={dragStart} onDoubleClick={doubleClick} onDragEnd={dragEnd}>
      {singleShip}
    </div>
  )
}

export default Ship
export { getFullCoords }