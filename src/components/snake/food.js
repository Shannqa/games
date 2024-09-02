import settings, { squaresX, squaresY } from "./settings";
import { snake } from "./snake";
import { score } from "./score";

const squareSize = settings.squareSize;

export let foodOn = false;

export const food = {
  x: null,
  y: null,
};

export function timeoutFood() {
  setTimeout(randomFood, 5000);
}

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
  ctx.fillStyle = "#3a2768";
  ctx.rect(food.x * squareSize, food.y * squareSize, squareSize, squareSize);
  ctx.fill();
  ctx.closePath();
}

export function checkFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    foodOn = false;
    score.score += 50;
    timeoutFood();
    return true;
  }
}
