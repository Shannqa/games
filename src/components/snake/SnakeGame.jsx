import React, { useState } from "react";
import { snake, drawSnake, moveSnake, detectCollision } from "./snake.js";
import Canvas from "./Canvas.jsx";
import { keyDown } from "./keyboard.js";
import settings from "./settings";
import styles from "../../styles/snake.module.css";
import { foodOn, drawFood, randomFood, eatFood } from "./food.js";

export let gameStage = "ready";

export function changeGameStage(stage) {
  gameStage = stage;
}

function Game() {
  document.onkeydown = keyDown;

  setTimeout(randomFood, 5000);

  function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (gameStage === "stop") {
      drawSnake(ctx);
      return;
    } else {
      drawSnake(ctx);
      detectCollision();
      moveSnake();
    }
    if (foodOn) {
      console.log("on");
      drawFood(ctx);
      eatFood();
    }
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas width={settings.canvasW} height={settings.canvasH} draw={draw} />
    </div>
  );
}

export default Game;
