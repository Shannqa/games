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

export function drawCurrentBlock(ctx, type) {
  // console.log(type);
  if (type) {
    drawBlock(ctx, type, currentBlock.x, currentBlock.y);
  }
}
