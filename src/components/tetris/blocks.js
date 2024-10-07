import { settings, nrOfBlocks } from "./settings";

// export const square = {
//   width: 20,
//   height: 20,
// };

export let currentBlockCoords = [];
export let currentPivot = [];
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

export function moveBlockDown() {
  // move the current block down
  currentBlockCoords.map((coord) => {
    return (coord[1] += 1);
  });
  currentPivot[1] += 1;
  // console.log(currentBlockCoords);
}

export function stopBlock(placedBlocks, setPlacedBlocks, type, setGameState) {
  // check if next move down would make the block intersect any of the already placed blocks
  if (!type) return;
  // console.log(nrOfBlocks.y);

  // for (const [x, y] of currentBlockCoords) {
  //   if (y + 1 > nrOfBlocks.y || )
  // }

  ////
  for (let i = 0; i < currentBlockCoords.length; i++) {
    const [x, y] = currentBlockCoords[i];
    if (y >= nrOfBlocks.y - 1 || placedBlocks[x][y + 1]) {
      // undefined, placedblocks is an empty array !!!
      // last row has id 19, nrofb is 20

      // if is at the bottom of canvas or next move would touch a placed block, stop and place the block at the current stop
      let newPlacements = [...placedBlocks];
      // maybe that for multidimensional arrays matrix.map((row) => [...row]);

      currentBlockCoords.forEach(([coordX, coordY]) => {
        newPlacements[coordX][coordY] = type;
        // console.log(
        //   "newPlacements",
        //   newPlacements,
        //   "coordX",
        //   coordX,
        //   "coordY",
        //   coordY
        // );
      });
      console.log(JSON.stringify(currentBlockCoords));
      setPlacedBlocks(newPlacements);
      console.log(newPlacements);
      setGameState("newBlock");

      /* const newPlacement = placedBlocks.map((row, rId) => {
        row.map((col, cId) => {
          if ()
        })
      })*/
    }
  }
}

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
  console.log(nrOfBlocks.x);
  // don't rotate o
  // if it would go outside canvas, jump to the side
  console.log("rotate");
  let pivot = currentPivot;
  console.log(pivot);
  let rotatedCoords = currentBlockCoords.map((cell) => {
    const newX = pivot[1] - cell[1] + pivot[0];
    const newY = pivot[1] - pivot[0] + cell[0];
    return [newX, newY];
  });
  // check if the rotated block would be outside canvas
  // const isOutsideLeftEdge = rotatedCoords.some(([x, y]) => x < 0);
  // const isOutsideRightEdge = rotatedCoords.some(
  //   ([x, y]) => x > nrOfBlocks.x - 1
  // );
  // if (isOutsideLeftEdge) {
  //   rotatedCoords = rotatedCoords.map(([x, y]) => [x + 1, y]);
  // } else if (isOutsideRightEdge) {
  //   console.log("right", JSON.stringify(rotatedCoords));
  //   rotatedCoords = rotatedCoords.map(([x, y]) => [x - 1, y]);
  // }
  console.log("rotated", JSON.stringify(rotatedCoords));
  currentBlockCoords = [...rotatedCoords];
}

export function moveToSide(direction) {
  if (direction === "left") {
    const isOnLeftEdge = currentBlockCoords.some(([x, y]) => x <= 0);
    if (isOnLeftEdge) {
      // stop movement at the edge of canvas
      return;
    } else {
      currentBlockCoords = currentBlockCoords.map((coords) => {
        return [coords[0] - 1, coords[1]];
      });
      currentPivot[0] -= 1;
    }
  }
  if (direction === "right") {
    const isOnRightEdge = currentBlockCoords.some(
      ([x, y]) => x >= nrOfBlocks.x + 1
    );
    if (isOnRightEdge) {
      // stop movement at the edge of canvas
      return;
    } else {
      currentBlockCoords = currentBlockCoords.map((coords) => {
        return [coords[0] + 1, coords[1]];
      });
      currentPivot[0] += 1;
    }
  }
}
