import settings, { squaresX, squaresY } from "./settings";
import { snake } from "./snake";

const squareSize = settings.squareSize;

export let foodOn = false;

export const food = {
  x: null,
  y: null,
};

export function randomFood() {
  const randomX = Math.floor(Math.random() * squaresX);
  const randomY = Math.floor(Math.random() * squaresY);
  food.x = randomX;
  food.y = randomY;
  foodOn = true;
  console.log("food");
}

export function drawFood(ctx) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";

  ctx.rect(food.x * squareSize, food.y * squareSize, squareSize, squareSize);
  console.log(food.x, food.y);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function eatFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    console.log("eat!");
    // hmm if eating food, don't pop the last square of the snake
  }
}
