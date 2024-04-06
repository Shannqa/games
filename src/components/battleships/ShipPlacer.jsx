import Ship from "./Ship";


function ShipPlacer() {
  const shipSizes = [2, 3, 4, 5];
  
  return(
    <div>
      <Ship size={2} />
      <Ship size={3} />
      <Ship size={4} />
      <Ship size={5} />
    </div>
  )
}

export default ShipPlacer