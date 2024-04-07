import Ship from "./Ship";

function ShipPlacer({ grid, prepShipList, setPrepShipList }) {
  const shipSizes = [2, 3, 4, 5];
  return(
    <div>
      {shipSizes.map((item, index) => (
        <Ship key={index} size={shipSizes[index]} index={index} grid={grid} prepShipList={prepShipList} setPrepShipList={setPrepShipList}/>
      ))}
    </div>
  )
}

export default ShipPlacer