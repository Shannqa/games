import { settings, nrOfBlocks } from "./settings";

const square = {
  width: 20,
  height: 20,
};

export let currentBlockCoords = [];

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
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  T: [
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
            x + cId * square.width,
            y + rId * square.height
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
      drawSquare(ctx, type, x * square.width, y * square.height);
    });
    // matrix.map((row, rId) => {
    //   row.map((col, cId) => {
    //     if (col === 1) {
    //       drawSquare(
    //         ctx,
    //         type,
    //         x + cId * square.width,
    //         y + rId * square.height
    //       );
    //     }
    //   });
    // });
    ctx.closePath();
  }
}

export function drawSquare(ctx, type, x, y) {
  ctx.strokeStyle = "#000";
  ctx.fillStyle = blockColors[type];
  ctx.rect(x, y, square.width, square.height);
  ctx.fill();
  ctx.stroke();
}

export function drawCurrentBlock(ctx, type, frameCount) {
  // console.log(type);
  if (!type) return;
  drawBlockGameArea(ctx, type);
  // drawBlock(ctx, type, currentBlock.x, currentBlock.y);
}

export function getStartCoords(type) {
  // determine coordinates of a block as it first appears on screen

  const midX = Math.floor((nrOfBlocks.x - 1) / 2);

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

export function moveBlock() {
  // move the current block down
  currentBlockCoords.map((coord) => {
    return (coord[1] += 1);
  });
  console.log(currentBlockCoords);
}

export function stopBlock(placedBlocks, setPlacedBlocks, type, setGameState) {
  // check if next move down would make the block intersect any of the already placed blocks
  if (!type) return;
  console.log(nrOfBlocks.y);
  for (let i = 0; i < currentBlockCoords.length; i++) {
    const [x, y] = currentBlockCoords[i];
    if (y + 1 >= nrOfBlocks.y || placedBlocks[y + 1][x]) {
      // undefined, placedblocks is an empty array !!!
      // last row has id 19, nrofb is 20
      
      
      // if is at the bottom of canvas or next move would touch a placed block, stop and place the block at the current stop
      let newPlacements = [...placedBlocks];
      // maybe that for multidimensional arrays matrix.map((row) => [...row]);

      currentBlockCoords.forEach((coordX, coordY) => {
        newPlacements[coordX][coordY] = type;
      });
      setPlacedBlocks(newPlacements);
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
  const completedRows = []
  placedBlocks.forEach((row, rId) => {
    const checkedRow = row.every(square => {
      return square !== null
    });
    if (checkedRow) {
      completedRows.push(rId);
    }
  });
  if (completedRows.length > 0) {
    deleteRow(completedRows, placedBlocks, setPlacedBlocks)
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
    })
  });
  setPlacedBlocks(newPlacedBlocks);
  // what should come first, clearing a row or generating a new current block
}