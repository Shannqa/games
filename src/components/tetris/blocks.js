import { settings, nrOfBlocks } from "./settings";

export let currentBlockCoords = [];
export let currentPivot = [];
export let currentType = null;

export const blocks = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  J: [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  S: [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  T: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

const blockColors = {
  O: "red",
  I: "blue",
  J: "green",
  L: "purple",
  S: "pink",
  Z: "orange",
  T: "darkgreen",
};

function getRandomBlock(blocks) {
    const blocksArr = Object.keys(blocks);
    const randomNr = Math.floor(Math.random() * blocksArr.length);
    const randomBlock = blocksArr[randomNr];
    return randomBlock;
  }


export function drawBlock(ctx, type, x, y) {
  // debugger;

  if (type) {
    const matrix = blocks[type];
    // console.log(type);
    ctx.beginPath();
    matrix.map((row, rId) => {
      row.map((col, cId) => {
        if (col === 1) {
          drawSquare(
            ctx,
            type,
            x + cId * settings.squareSize,
            y + rId * settings.squareSize
          );
        }
      });
    });
    ctx.closePath();
  }
}

export function drawBlockGameArea(ctx, type) {
  // debugger;

  if (type) {
    const matrix = blocks[type];
    // console.log(type);
    ctx.beginPath();
    currentBlockCoords.forEach(([x, y]) => {
      drawSquare(ctx, type, x * settings.squareSize, y * settings.squareSize);
    });
    ctx.closePath();
  }
}

export function drawSquare(ctx, type, x, y) {
  ctx.strokeStyle = "#000";
  ctx.fillStyle = blockColors[type];
  ctx.rect(x, y, settings.squareSize, settings.squareSize);
  ctx.fill();
  ctx.stroke();
}

export function drawCurrentBlock(ctx, type, frameCount) {
  // console.log(type);
  if (!type) return;
  drawBlockGameArea(ctx, type);
}

export function getStartCoords(type) {
  // determine coordinates of a block as it first appears on screen
  // reset coords first
  currentBlockCoords.length = 0;
  const midX = Math.floor((nrOfBlocks.x - 1) / 2);
  currentPivot = [midX, 1];
  currentType = type;
  const blockPattern = blocks[type];

  blockPattern.forEach((row, rId) => {
    row.forEach((col, cId) => {
      if (col === 1) {
        currentBlockCoords.push([midX - 1 + cId, rId]);
      }
    });
  });
  console.log(currentBlockCoords);
  return currentBlockCoords;
}

/*** current block and its movements ***/

export function moveBlockDown() {
  // move the current block down
  
  const newCoords = currentBlockCoords.map(([x, y]) => {
    return [x, y + 1];
  });
  const isMoveValid = checkIfMoveDownValid(newCoords);
  
  if (isMoveValid) {
    currentBlockCoords = [...newCoords];
   currentPivot[1] += 1; 
  } else {
    stopMovement();
  }
}


export function moveToSide(direction) {
  // user's move left or right
  
  let newCoords;
  let newPivotX = currentPivot[0];
  if (direction === "right") {
    newCoords = currentBlockCoords.map(([x, y]) => [x + 1, y]) ;
    newPivotX += 1;
  } else if (direction === "left") {
   newCoords = currentBlockCoords.map(([x, y]) => [x - 1, y]);
   newPivotX -= 1;
  }
  
  const isMoveValid = checkIfMoveSidewaysValid(direction, newCoords); 
  
  if (isMoveValid) {
    currentBlockCoords = [...newCoords];
    currentPivot[0] = newPivotX;
  };
}

function stopMovement(placedBlocks, setPlacedBlocks, setGameState) {
  // movement is stopped, place the current block
  
  if (!currentType) {
    // something went wrong
    return;
  }
  
  let newPlacements = placedBlocks.map((row, rId) => {
    return row.map((col, cId) => {
      return currentBlockCoords.forEach(([x, y]) => {
        if (rId === x && cId === y) {
          // add the type of block to the appropriate cell
          return type;
        } else {
          return col;
        }
      })
    })
  })
  
  setPlacedBlocks(newPlacements);
  setGameState("newBlock");
}

///
export function checkIfRowComplete(placedBlocks, setPlacedBlocks) {
  const completedRows = [];

  placedBlocks.forEach((row, rId) => {
    const checkedRow = row.every((square) => {
      return square !== null;
    });
    if (checkedRow) {
      completedRows.push(rId);
    }
  });
  if (completedRows.length > 0) {
    deleteRow(completedRows, placedBlocks, setPlacedBlocks);
  }
}

function deleteRow(completedRows, placedBlocks, setPlacedBlocks) {
  let newPlacedBlocks = placedBlocks.map((placedRow, placedrId) => {
    completedRows.forEach((row, rId) => {
      if (placedrId === row) {
        return;
      } else {
        return [...row];
      }
    });
  });
  setPlacedBlocks(newPlacedBlocks);
  // what should come first, clearing a row or generating a new current block
}

export function rotateBlock() {
  if (currentType === "O") {
    // don't rotate O-blocks
    return;
  }
  
  let rotatedCoords = currentBlockCoords.map((cell) => {
    const newX = currentPivot[1] - cell[1] + currentPivot[0];
    const newY = currentPivot[1] - currentPivot[0] + cell[0];
    return [newX, newY];
  });
  
  // if the rotated block would go outside canvas, jump to the side

   const isOutsideLeftEdge = rotatedCoords.some(([x, y]) => x < 0);
   const isOutsideRightEdge = rotatedCoords.some(([x, y]) => x > nrOfBlocks.x - 1);
   
  
   if (isOutsideLeftEdge) {
     rotatedCoords = rotatedCoords.map(([x, y]) => [x + 1, y]);
   } else if (isOutsideRightEdge) {
     rotatedCoords = rotatedCoords.map(([x, y]) => [x - 1, y]);
   }
  console.log("rotated", JSON.stringify(rotatedCoords));
  currentBlockCoords = [...rotatedCoords];
}



/*** check if moves are valid ***/

function checkIfMoveDownValid() {
  let newCoords = currentBlockCoords.map(([x, y]) => [x, y + 1]);
  
    // check for collision with bottom of canvas
  const isOutsideCanvas = newCoords.some(([x, y]) => y >= nrOfBlocks.y);
  
  if (isOutsideCanvas) {
    // move invalid
    return false;
  }
  
  // check for collision with already placed blocks
  const collision = checkPlacedBlocksCollision(newCoords);
  
  if (collision) {
    // movement invalid
    return false;
  }
  // otherwise, movement is valid
  return true;
}

function checkIfMoveSidewaysValid(direction, newCoords) {
  
  // check for collision with edges of canvas
  const isOutsideCanvas = newCoords.some(([x, y]) => x < 0 || x >= nrOfBlocks.x);
  
  if (isOutsideCanvas) {
    // move invalid
    return false;
  }
  
  // check for collision with already placed blocks
  const collision = checkPlacedBlocksCollision(newCoords);
  
  if (collision) {
    // movement invalid
    return false;
  }
  // otherwise, movement is valid
  return true;
}

function checkPlacedBlocksCollision(newCoords) {
  // test if any of the new coords would overlap an occupied field (isn't null)
  return newCoords.some(([x, y]) => {
    return placedCoords[x] && placedCoords[x][y] !== undefined && placedCoords[x][y] !== null
  }
)}
  
/*
  
rotation

o o o o o o 
o o x o o o
o o x x @ o 
o o o x o o
o o o o o o

o o o o o o
o o o o o o
o o o x x o
o o x x o o
o o o o o o

*/