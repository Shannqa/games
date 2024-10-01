const square = {
  width: 20,
  height: 20
}

export const blocks = {
  "O": [
    [1, 1],
    [1, 1]
  ],
  "I": [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  "J": [
    [1, 0, 0],
    [1, 1, 1]
  ],
  "L": [
    [0, 0, 1],
    [1, 1, 1]
  ],
  "S": [
    [0, 1, 1],
    [1, 1, 0]
  ],
  "Z": [
    [1, 1, 0],
    [0, 1, 1]
  ],
  "T": [
    [1, 1, 1],
    [0, 1, 0]
    ]
}

export function drawBlock(type, blocks, ctx, x, y) {
  const matrix = blocks.type;
  
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "blue";
  
  martix.map((row, id) => {
    row.map((col, id) => {
      if (col === 1) {
        ctx.rect(x + id * square.width, y + id * square.height, square.width, square.height);
        ctx.fill();
        ctx.stroke();
      }
    });
  });
}