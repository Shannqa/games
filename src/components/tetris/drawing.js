import { blocks } from "./blocks";

const blockColors = {
  O: "red",
  I: "blue",
  J: "green",
  L: "purple",
  S: "pink",
  Z: "orange",
  T: "darkgreen",
};

export function drawSquare(ctx, x, y, type) {
  // draw a single square
  ctx.strokeStyle = "#000";
  ctx.fillStyle = blockColors[type];
  ctx.rect(x, y, settings.squareSize, settings.squareSize);
  ctx.fill();
  ctx.stroke();
}

export function drawNextBlock(ctx, nextBlock, x, y) {
  // draw a full block consisting of squares
    
    const matrix = blocks[nextBlock];
    // console.log(type);
    ctx.beginPath();
    matrix.map((row, rId) => {
      row.map((col, cId) => {
        if (col === 1) {
          drawSquare(
            ctx,
            nextBlock,
            x + cId * settings.squareSize,
            y + rId * settings.squareSize
          );
        }
      });
    });
    ctx.closePath();
  
}

export function drawCurrentBlock(ctx, currentType) {
  // console.log(type);
  if (!currentType) return;
  
  ctx.beginPath();
  currentBlockCoords.forEach(([x, y]) => {
    drawSquare(ctx, x * settings.squareSize, y * settings.squareSize, currentType);
  });
  ctx.closePath();
}

export function drawPlacedBlocks(ctx, placedBlocks) {
  // console.log(placedBlocks);
  placedBlocks.forEach((row, rId) => {
    if (rId > 0) {
      row.forEach((col, cId) => {
      if (col !== null) {
        const sqType = col;
        drawSquare(ctx, cId * settings.squareSize, rId * settings.squareSize, type);
      }
    });
    }
  });
}
