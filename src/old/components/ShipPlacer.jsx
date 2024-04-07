import React, {useState} from "react";
import Ship, {getFullCoords} from "./Ship.jsx";
import Grid from "./Grid.jsx";
import StartButton from "./StartButton.jsx"

function ShipPlacer({ setGameState, grid }) {
  const shipSizes = [2, 3, 4, 5];

  const [ships, seShips] = useState(shipSizes.map((ship, index) => ({
      id: {index},
      size: ship,
      direction: null, // horizontal || vertical
      start: [null, null],
      fullCoords: "", // getFullCoords(start, size, direction),
      placed: false, // true || false
      hits: null // ["x", "y"]
    }
  )));
  


  
  function checkPlacements() {
    let placementsChecked = true;
    
    /* check */
    
    if (placementsChecked) {
      setGameState("playing");
    }
  }
  
  
  return(
    <div className="ship-placer">
      <h3>Place your ships</h3>
      <div>
        <Grid owner="prepare" grid={grid}/>
      </div>
      <div>
        <p>Drag & drop the ships on the board. Double-click a ship to rotate it.</p>
        <p>Once you're happy with the placement of your ships, click the start button to begin the game!</p>
        {shipSizes.map((item, index) => (
          <Ship key={index} size={shipSizes[index]} index={index} />
        ))}
        <StartButton onClick={checkPlacements} />
      </div>
    </div>
  )
}

export default ShipPlacer