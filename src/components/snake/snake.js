import settings, { squaresX, squaresY } from "./settings";
import { currentDir } from "./keyboard";
import { changeGameStage, gameStage } from "./SnakeGame";

const canvasW = settings.canvasW;
const canvasH = settings.canvasH;
const squareSize = settings.squareSize;

export const snake = [
  {
    // head
    x: Math.floor(squaresX / 2 + 1),
    y: Math.floor(squaresY / 2),
    dir: "right",
  },
  {
    x: Math.floor(squaresX / 2),
    y: Math.floor(squaresY / 2),
    dir: "right",
  },
  {
    x: Math.floor(squaresX / 2 - 1),
    y: Math.floor(squaresY / 2),
    dir: "right",
  },
];

export function drawSnake(ctx) {
  // console.log(squaresX, squaresY, squareSize);
  ctx.beginPath();
  // ctx.lineWidth = 1;
  // ctx.strokeStyle = "#103549";
  ctx.fillStyle = "#2f7ba4";

  snake.forEach((sq) => {
    ctx.rect(sq.x * squareSize, sq.y * squareSize, squareSize, squareSize);
    // console.log(sq.x, sq.y);
  });

  // ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function moveSnake(foodEaten = false) {
  let headDir = snake[0].dir;

  if (
    (headDir === "up" && currentDir === "down") ||
    (headDir === "down" && currentDir === "up") ||
    (headDir === "left" && currentDir === "right") ||
    (headDir === "right" && currentDir === "left")
  ) {
    // do nothing
  } else {
    // change direction
    headDir = currentDir;
  }
  // add new head
  if (headDir === "up") {
    snake.unshift({
      x: snake[0].x,
      y: snake[0].y - 1,
      dir: "up",
    });
  } else if (headDir === "down") {
    snake.unshift({
      x: snake[0].x,
      y: snake[0].y + 1,
      dir: "down",
    });
  } else if (headDir === "left") {
    snake.unshift({
      x: snake[0].x - 1,
      y: snake[0].y,
      dir: "left",
    });
  } else if (headDir === "right") {
    snake.unshift({
      x: snake[0].x + 1,
      y: snake[0].y,
      dir: "right",
    });
  }
  if (!foodEaten) {
    // remove last square
    snake.pop();
  }
}

export function detectCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x > squaresX ||
    snake[0].y < 0 ||
    snake[0].y > squaresY
  ) {
    // hit edges of canvas
    changeGameStage("stop");
    return;
  }
}
