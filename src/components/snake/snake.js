import settings from "./settings";

const canvasW = settings.canvasW;
const canvasH = settings.canvasH;
const squareSize = settings.squareSize;
const squaresY = canvasH / squareSize;
const squaresX = canvasW / squareSize;

export const snake = [
  [squaresX / 2 + 1, squaresY / 2],
  [squaresX / 2, squaresY / 2],
  [squaresX / 2 - 1, squaresY / 2],
];

export function drawSnake(ctx) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#103549";
  ctx.fillStyle = "#234e66";

  snake.forEach((sq) => {
    ctx.rect(sq[0] * squareSize, sq[1] * squareSize, squareSize, squareSize);
  });

  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function moveSnake() {
  if (snake[0][0] >= squaresX) {
    console.log("coll");
  } else {
    snake.forEach((sq) => {
      sq[0] += 1;
    });
  }
}

// >
// x + sq, y

// <
// x - sq, y

// /\
// x, y - sq

// \/
// x, y + sq

// 100, 100
// 105, 100
// 110, 100
