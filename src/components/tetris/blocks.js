import { settings, nrOfBlocks } from "./settings";
import { createEmptyMatrix } from "./gameArea.js"

export let currentBlockCoords = [];
export let currentPivot = {
  x: null,
  y: null
};
export let currentType = null;

export const blocks = {
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  I: [
    [0, 0, 0, 0], // 0 y
    [1, 1, 1, 1], // 1
    [0, 0, 0, 0], // 2
    [0, 0, 0, 0], // 3
    
  // 3  4  5  6 x
  ],
  J: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
};

export function createEmptyMatrix(nrOfRows) {
  const gameMatrix = [];
  for (let row = 0; row <= nrOfRows; row++) {
    gameMatrix.push([]);
    for (let col = 0; col < nrOfBlocks.x; col++) {
      gameMatrix[row].push(null);
    }
  }
  return gameMatrix;
}

export function getRandomBlock(blocks) {
  // generate a random block type, return a letter 
  const blockTypes = Object.keys(blocks);
  const randomNr = Math.floor(Math.random() * blockTypes.length);
  const randomBlock = blockTypes[randomNr];
  return randomBlock;
}

export function getStartCoords(type) {
  // determine coordinates of a block as it first appears on screen
  // reset coords first
  currentBlockCoords.length = 0;
  currentPivot = [4, 1];
  const upperLeftCorner = {
    x: 3,
    y: 0
  };
  const blockPattern = blocks[type];
  
  blockPattern.forEach((row, rId) => {
    row.forEach((col, cId) => {
      if (col === 1) {
        currentBlockCoords.push([upperLeftCorner.x + cId, upperLeftCorner.y + rId]);
      }
    });
  });
  
  
  return currentBlockCoords;
}

/*** current block and its movements ***/

export function autoMoveDown(placedBlocks, setPlacedBlocks, setGameState) {
  const newCoords = getNewCoords("down"); 
  const isValid = checkIfMoveValid(newCoords);
  
  if (isValid) {
    saveNewCoords(newCoords)
    currentPivot.y += 1;
  } else {
    saveNewStack(placedBlocks, setPlacedBlocks);
  }
}

export function userMove(direction) {
  const newCoords = getNewCoords(direction); 
  const isValid = checkIfMoveValid(newCoords);
  
  if (isValid) {
    saveNewCoords(newCoords);
    if (direction === "right") {
      currentPivot.x += 1;
    } else {
      currentPivot.x -= 1;
    }
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
  } else {
    // basic rotation
    const rotatedCoords = currentBlockCoords.map(([currentX, currentY]) => {
      const newX = currentPivot.y - currentY + currentPivot.x;
      const newY = currentPivot.y - currentPivot.x + currentX;
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
        // if move possible, save
        saveNewCoords(kickedCoords);
      }
    }
  }
}

export function checkFullLines(placedBlocks, setPlacedBlocks) {
  const linesToClear = [];
  
  placedBlocks.forEach((row, rId) => {
    
    const rowFull = row.every((col, cId) => col !== null);
    
    if (rowFull) {
      linesToClear.push(rId);
    }
  });
  return linesToClear;
}

function clearLines(linesToClear, placedBlocks, setPlacedBlocks) {
  const matrixCleared = placedBlocks.filter((_, rId) => !linesToClear.includes(rId));
  
  const emptyRows = createEmptyMatrix(linesToClear.length);
  
  const newMatrix = [...emptyRows, ...matrixCleared];
  
  setPlacedBlocks(newMatrix);
}