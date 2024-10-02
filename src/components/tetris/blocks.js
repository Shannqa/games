import { settings } from "./settings";

const square = {
  width: 20,
  height: 20,
};

export let currentBlock = {
  x: settings.gameAreaW / 2,
  y: 0,
};

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
  
  drawBlock(ctx, type, currentBlock.x, currentBlock.y);
}

export function detectCollision(ctx, placedBlocks) {
  currentBlock.forEach(square) 
}


function getStartCoords(type) {
  // determine coordinates of a block as it first appears on screen
  
  const midX = [(nrOfBlocks.x - 1) / 2]
  
  const startBlockCoords = [];
  
  const blockPattern = blocks.type;
  
  blockPattern.forEach((row, rId) => {
    row.forEach((col, cId) => {
      if (col === 1) {
        startBlockCoords.push([midX - 1 + cId, rId])
      }
    })
  })
  return startBlockCoords;
}


export function moveBlock(blockCoords) {
  // move the block down
  blockCoords.map(([x, y]) => {
    return [x, y + 1]
  }) 
}


export function stopBlock(blockCoords, placedBlocks, setPlacedBlocks, type, setGameState) {
  // check if next move down would make the block intersect any of the already placed blocks
  
  for (let i = 0; i < blockCoords.length; i++) {
    const [x, y] = blockCoords[i];
    if (placedBlocks[y + 1][x] !== null) {
      // stop, place the block at the current stop
      let newPlacements = [...placedBlocks]
      // maybe that for multidimensional arrays matrix.map((row) => [...row]); 
      
      blockCoords.forEach((coordX, coordY) => {
        newPlacements[coordX][coordY] = type;
      });
      setPlacedBlocks(newPlacements);
      setGameState("newBlock")
      
     /* const newPlacement = placedBlocks.map((row, rId) => {
        row.map((col, cId) => {
          if ()
        })
      })*/
    }
  }
}