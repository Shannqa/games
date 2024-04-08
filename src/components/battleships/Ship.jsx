import getFullCoords from "./getFullCoords.js";

function Ship({ size, grid, prepShipList, setPrepShipList }) {
  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(<div className="cell" key={size + i} id={i} data-cell={i + 1} data-size={size}></div>);
  }

  function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  
  function dragEnd() {
    //areAllShipsPlaced();
  }

  function doubleClick(ev) {
    const targetShip = ev.currentTarget;

    targetShip.classList.toggle("flex-toggle");
    const shipSize = parseInt(targetShip.id.slice(-1));
    const direction = targetShip.classList.contains("flex-toggle")
    ? "vertical"
    : "horizontal";
    const row = parseInt(targetShip.parentNode.dataset.row);
    const column = parseInt(targetShip.parentNode.dataset.column);
  
    // parent data-row, parent data-column
    const fullCoords = getFullCoords([row, column], shipSize, direction);
    setPrepShipList({
      ...prepShipList,
      [shipSize]: fullCoords
    })
  }

  return(
    <div className="ship-to-place" id={"to-place-" + size} draggable="true" onDragStart={dragStart} onDoubleClick={doubleClick} onDragEnd={dragEnd}>
      {singleShip}
    </div>
  )
}

export default Ship