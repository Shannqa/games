import Ship from "./Ship";

function ShipPlacer() {
  const shipSizes = [2, 3, 4, 5];

  return(
    <div>
      {shipSizes.map((item, index) => (
        <Ship key={index} size={shipSizes[index]} index={index}/>
      ))}
    </div>
  )
}

export default ShipPlacer