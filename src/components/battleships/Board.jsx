function Board({ grid }) {
  
  function getRandomPlacements() {
    const lengths = [2, 3, 4, 5];
    const randomShipList = {
    
    };
    lengths.forEach((shipLength) => {
      let coords = getNewCoords(shipLength);
    })
  }
  
  function getNewCoords(shipLength) {
    //randomize - horizontal or vertical
    let direction;
    let startCoord = [];
    let random1 = Math.floor(Math.random() * 10);
    let random2 = Math.floor(Math.random() * (10 - shipLength); 
    let chance = Math.random() * 1;
    if (chance < 0.5) {
      direction = "vertical";
      startCoord = [random2, random1];
    } else {
      direction = "horizontal";
      startCoord = [random1, random2]
    }
    let fullCoords = getFullCoords(startCoord, shipLength, direction);
    
  }
  
    // generate random ships and place them on the enemy board
  getRandomPlacement() {
    for (let i = Gameboard.shipLengths.length - 1; i >= 0; i--) {
      const shipL = parseInt(Gameboard.shipLengths[i]);
      let coords = this.getNewCoords(shipL);
      this.placeShip(
        shipL,
        [coords[0][0], coords[0][1]],
        [coords[1][0], coords[1][1]]
      );
      // console.log(this.grid);
    }
  }

  // runs functions generating and checking if new coords are valid, returns coords for one ship or uses recursion to start over the process if coords are invalid
  getNewCoords(shipLength) {
    let coords = this.randomizeCoords(parseInt(shipLength));
    let fullCoords = this.getFullCoords(coords);
    let coordCheck = this.checkIfOccupied(fullCoords);
    if (coordCheck === false) {
      return coords;
    } else {
      return this.getNewCoords(parseInt(shipLength));
    }
  }

  // uses math.random to get random coordinates on the board, randomize wheter the new ship will be vertical or horizontal, calculate that it fits on the board according to the ships length
  randomizeCoords(shipLength) {
    const startRow = Math.floor(Math.random() * 10);
    const startCol = Math.floor(Math.random() * 10);
    const endRow = startRow + parseInt(shipLength) - 1;
    const endCol = startCol + parseInt(shipLength) - 1;

    if (endRow < 10 && endCol < 10) {
      //randomize - horizontal or vertical
      let chance = Math.random() * 1;
      if (chance < 0.5) {
        return [
          [startRow, startCol],
          [startRow, endCol],
        ];
      } else {
        return [
          [startRow, startCol],
          [endRow, startCol],
        ];
      }
    } else if (endCol < 10) {
      return [
        [startRow, startCol],
        [startRow, endCol],
      ];
    } else if (endRow < 10) {
      return [
        [startRow, startCol],
        [endRow, startCol],
      ];
    } else {
      return this.randomizeCoords(shipLength);
    }
  }

  // gets full coordinates of every square in a single ship
  getFullCoords(coords) {
    let rowStart = parseInt(coords[0][0]);
    let colStart = parseInt(coords[0][1]);
    let rowEnd = parseInt(coords[1][0]);
    let colEnd = parseInt(coords[1][1]);

    let fullCoordinates = [];
    if (rowStart !== rowEnd) {
      for (let i = rowStart; i <= rowEnd; i++) {
        fullCoordinates.push([i, colStart]);
      }
    }
    if (colStart !== colEnd) {
      for (let i = colStart; i <= colEnd; i++) {
        fullCoordinates.push([rowStart, i]);
      }
    }
    return fullCoordinates;
  }

  // check if any square of the new ship is already occupied; if so, send info to previous functions to generate new ship coordinates instead
  checkIfOccupied(fullCoordinates) {
    // console.log(fullCoordinates);
    for (let i = 0; i < fullCoordinates.length; i++) {
      let [x, y] = fullCoordinates[i];
      x = parseInt(x);
      y = parseInt(y);
      
      if (this.grid[x][y] !== null) {
        // square is occupied
        return true;
      }
      
      // check if any surrounding squares are occupied - if so, generate new coords. ships shouldnt be too close to each other
      let closeSq = [
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1], 
        [x + 1, y + 1]
      ].filter((item) => {
        return item[0] >= 0 && item[0] <= 9 && item[1] >= 0 && item[1] <= 9;
      });
      
      for (let j = 0; j < closeSq.length; j++) {
        if (typeof this.grid[closeSq[j][0]][closeSq[j][1]] === "number" && this.grid[closeSq[j][0]][closeSq[j][1]] !== this.grid[x][y]) {
          // if any of the neighboring squares contain ships and their id is not the same as the currently considered ship's id, return and try with new coords
          return true;
        }
      } 
    }
    return false;
  }

  

  return(
    <div className="board">
      {grid.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}></div>))
      ))}
    </div>
  )
}

export default Board
