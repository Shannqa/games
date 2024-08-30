import React, { useState } from "react";
import { snake, drawSnake, moveSnake } from "./snake.js";
import Canvas from "./Canvas.jsx";
import { keyDown, keyUp, UP, DOWN, LEFT, RIGHT } from "./keyboard.js";
import settings from "./settings";
import styles from "../../styles/snake.module.css";

function Game() {
  document.onkeydown = keyDown;
  document.onkeyup = keyUp;

  function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawSnake(ctx);
    moveSnake();
  }

  return (
    <div className={styles.gameWindow}>
      <Canvas width={settings.canvasW} height={settings.canvasH} draw={draw} />
    </div>
  );
}

export default Game;
