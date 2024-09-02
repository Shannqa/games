import React, { useState, useEffect } from "react";
import { snake, drawSnake, moveSnake, detectCollision } from "./snake.js";
import Canvas from "./Canvas.jsx";
import { keyDown } from "./keyboard.js";
import settings from "./settings";
import styles from "../../styles/snake.module.css";
import {
  foodOn,
  drawFood,
  randomFood,
  checkFood,
  timeoutFood,
} from "./food.js";
import { score, intervalScore } from "./score.js";

export let gameStage = "ready";

export function changeGameStage(stage) {
  gameStage = stage;
}

function Game() {
  const [gameState, setGameState] = useState("ready");
  document.onkeydown = keyDown;

  useEffect(() => {
    let inter;

    if (gameState === "ready") {
      inter = setInterval(() => {
        score.score += 10;
      }, 5000);
    } else {
      clearInterval(inter);
    }
  }, gameState);

  timeoutFood();

  function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    score.draw(ctx);
    if (gameStage === "stop") {
      drawSnake(ctx);
      return;
    } else {
      drawSnake(ctx);
      detectCollision();
    }
    if (foodOn) {
      console.log("on");
      drawFood(ctx);
      const isFoodEaten = checkFood();
      if (!isFoodEaten) {
        moveSnake();
      } else {
        moveSnake(true);
      }
    } else {
      moveSnake();
    }
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas width={settings.canvasW} height={settings.canvasH} draw={draw} />
    </div>
  );
}

export default Game;
