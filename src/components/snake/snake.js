import settings from "./settings.js";

const canvasW = settings.canvasW;
const canvasH = settings.canvasH;
const squareSize = settings.squareSize;
const squaresY = canvasH / squareSize;
const squaresX = canvasW / squareSize;


export const snake = [
  [squaresX / 2 + squareSize, squaresY / 2 + squareSize],
  [squaresX / 2, squaresY / 2],
  [squaresX / 2 - squareSize, squaresY / 2 - squareSize]
]

function drawSnake() {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#103549";
  ctx.fillStyle = "#234e66";
  
  snake.forEach(sq => {
    ctx.rect(sq[0] * squareSize, sq[1] * squareSize, squareSize, squareSize);
  });
  
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}