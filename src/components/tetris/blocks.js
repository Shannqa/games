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

export function getRandomBlock(blocks) {
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

export function drawBlockGameArea(ctx) {
  // debugger;

  if (currentType) {
    const matrix = blocks[currentType];
    // console.log(type);
    ctx.beginPath();
    currentBlockCoords.forEach(([x, y]) => {
      drawSquare(ctx, x * settings.squareSize, y * settings.squareSize);
    });
    ctx.closePath();
  }
}

export function drawSquare(ctx, x, y) {
  ctx.strokeStyle = "#000";
  ctx.fillStyle = blockColors[currentType];
  ctx.rect(x, y, settings.squareSize, settings.squareSize);
  ctx.fill();
  ctx.stroke();
}

export function drawCurrentBlock(ctx) {
  // console.log(type);
  if (!currentType) return;
  drawBlockGameArea(ctx);
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

export function autoMoveDown(placedBlocks, setPlacedBlocks, setGameState) {
  const newCoords = getNewCoords("down"); 
  const isValid = checkIfMoveValid(newCoords);
  
  if (isValid) {
    saveNewCoords(newCoords);
  } else {
    saveNewStack(placedBlocks, setPlacedBlocks, );
    //setPlacedCoords
  }
}

export function userMove(direction) {
  const newCoords = getNewCoords(direction); 
  const isValid = checkIfMoveValid(newCoords);
  
  if (isValid) {
    saveNewCoords(newCoords);
  }
}

function getNewCoords(direction) {
  const newCoords = currentBlockCoords.map(([x, y]) => {
      if (direction === "down") {
        return [x, y + 1];
      } else if (direction === "left") {
        return [x - 1, y]
      } else if (direction === "right") {
        return [x + 1, y]
      }
  });
  return newCoords;
}

function checkIfMoveValid(newCoords, placedBlocks) {

  // check against the edges of the playing field
  const outsideEdges = newCoords.some(
    ([x, y]) => x < 0 || x >= nrOfBlocks.x || y < 0 || y >= nrOfBlocks.y);
    
    if (outsideEdges) {
      return false;
    }

  // check against already placed blocks
  const overlapingStack = newCoords.some(([x, y]) => {
    return (
      placedBlocks[x] &&
      placedBlocks[x][y] !== undefined &&
      placedBlocks[x][y] !== null
    );
  });
  
  if (overlapingStack) {
    return false;
  }
  
  // otherwise the move is valid
  return true;
}

function saveNewCoords(newCoords) {
  currentBlockCoords = [...newCoords];
}

function saveNewStack(placedBlocks, setPlacedBlocks, setGameState) {
  const newStack = placedBlocks.map((row, rId) => {
    return row.map((col, cId) => {
      for (const [x, y] of currentBlockCoords) {
        if (rId === y && cId === x) {
          return currentType;
        }
      }
      return col;
    });
  });
  setPlacedBlocks(newStack);
  setGameState("newBlock");
}

export function rotate() {
  if (!currentType) {
    // no type, something went wrong
    return;
  } else if (currentType === "O") {
    // don't rotate O-blocks
    return;
  } else if (currentType === "I") {
    // I has separate rotation rules
  } else {
    // basic rotation
    const rotatedCoords = currentBlockCoords.map((cell) => {
      const newX = currentPivot[1] - cell[1] + currentPivot[0];
      const newY = currentPivot[1] - currentPivot[0] + cell[0];
      return [newX, newY];
    });
    
    const isValid = checkIfMoveValid(rotatedCoords);
  
    if (isValid) {
      saveNewCoords(rotatedCoords);
      return;
    }
    
    // collision with edge of canvas or another piece. try the following jumps in order to see if any would be valid
    
    const possibleJumps = [
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2],
    ];

    for (const [jumpX, jumpY] of possibleJumps) {
      const kickedCoords = rotatedCoords.map(([x, y]) => [
          x + jumpX,
          y + jumpY,
      ]);
      
      const isJumpValid = checkIfMoveValid(kickedCoords);
  
      if (isJumpValid) {
        saveNewCoords(kickedCoords);
        return;
      }
    }
    // rotation impossible, cancel
    return;
  }
}


//add changes to pivot to moves


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


/*****/
