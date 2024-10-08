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

export function moveBlockDown(placedBlocks, setPlacedBlocks, setGameState) {
  // move the current block down
  console.log("move");
  const newCoords = currentBlockCoords.map(([x, y]) => {
    return [x, y + 1];
  });
  const isMoveValid = checkIfMoveDownValid(newCoords, placedBlocks);

  if (isMoveValid) {
    currentBlockCoords = [...newCoords];
    currentPivot[1] += 1;
  } else {
    stopMovement(placedBlocks, setPlacedBlocks, setGameState);
  }
}

export function moveToSide(direction) {
  // user's move left or right

  let newCoords;
  let newPivotX = currentPivot[0];
  if (direction === "right") {
    newCoords = currentBlockCoords.map(([x, y]) => [x + 1, y]);
    newPivotX += 1;
  } else if (direction === "left") {
    newCoords = currentBlockCoords.map(([x, y]) => [x - 1, y]);
    newPivotX -= 1;
  }

  const isMoveValid = checkIfMoveSidewaysValid(direction, newCoords);

  if (isMoveValid) {
    currentBlockCoords = [...newCoords];
    currentPivot[0] = newPivotX;
  }
}

function stopMovement(placedBlocks, setPlacedBlocks, setGameState) {
  // movement is stopped, place the current block

  if (!currentType) {
    // something went wrong
    console.log("err");
    return;
  }

  console.log("placedBlocks", placedBlocks);
  console.log("curr", JSON.stringify(currentBlockCoords));
  let newPlacements = placedBlocks.map((row, rId) => {
    return row.map((col, cId) => {
      for (const [x, y] of currentBlockCoords) {
        if (rId === y && cId === x) {
          return "aa";
        }
      }
      return col;

      // currentBlockCoords.forEach(([x, y]) => {
      //   if (rId === x && cId === y) {
      //     console.log(rId, x, cId, y, "uuu");
      //     // add the type of block to the appropriate cell
      //     return currentType;
      //   } else {
      //     return col;
      //   }
      // });
    });
  });
  console.log("newPlacements", JSON.stringify(newPlacements));
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
    let rotatedCoords = currentBlockCoords.map((cell) => {
      const newX = currentPivot[1] - cell[1] + currentPivot[0];
      const newY = currentPivot[1] - currentPivot[0] + cell[0];
      return [newX, newY];
    });
    if (
      !checkEdgesCollision(rotatedCoords) &&
      !checkPlacedBlocksCollision(rotatedCoords)
    ) {
      // no collisions, valid rotation
      currentBlockCoords = [...rotatedCoords];
    } else {
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
        if (
          !checkEdgesCollision(kickedCoords) &&
          !checkPlacedBlocksCollision(kickedCoords)
        ) {
          currentBlockCoords = [...kickedCoords];
          return;
        } else {
          // rotation impossible, cancel
          return;
        }
      }
    }
  }
}
/*** check if moves are valid ***/

function checkIfMoveDownValid(newCoords, placedBlocks) {
  // check for collision with bottom of canvas
  const isOutsideCanvas = newCoords.some(([x, y]) => y >= nrOfBlocks.y);

  if (isOutsideCanvas) {
    // move invalid
    return false;
  }

  // check for collision with already placed blocks
  const collision = checkPlacedBlocksCollision(newCoords, placedBlocks);

  if (collision) {
    // movement invalid
    return false;
  }
  // otherwise, movement is valid
  return true;
}

function checkIfMoveSidewaysValid(direction, newCoords) {
  // check for collision with edges of canvas
  const isOutsideCanvas = newCoords.some(
    ([x, y]) => x < 0 || x >= nrOfBlocks.x
  );

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

function checkPlacedBlocksCollision(newCoords, placedBlocks) {
  // test if any of the new coords would overlap an occupied field (isn't null)
  return newCoords.some(([x, y]) => {
    return (
      placedBlocks[x] &&
      placedBlocks[x][y] !== undefined &&
      placedBlocks[x][y] !== null
    );
  });
}

function checkEdgesCollision(newCoords) {
  return newCoords.some(
    ([x, y]) => x < 0 || x >= nrOfBlocks.x || y < 0 || y >= nrOfBlocks.y
  );
}
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
