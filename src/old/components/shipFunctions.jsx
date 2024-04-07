const shipSizes = [2, 3, 4, 5];

const [ships, seShips] = useState(shipSizes.map((ship, index) => (
    {
    id: {index},
    size: ship,
    direction: null, // horizontal || vertical
    start: [null, null],
    fullCoords: getFullCoords(start, size, direction),
    placed: false, // true || false
    hits: null // ["x", "y"]
    }
  ))
  )
  
  function placeOnGrid(shipIndex, shipDirection, startCoords) {
    setShips(ships.map((ship) => {
      if (shipIndex === index) {
        return {
          ...ship,
          direction: shipDirection,
          start: startCoords,
          fullCoords: getFullCoords(start, size, direction),
          placed: true
        }
      } else {
        return ship;
      }
    }))
  }
  function populateGrid() {
  
  }
    // gets full coordinates of every square in a single ship
  function getFullCoords(start, size, direction) {
    const [x, y] = start;
    let fullCoords = [];
    
    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        fullCoords.push([i, y]);
      }
    } else if (direction === "horizontal") {
      for (let i = y; i < y + size; i++) {
        fullCoords.push([x, i]);
      }
    }
    return fullCoords;
  }
  
  // check if any square of the new ship is already occupied;
  function checkIfOccupied(fullCoords, grid) {
    for (let i = 0; i < fullCoords.length; i++) {
      let [x, y] = fullCoords[i];
      if (grid[x][y] !== null) {
        // cell is occupied
        return true;
      }
    return false;
  }

}